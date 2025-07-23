import React from 'react';
// Optimized individual icon imports for better tree-shaking
import { Bot, MoreVertical, Share, Bookmark } from 'lucide-react';
// Motion imports for animations
import { motion } from 'motion/react';

const ChatHeader: React.FC = React.memo(() => {
  return (
    <motion.div
      className="bg-gradient-to-r from-white via-blue-50/30 to-white border-b border-gray-200/50 px-3 xs:px-4 sm:px-6 py-3 xs:py-4 backdrop-blur-sm relative overflow-hidden"
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-purple-600/5"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent"></div>

      <motion.div
        className="flex items-center justify-between"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.4 }}
      >
        <motion.div
          className="flex items-center gap-2 xs:gap-3 sm:gap-4 flex-1 min-w-0"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
        >
          <motion.div
            className="relative w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-blue-700 rounded-full flex items-center justify-center shadow-lg ring-2 ring-blue-400/30 flex-shrink-0"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              boxShadow: [
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(59, 130, 246, 0.3)",
                "0 10px 15px -3px rgba(59, 130, 246, 0.2), 0 0 0 2px rgba(59, 130, 246, 0.5)",
                "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 0 0 2px rgba(59, 130, 246, 0.3)"
              ]
            }}
            transition={{
              scale: { delay: 0.4, duration: 0.6, type: "spring", stiffness: 200 },
              rotate: { delay: 0.4, duration: 0.6, type: "spring", stiffness: 200 },
              boxShadow: { duration: 2, repeat: Infinity }
            }}
            whileHover={{
              scale: 1.1,
              rotate: 10,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
            <Bot className="w-4 h-4 xs:w-5 xs:h-5 sm:w-6 sm:h-6 text-white" />
          </motion.div>
          <motion.div
            className="min-w-0 flex-1"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.4 }}
          >
            <motion.h2
              className="text-sm xs:text-base sm:text-lg font-bold bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text text-transparent truncate"
              whileHover={{
                scale: 1.02,
                transition: { duration: 0.2 }
              }}
            >
              Trợ lý tư vấn FPT University
            </motion.h2>
            <div className="flex items-center gap-1.5 xs:gap-2">
              <motion.div
                className="w-1.5 h-1.5 xs:w-2 xs:h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50 flex-shrink-0"
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.7, 1, 0.7]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
              <p className="text-xs xs:text-sm text-gray-600 font-medium truncate">Sẵn sàng hỗ trợ bạn 24/7</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="flex items-center gap-1 xs:gap-2 flex-shrink-0"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.4 }}
        >
          <motion.button
            className="p-1.5 xs:p-2 text-gray-400 rounded-lg touch-manipulation"
            whileHover={{
              scale: 1.05,
              color: "rgb(37 99 235)",
              backgroundColor: "rgb(239 246 255)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Share className="w-4 h-4 xs:w-5 xs:h-5" />
          </motion.button>
          <motion.button
            className="p-1.5 xs:p-2 text-gray-400 rounded-lg touch-manipulation"
            whileHover={{
              scale: 1.05,
              color: "rgb(37 99 235)",
              backgroundColor: "rgb(239 246 255)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <Bookmark className="w-4 h-4 xs:w-5 xs:h-5" />
          </motion.button>
          <motion.button
            className="p-1.5 xs:p-2 text-gray-400 rounded-lg touch-manipulation"
            whileHover={{
              scale: 1.05,
              color: "rgb(37 99 235)",
              backgroundColor: "rgb(239 246 255)",
              boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <MoreVertical className="w-4 h-4 xs:w-5 xs:h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

export default ChatHeader