import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import LoadingSpinner from './LoadingSpinner';
import { useLoading } from '@/contexts/LoadingContext';
import { useGlobalLoading } from '@/hooks/useGlobalLoading';

const GlobalLoadingOverlay: React.FC = () => {
  const { isGlobalLoading, loadingMessage } = useLoading();
  const { forceHideLoading } = useGlobalLoading();
  const [showEmergencyButton, setShowEmergencyButton] = useState(false);

  // Show emergency button after 3 seconds of loading
  useEffect(() => {
    let timer: number;
    if (isGlobalLoading) {
      timer = window.setTimeout(() => {
        setShowEmergencyButton(true);
      }, 3000);
    } else {
      setShowEmergencyButton(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isGlobalLoading]);

  return (
    <AnimatePresence>
      {isGlobalLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9999] bg-white/95 backdrop-blur-sm flex flex-col items-center justify-center"
          style={{ backdropFilter: 'blur(8px)' }}
        >
          {/* Background gradient effects */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 pointer-events-none"></div>
          
          {/* Loading content */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="relative z-10 flex flex-col items-center space-y-6"
          >
            {/* Loading spinner */}
            <div className="relative">
              <LoadingSpinner size="lg" />
              
              {/* Pulsing ring effect */}
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.3, 0.1, 0.3],
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
                className="absolute inset-0 rounded-full border-2 border-blue-400/30"
              />
            </div>

            {/* Loading text */}
            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="text-center space-y-2"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {loadingMessage || 'Đang tải...'}
              </h3>
              <p className="text-sm text-gray-600">
                Vui lòng đợi trong giây lát
              </p>
            </motion.div>

            {/* Animated dots */}
            <motion.div
              className="flex space-x-1"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3, delay: 0.3 }}
            >
              {[0, 1, 2].map((index) => (
                <motion.div
                  key={index}
                  className="w-2 h-2 bg-blue-500 rounded-full"
                  animate={{
                    y: [0, -8, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: 0.8,
                    repeat: Infinity,
                    delay: index * 0.2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </motion.div>

            {/* Emergency button */}
            <AnimatePresence>
              {showEmergencyButton && (
                <motion.button
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  onClick={forceHideLoading}
                  className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white text-sm rounded-lg transition-colors"
                >
                  Đóng loading
                </motion.button>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Subtle pattern overlay */}
          <div 
            className="absolute inset-0 opacity-5 pointer-events-none"
            style={{
              backgroundImage: `radial-gradient(circle at 25% 25%, #3b82f6 2px, transparent 2px),
                               radial-gradient(circle at 75% 75%, #8b5cf6 2px, transparent 2px)`,
              backgroundSize: '50px 50px',
              backgroundPosition: '0 0, 25px 25px'
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default GlobalLoadingOverlay;
