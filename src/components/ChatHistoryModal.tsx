import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, MessageSquare, User, Bot, Loader2, Clock } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { getChatHistoryAPI } from '@/services/api/playground';
import { usePlaygroundStore } from '@/store';
import { ChatHistoryResponse, ChatHistoryMessage } from '@/types/playground';
import { formatTimestamp } from '@/lib/utils';

interface ChatHistoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
  sessionTitle: string;
}



const ChatHistoryModal: React.FC<ChatHistoryModalProps> = ({
  isOpen,
  onClose,
  sessionId,
  sessionTitle
}) => {
  const [chatHistory, setChatHistory] = useState<ChatHistoryResponse | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const selectedEndpoint = usePlaygroundStore((state) => state.selectedEndpoint);
  const userId = usePlaygroundStore((state) => state.userId);

  useEffect(() => {
    if (isOpen && sessionId) {
      loadChatHistory();
    }
  }, [isOpen, sessionId]);

  const loadChatHistory = async () => {
    setIsLoading(true);
    try {
      const history = await getChatHistoryAPI(selectedEndpoint, sessionId, userId);
      setChatHistory(history);
    } catch (error) {
      console.error('Error loading chat history:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case 'user':
        return <User className="w-4 h-4" />;
      case 'assistant':
        return <Bot className="w-4 h-4" />;
      case 'system':
        return <MessageSquare className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const getRoleLabel = (role: string) => {
    switch (role) {
      case 'user':
        return 'Bạn';
      case 'assistant':
        return 'FPT Assistant';
      case 'system':
        return 'Hệ thống';
      default:
        return role;
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'user':
        return 'from-gray-600 to-gray-700';
      case 'assistant':
        return 'from-blue-500 to-blue-600';
      case 'system':
        return 'from-green-500 to-green-600';
      default:
        return 'from-gray-500 to-gray-600';
    }
  };

  const getMessageBgClass = (role: string) => {
    switch (role) {
      case 'system':
        return 'bg-green-50 border border-green-200';
      case 'user':
        return 'bg-gray-50 border border-gray-200';
      case 'assistant':
        return 'bg-blue-50 border border-blue-200';
      default:
        return 'bg-gray-50 border border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center">
                <MessageSquare className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Chi tiết cuộc trò chuyện</h2>
                <p className="text-sm text-gray-600 truncate max-w-md">{sessionTitle}</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto max-h-[calc(90vh-120px)]">
            {isLoading ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
                <span className="ml-3 text-gray-600">Đang tải lịch sử...</span>
              </div>
            ) : chatHistory && chatHistory.history.length > 0 ? (
              <div className="p-6 space-y-4">
                <div className="flex items-center gap-2 text-sm text-gray-500 mb-4">
                  <Clock className="w-4 h-4" />
                  <span>Tổng cộng {chatHistory.history.filter(m => m.role !== 'system').length} tin nhắn</span>
                </div>
                
                {chatHistory.history
                  .filter(message => message.role !== 'system') // Ẩn system messages
                  .map((message: ChatHistoryMessage, index: number) => (
                  <motion.div
                    key={index}
                    className="flex gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-br ${getRoleColor(message.role)} flex items-center justify-center text-white flex-shrink-0`}>
                      {getRoleIcon(message.role)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {getRoleLabel(message.role)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {formatTimestamp(message.created_at)}
                        </span>
                      </div>

                      <div className={`p-3 rounded-lg ${getMessageBgClass(message.role)}`}>
                        <div className="text-sm text-gray-800 leading-relaxed prose prose-sm max-w-none">
                          <ReactMarkdown
                            components={{
                              // Custom styling for different elements
                              p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                              h1: ({ children }) => <h1 className="text-lg font-bold mb-2 text-gray-900">{children}</h1>,
                              h2: ({ children }) => <h2 className="text-base font-bold mb-2 text-gray-900">{children}</h2>,
                              h3: ({ children }) => <h3 className="text-sm font-bold mb-1 text-gray-900">{children}</h3>,
                              ul: ({ children }) => <ul className="list-disc list-inside mb-2 space-y-1">{children}</ul>,
                              ol: ({ children }) => <ol className="list-decimal list-inside mb-2 space-y-1">{children}</ol>,
                              li: ({ children }) => <li className="text-sm">{children}</li>,
                              code: ({ children, className }) => {
                                const isInline = !className;
                                return isInline ? (
                                  <code className="bg-gray-200 px-1 py-0.5 rounded text-xs font-mono">{children}</code>
                                ) : (
                                  <code className="block bg-gray-100 p-2 rounded text-xs font-mono overflow-x-auto whitespace-pre">{children}</code>
                                );
                              },
                              pre: ({ children }) => <pre className="bg-gray-100 p-2 rounded mb-2 overflow-x-auto">{children}</pre>,
                              blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-gray-300 pl-3 italic text-gray-600 mb-2">
                                  {children}
                                </blockquote>
                              ),
                              strong: ({ children }) => <strong className="font-semibold text-gray-900">{children}</strong>,
                              em: ({ children }) => <em className="italic">{children}</em>,
                              a: ({ children, href }) => (
                                <a
                                  href={href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="text-blue-600 hover:text-blue-800 underline"
                                >
                                  {children}
                                </a>
                              ),
                            }}
                          >
                            {message.content || ''}
                          </ReactMarkdown>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-12">
                <MessageSquare className="w-12 h-12 text-gray-400 mb-4" />
                <p className="text-gray-600">Không có lịch sử trò chuyện</p>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ChatHistoryModal;
