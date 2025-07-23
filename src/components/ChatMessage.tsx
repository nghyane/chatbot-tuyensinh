import React, { useState } from 'react';
// Optimized individual icon imports for better tree-shaking
import { Bot, User, Copy, ThumbsUp, ThumbsDown, AlertCircle, Wrench, Image as ImageIcon } from 'lucide-react';
// Motion imports for animations
import { motion } from 'motion/react';
import ReactMarkdown from 'react-markdown';
import { ToolCall, ImageData } from '@/types/playground';

interface ChatMessageProps {
  message: string;
  isBot: boolean;
  timestamp: string;
  toolCalls?: ToolCall[];
  images?: ImageData[];
  streamingError?: boolean;
}

const ChatMessage: React.FC<ChatMessageProps> = React.memo(({
  message,
  isBot,
  timestamp,
  toolCalls,
  images,
  streamingError
}) => {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedText(text);
      setTimeout(() => setCopiedText(null), 2000);
    } catch (error) {
      console.error('Failed to copy text:', error);
    }
  };
  return (
    <motion.div
      className={`flex gap-2 xs:gap-3 sm:gap-4 mb-4 xs:mb-6 sm:mb-8 ${isBot ? 'justify-start' : 'justify-end'} group px-3 xs:px-4 sm:px-0`}
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{
        opacity: 1,
        y: 0,
        scale: 1,
        transition: { duration: 0.4, ease: "easeOut" }
      }}
      exit={{
        opacity: 0,
        y: -20,
        scale: 0.95,
        transition: { duration: 0.3 }
      }}
      layout
    >
      <div className={`flex gap-2 xs:gap-3 sm:gap-4 max-w-full xs:max-w-3xl sm:max-w-4xl ${isBot ? 'flex-row' : 'flex-row-reverse'}`}>
        <div className="flex-shrink-0">
          <motion.div
            className={`w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center ${
              isBot ? 'bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 shadow-lg ring-2 ring-blue-400/30' : 'bg-gradient-to-br from-gray-600 to-gray-700 shadow-lg ring-2 ring-gray-400/30'
            } relative overflow-hidden`}
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              transition: { delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }
            }}
            whileHover={{
              scale: 1.05,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
            {isBot ? (
              <Bot className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
            ) : (
              <User className="w-4 h-4 xs:w-4 xs:h-4 sm:w-5 sm:h-5 text-white" />
            )}
          </motion.div>
        </div>
        
        <div className="flex-1 min-w-0">
          <motion.div
            className="flex items-center gap-1.5 xs:gap-2 mb-1.5 xs:mb-2"
            initial={{ opacity: 0, x: isBot ? -10 : 10 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.4, duration: 0.3 }
            }}
          >
            <span className="text-xs xs:text-sm font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              {isBot ? 'FPT Assistant' : 'Bạn'}
            </span>
            <span className="text-xs text-gray-500 font-medium">{timestamp}</span>
          </motion.div>

          <motion.div
            className={`relative p-3 xs:p-4 rounded-2xl ${
              streamingError
                ? 'bg-gradient-to-br from-red-50 to-red-100/50 border border-red-200/50 shadow-lg'
                : isBot
                ? 'bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 shadow-lg'
                : 'bg-gradient-to-br from-gray-100 to-gray-200/50 border border-gray-200/50 shadow-lg'
            } backdrop-blur-sm`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { delay: 0.3, duration: 0.4, ease: "easeOut" }
            }}
            whileHover={{
              scale: 1.01,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 }
            }}
          >
            <div className={`absolute inset-0 rounded-2xl ${
              streamingError
                ? 'bg-gradient-to-br from-red-600/5 to-red-700/5'
                : isBot
                ? 'bg-gradient-to-br from-blue-600/5 to-purple-600/5'
                : 'bg-gradient-to-br from-gray-600/5 to-gray-700/5'
            }`}></div>

            {/* Error indicator */}
            {streamingError && (
              <div className="flex items-center gap-2 mb-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm font-medium">Có lỗi xảy ra khi xử lý tin nhắn</span>
              </div>
            )}

            {/* Main message content */}
            <div className="relative z-10">
              {isBot ? (
                <div className="prose prose-sm max-w-none text-gray-800 leading-relaxed">
                  <ReactMarkdown
                    components={{
                      p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                      code: ({ children }) => (
                        <code className="bg-gray-200 px-1 py-0.5 rounded text-sm font-mono">
                          {children}
                        </code>
                      ),
                      pre: ({ children }) => (
                        <pre className="bg-gray-100 p-3 rounded-lg overflow-x-auto text-sm">
                          {children}
                        </pre>
                      )
                    }}
                  >
                    {message}
                  </ReactMarkdown>
                </div>
              ) : (
                <p className="whitespace-pre-wrap leading-relaxed text-sm xs:text-base text-gray-800 font-medium">
                  {message}
                </p>
              )}
            </div>

            {/* Tool calls */}
            {toolCalls && toolCalls.length > 0 && (
              <div className="mt-3 space-y-2">
                {toolCalls.map((toolCall, index) => (
                  <motion.div
                    key={`${toolCall.tool_call_id || index}`}
                    className="bg-white/50 border border-gray-200 rounded-lg p-3"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <Wrench className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-gray-700">
                        {toolCall.tool_name}
                      </span>
                      {toolCall.tool_call_error && (
                        <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                          Error
                        </span>
                      )}
                    </div>
                    {toolCall.content && (
                      <p className="text-sm text-gray-600 whitespace-pre-wrap">
                        {toolCall.content}
                      </p>
                    )}
                  </motion.div>
                ))}
              </div>
            )}

            {/* Images */}
            {images && images.length > 0 && (
              <div className="mt-3 grid grid-cols-2 gap-2">
                {images.map((image, index) => (
                  <motion.div
                    key={index}
                    className="relative rounded-lg overflow-hidden bg-gray-100"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.1 * index }}
                  >
                    <img
                      src={image.url}
                      alt={image.revised_prompt || `Generated image ${index + 1}`}
                      className="w-full h-auto"
                      loading="lazy"
                    />
                    <div className="absolute top-2 right-2">
                      <ImageIcon className="w-4 h-4 text-white drop-shadow-lg" />
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </motion.div>

          {isBot && (
            <motion.div
              className="flex items-center gap-1 xs:gap-2 mt-2 xs:mt-3"
              initial={{ opacity: 0, y: 10 }}
              animate={{
                opacity: 1,
                y: 0,
                transition: { delay: 0.6, duration: 0.3 }
              }}
            >
              <motion.button
                className={`p-1.5 xs:p-2 rounded-lg shadow-sm touch-manipulation transition-colors ${
                  copiedText === message
                    ? 'text-green-600 bg-green-50'
                    : 'text-gray-400 hover:text-blue-600 hover:bg-blue-50'
                }`}
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
                onClick={() => handleCopy(message)}
                title={copiedText === message ? 'Đã sao chép!' : 'Sao chép tin nhắn'}
              >
                <Copy className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              </motion.button>
              <motion.button
                className="p-1.5 xs:p-2 text-gray-400 hover:text-green-600 hover:bg-green-50 rounded-lg shadow-sm touch-manipulation"
                whileHover={{ scale: 1.05, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ThumbsUp className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              </motion.button>
              <motion.button
                className="p-1.5 xs:p-2 text-gray-400 hover:text-red-600 hover:bg-red-50 rounded-lg shadow-sm touch-manipulation"
                whileHover={{ scale: 1.05, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.2 }}
              >
                <ThumbsDown className="w-3.5 h-3.5 xs:w-4 xs:h-4" />
              </motion.button>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
});

export default ChatMessage;