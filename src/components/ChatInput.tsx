import React, { useState, useCallback, useRef, useEffect } from 'react';
// Optimized individual icon imports for better tree-shaking
import { Send } from 'lucide-react';
// Motion imports for animations
import { motion } from 'motion/react';
import useAIChatStreamHandler from '@/hooks/useAIStreamHandler';
import { usePlaygroundStore } from '@/store';

interface ChatInputProps {
  onSendMessage?: (message: string) => void; // Made optional since we'll use the hook
  disabled?: boolean;
}

const ChatInput: React.FC<ChatInputProps> = React.memo(({ onSendMessage, disabled = false }) => {
  const [message, setMessage] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Zustand store
  const { setChatInputRef, isStreaming } = usePlaygroundStore();

  // AI Stream Handler
  const { handleStreamResponse } = useAIChatStreamHandler();

  // Set textarea ref in store for focus management
  useEffect(() => {
    if (textareaRef.current) {
      setChatInputRef(textareaRef);
    }
  }, [setChatInputRef]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled && !isStreaming) {
      const messageToSend = message.trim();
      setMessage('');

      try {
        // Use AI stream handler for real API call
        await handleStreamResponse(messageToSend);
      } catch (error) {
        console.error('Error sending message:', error);
        // Fallback to onSendMessage if provided
        if (onSendMessage) {
          onSendMessage(messageToSend);
        }
      }
    }
  }, [message, disabled, isStreaming, handleStreamResponse, onSendMessage]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  }, [handleSubmit]);

  return (
    <motion.div
      className="bg-gradient-to-t from-white via-blue-50/20 to-white border-t border-gray-200/50 p-3 xs:p-4 sm:p-6 relative overflow-hidden backdrop-blur-sm"
      initial={{ y: 100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>

      <motion.div
        className="max-w-4xl mx-auto"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.form
          onSubmit={handleSubmit}
          className="relative flex items-end gap-2 xs:gap-3"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <div className="flex-1 relative">
            <motion.textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Hỏi bất kỳ điều gì về FPT University..."
              className="w-full px-3 xs:px-4 py-3 xs:py-3 sm:py-3 pr-4 border border-gray-300/50 rounded-2xl resize-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 min-h-[48px] xs:min-h-[52px] max-h-32 text-sm xs:text-base text-gray-900 placeholder-gray-500 bg-white/80 backdrop-blur-sm shadow-lg touch-manipulation"
              rows={1}
              disabled={disabled || isStreaming}
              whileFocus={{
                scale: 1.01,
                boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1), 0 20px 25px -5px rgba(0, 0, 0, 0.1)",
                transition: { duration: 0.2 }
              }}
            />
          
          </div>

          <motion.button
            type="submit"
            disabled={!message.trim() || disabled || isStreaming}
            className="flex-shrink-0 w-11 h-11 xs:w-12 xs:h-12 bg-gradient-to-br from-blue-600 to-blue-700 disabled:from-gray-300 disabled:to-gray-400 disabled:cursor-not-allowed text-white rounded-full flex items-center justify-center shadow-lg relative overflow-hidden group touch-manipulation"
            whileHover={!disabled && !isStreaming && message.trim() ? {
              scale: 1.05,
              boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.3)",
              background: "linear-gradient(135deg, rgb(59 130 246), rgb(37 99 235))",
              transition: { duration: 0.2 }
            } : {}}
            whileTap={!disabled && !isStreaming && message.trim() ? { scale: 0.95 } : {}}
            animate={!disabled && !isStreaming && message.trim() ? {
              boxShadow: [
                "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                "0 10px 15px -3px rgba(59, 130, 246, 0.2)",
                "0 4px 6px -1px rgba(0, 0, 0, 0.1)"
              ]
            } : {}}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            <motion.div
              animate={!disabled && !isStreaming && message.trim() ? { rotate: [0, 10, 0] } : {}}
              transition={{ duration: 0.3 }}
            >
              <Send className="w-4 h-4 xs:w-5 xs:h-5" />
            </motion.div>
          </motion.button>
        </motion.form>

        <motion.div
          className="flex items-center justify-center mt-3 xs:mt-4 relative px-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.4 }}
        >
          <p className="text-xs text-gray-500 font-medium text-center">
            FPT Assistant có thể mắc lỗi. Hãy kiểm tra thông tin quan trọng.
          </p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

export default ChatInput;