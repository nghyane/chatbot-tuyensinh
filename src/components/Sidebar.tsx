import React, { useState } from 'react';
// Optimized individual icon imports for better tree-shaking
import {
  MessageSquare,
  Plus,
  Search,
  GraduationCap,
  BookOpen,
  Users,
  MapPin,
  Phone,
  Settings,
  HelpCircle,
  X,
  Loader2,
  Eye
} from 'lucide-react';
// Motion imports for animations
import { motion } from 'motion/react';
import { usePlaygroundStore } from '@/store';
import { SessionEntry } from '@/types/playground';
import { formatTimestamp } from '@/lib/utils';
import ChatHistoryModal from './ChatHistoryModal';

interface SidebarProps {
  sessions: SessionEntry[];
  onNewChat: () => void;
  onSelectConversation: (sessionId: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
}

const Sidebar: React.FC<SidebarProps> = React.memo(({
  sessions,
  onNewChat,
  onSelectConversation,
  isOpen = false,
  onClose
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSessionForHistory, setSelectedSessionForHistory] = useState<SessionEntry | null>(null);
  const [isHistoryModalOpen, setIsHistoryModalOpen] = useState(false);
  const { isSessionsLoading } = usePlaygroundStore();

  // Filter sessions based on search query
  const filteredSessions = sessions.filter(session =>
    session.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle view history
  const handleViewHistory = (session: SessionEntry, e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent triggering onSelectConversation
    setSelectedSessionForHistory(session);
    setIsHistoryModalOpen(true);
  };

  // Handle close history modal
  const handleCloseHistoryModal = () => {
    setIsHistoryModalOpen(false);
    setSelectedSessionForHistory(null);
  };
  return (
    <>
      {/* Mobile overlay removed since sidebar is full-screen */}

      <motion.div
        className={`
          fixed lg:relative top-0 left-0 z-50 lg:z-auto
          w-full lg:w-64 max-w-none lg:max-w-none
          bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
          text-white flex flex-col h-screen lg:h-full overflow-hidden
          shadow-2xl lg:shadow-none
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        `}
        style={{ pointerEvents: 'auto' }}
      >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/10 via-transparent to-purple-600/10"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/50 to-transparent"></div>

      {/* Header */}
      <motion.div
        className="relative p-3 sm:p-4 border-b border-gray-700/50 backdrop-blur-sm"
        initial={{ y: -50, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.2, duration: 0.4 }
        }}
      >
        <motion.div
          className="flex items-center justify-between mb-3 sm:mb-4"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{
            scale: 1,
            opacity: 1,
            transition: { delay: 0.3, duration: 0.4 }
          }}
          style={{ pointerEvents: 'auto' }}
        >
          <div className="flex items-center gap-3">
            <motion.div
              className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-lg ring-2 ring-blue-400/30"
              whileHover={{
                scale: 1.1,
                rotate: 10,
                transition: { duration: 0.2 }
              }}
              whileTap={{ scale: 0.95 }}
            >
              <GraduationCap className="w-5 h-5" />
            </motion.div>
            <div className="min-w-0 flex-1">
              <h1 className="font-bold text-xs sm:text-sm bg-gradient-to-r from-white to-blue-200 bg-clip-text text-transparent truncate">FPT University</h1>
              <p className="text-xs text-blue-300/80 truncate">Tư vấn tuyển sinh AI</p>
            </div>
          </div>
        </motion.div>

        {/* Close button for mobile - Outside header container */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            if (onClose) {
              onClose();
            }
          }}
          className="lg:hidden absolute mb-2 top-4 right-4 p-2.5 text-gray-300 hover:text-white hover:bg-gray-700/50 rounded-lg transition-all duration-200 touch-manipulation flex-shrink-0 z-50"
          aria-label="Đóng sidebar"
          type="button"
          style={{
            pointerEvents: 'auto',
            touchAction: 'manipulation'
          }}
        >
          <X className="w-5 h-5" />
        </button>

        <motion.button
          onClick={onNewChat}
          className="w-full flex items-center gap-2 sm:gap-3 px-3 py-2.5 sm:py-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg shadow-lg"
          initial={{ y: 20, opacity: 0 }}
          animate={{
            y: 0,
            opacity: 1,
            transition: { delay: 0.4, duration: 0.3 }
          }}
          whileHover={{
            scale: 1.02,
            boxShadow: "0 10px 25px -5px rgba(59, 130, 246, 0.25)",
            transition: { duration: 0.2 }
          }}
          whileTap={{ scale: 0.98 }}
        >
          <Plus className="w-4 h-4 flex-shrink-0" />
          <span className="text-xs sm:text-sm font-medium truncate">Cuộc trò chuyện mới</span>
        </motion.button>
      </motion.div>

      {/* Search */}
      <motion.div
        className="relative p-3 sm:p-4"
        initial={{ y: 20, opacity: 0 }}
        animate={{
          y: 0,
          opacity: 1,
          transition: { delay: 0.5, duration: 0.3 }
        }}
      >
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <motion.input
            type="text"
            placeholder="Tìm kiếm..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-3 py-2.5 sm:py-2 bg-gray-800/50 border border-gray-600/50 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-blue-400/50"
            whileFocus={{
              scale: 1.02,
              boxShadow: "0 0 0 3px rgba(59, 130, 246, 0.1)",
              transition: { duration: 0.2 }
            }}
          />
        </div>
      </motion.div>

      {/* Conversations */}
      <motion.div
        className="relative flex-1 overflow-y-auto px-2 sm:px-3 scrollbar-thin scrollbar-thumb-gray-600 scrollbar-track-transparent"
        initial={{ opacity: 0 }}
        animate={{
          opacity: 1,
          transition: { delay: 0.6, duration: 0.4 }
        }}
      >
        <div className="space-y-1">
{isSessionsLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loader2 className="w-5 h-5 animate-spin text-gray-400" />
              <span className="ml-2 text-sm text-gray-400">Đang tải...</span>
            </div>
          ) : filteredSessions.length === 0 ? (
            <div className="text-center py-8">
              <MessageSquare className="w-8 h-8 text-gray-500 mx-auto mb-2" />
              <p className="text-sm text-gray-400">
                {searchQuery ? 'Không tìm thấy cuộc trò chuyện' : 'Chưa có cuộc trò chuyện nào'}
              </p>
            </div>
          ) : (
            filteredSessions.map((session, index) => (
              <motion.div
                key={session.session_id}
                className="relative group"
                initial={{ x: -50, opacity: 0 }}
                animate={{
                  x: 0,
                  opacity: 1,
                  transition: { delay: 0.7 + index * 0.1, duration: 0.3 }
                }}
              >
                <motion.button
                  onClick={() => onSelectConversation(session.session_id)}
                  className="w-full text-left px-2 sm:px-3 py-2.5 sm:py-2 rounded-lg touch-manipulation transition-colors duration-200 text-gray-300 hover:bg-gray-800/50"
                  whileHover={{
                    scale: 1.02,
                    backgroundColor: "rgba(55, 65, 81, 0.5)",
                    transition: { duration: 0.2 }
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="flex items-center gap-2">
                    <motion.div
                      whileHover={{ rotate: 10 }}
                      transition={{ duration: 0.2 }}
                      className="flex-shrink-0"
                    >
                      <MessageSquare className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                    </motion.div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs sm:text-sm font-medium truncate">{session.title}</p>
                      <p className="text-xs text-gray-400 truncate">
                        {formatTimestamp(session.created_at)}
                      </p>
                    </div>
                  </div>
                </motion.button>

                {/* View History Button */}
                <motion.button
                  onClick={(e) => handleViewHistory(session, e)}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-300 hover:bg-gray-700/50 rounded-md opacity-0 group-hover:opacity-100 transition-all duration-200"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  title="Xem lịch sử chi tiết"
                >
                  <Eye className="w-3.5 h-3.5" />
                </motion.button>
              </motion.div>
            ))
          )}
        </div>
      </motion.div>

      {/* Quick Links */}
      <div className="relative p-2 sm:p-3 lg:p-4 border-t border-gray-700/50">
        <div className="space-y-1">
          <button className="w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-2 text-gray-300 hover:bg-gray-800/50 hover:text-blue-300 rounded-lg transition-all duration-200 text-xs sm:text-sm group touch-manipulation">
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">Thông tin ngành học</span>
          </button>
          <button className="w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-2 text-gray-300 hover:bg-gray-800/50 hover:text-blue-300 rounded-lg transition-all duration-200 text-xs sm:text-sm group touch-manipulation">
            <Users className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">Đời sống sinh viên</span>
          </button>
          <button className="w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-2 text-gray-300 hover:bg-gray-800/50 hover:text-blue-300 rounded-lg transition-all duration-200 text-xs sm:text-sm group touch-manipulation">
            <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">Cơ sở đào tạo</span>
          </button>
          <button className="w-full flex items-center gap-2 sm:gap-3 px-2 sm:px-3 py-2.5 sm:py-2 text-gray-300 hover:bg-gray-800/50 hover:text-blue-300 rounded-lg transition-all duration-200 text-xs sm:text-sm group touch-manipulation">
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
            <span className="truncate">Liên hệ</span>
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative p-2 sm:p-3 lg:p-4 border-t border-gray-700/50">
        <div className="flex items-center justify-center gap-2 sm:gap-4 sm:justify-between">
          <button className="p-2 sm:p-2 text-gray-400 hover:text-blue-300 hover:bg-gray-800/50 rounded-lg transition-all duration-200 hover:scale-105 touch-manipulation">
            <Settings className="w-4 h-4" />
          </button>
          <button className="p-2 sm:p-2 text-gray-400 hover:text-blue-300 hover:bg-gray-800/50 rounded-lg transition-all duration-200 hover:scale-105 touch-manipulation">
            <HelpCircle className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>

    {/* Chat History Modal */}
    {selectedSessionForHistory && (
      <ChatHistoryModal
        isOpen={isHistoryModalOpen}
        onClose={handleCloseHistoryModal}
        sessionId={selectedSessionForHistory.session_id}
        sessionTitle={selectedSessionForHistory.title}
      />
    )}
    </>
  );
});

export default Sidebar;