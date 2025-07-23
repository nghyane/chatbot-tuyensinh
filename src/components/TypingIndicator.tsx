import React from 'react';
// Optimized individual icon imports for better tree-shaking
import { Bot } from 'lucide-react';
// Motion imports for animations
import { motion } from 'motion/react';

const TypingIndicator: React.FC = React.memo(() => {
  return (
    <motion.div
      className="flex gap-4 mb-8 group"
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
      <div className="flex gap-4 max-w-4xl">
        <div className="flex-shrink-0">
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center shadow-lg ring-2 ring-blue-400/30 relative overflow-hidden"
            initial={{ scale: 0, rotate: -180 }}
            animate={{
              scale: 1,
              rotate: 0,
              transition: { delay: 0.2, duration: 0.5, type: "spring", stiffness: 200 }
            }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.2 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-full"></div>
            <Bot className="w-5 h-5 text-white" />
          </motion.div>
        </div>

        <div className="flex-1 min-w-0">
          <motion.div
            className="flex items-center gap-2 mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{
              opacity: 1,
              x: 0,
              transition: { delay: 0.4, duration: 0.3 }
            }}
          >
            <span className="text-sm font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">FPT Assistant</span>
            <motion.span
              className="text-xs text-blue-600 font-medium"
              animate={{
                opacity: [0.5, 1, 0.5]
              }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            >
              đang nhập...
            </motion.span>
          </motion.div>

          <motion.div
            className="flex items-center gap-1 p-4 bg-gradient-to-br from-blue-50 to-blue-100/50 border border-blue-200/50 rounded-2xl shadow-lg backdrop-blur-sm"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{
              scale: 1,
              opacity: 1,
              transition: { delay: 0.3, duration: 0.4, ease: "easeOut" }
            }}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
              transition: { duration: 0.2 }
            }}
          >
            <motion.div
              className="w-3 h-3 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full shadow-lg"
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
            <motion.div
              className="w-3 h-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-lg"
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.1
              }}
            />
            <motion.div
              className="w-3 h-3 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full shadow-lg"
              animate={{
                y: [0, -8, 0],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2
              }}
            />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
});

export default TypingIndicator;