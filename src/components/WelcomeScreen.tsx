import React, { useMemo } from 'react';
// Optimized individual icon imports for better tree-shaking
import {
  GraduationCap,
  FileText,
  MapPin,
  Phone,
  Calendar,
  DollarSign,
  Users,
  BookOpen,
  Award,
  Globe
} from 'lucide-react';
// Motion imports for animations
import { motion } from 'motion/react';

interface WelcomeScreenProps {
  onQuestionClick: (question: string) => void;
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = React.memo(({ onQuestionClick }) => {

  const quickQuestions = useMemo(() => [
    {
      icon: <GraduationCap className="w-5 h-5" />,
      title: 'Các ngành học',
      description: 'Tìm hiểu về các chuyên ngành đào tạo',
      question: 'Cho tôi biết về các ngành học tại FPT University'
    },
    {
      icon: <DollarSign className="w-5 h-5" />,
      title: 'Học phí & Học bổng',
      description: 'Thông tin chi phí và hỗ trợ tài chính',
      question: 'Học phí của FPT University như thế nào?'
    },
    {
      icon: <FileText className="w-5 h-5" />,
      title: 'Hồ sơ xét tuyển',
      description: 'Thủ tục và điều kiện tuyển sinh',
      question: 'Hồ sơ xét tuyển cần những gì?'
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      title: 'Lịch tuyển sinh',
      description: 'Thời gian và quy trình tuyển sinh',
      question: 'Lịch tuyển sinh năm 2024 như thế nào?'
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      title: 'Cơ sở đào tạo',
      description: 'Địa điểm và cơ sở vật chất',
      question: 'FPT University có những cơ sở nào?'
    },
    {
      icon: <Users className="w-5 h-5" />,
      title: 'Đời sống sinh viên',
      description: 'Hoạt động và môi trường học tập',
      question: 'Đời sống sinh viên tại FPT University như thế nào?'
    },
    {
      icon: <Award className="w-5 h-5" />,
      title: 'Cơ hội việc làm',
      description: 'Tỷ lệ việc làm và đối tác doanh nghiệp',
      question: 'Cơ hội việc làm sau khi tốt nghiệp như thế nào?'
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: 'Chương trình quốc tế',
      description: 'Du học và hợp tác quốc tế',
      question: 'FPT University có chương trình du học không?'
    }
  ], []);

  return (
    <motion.div
      className="flex-1 flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 relative overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.6, 0.3]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl"
          animate={{
            scale: [1.1, 1, 1.1],
            opacity: [0.6, 0.3, 0.6]
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-blue-300/10 to-purple-300/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
      </div>

      <motion.div
        className="max-w-4xl w-full text-center px-4 sm:px-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {/* Welcome Message */}
        <motion.div
          className="mb-8 sm:mb-12 relative"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          <motion.div
            className="w-16 h-16 xs:w-18 xs:h-18 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 via-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 sm:mb-6 shadow-2xl ring-4 ring-blue-400/30 relative overflow-hidden group"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ delay: 0.3, duration: 0.6, type: "spring", stiffness: 200 }}
            whileHover={{
              scale: 1.1,
              rotate: 5,
              transition: { duration: 0.3 }
            }}
            whileTap={{ scale: 0.95 }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-transparent to-black/10 rounded-full"></div>
            <GraduationCap className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 text-white" />
            <motion.div
              className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12"
              initial={{ x: "-100%" }}
              whileHover={{
                x: "100%",
                transition: { duration: 0.6 }
              }}
            />
          </motion.div>
          <motion.h1
            className="text-2xl xs:text-3xl sm:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent mb-3 sm:mb-4 leading-tight"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            Chào mừng đến với FPT University
          </motion.h1>
          <motion.p
            className="text-lg xs:text-xl sm:text-xl font-semibold bg-gradient-to-r from-gray-700 to-gray-600 bg-clip-text text-transparent mb-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            Trợ lý tư vấn tuyển sinh thông minh
          </motion.p>
          <motion.p
            className="text-sm xs:text-base sm:text-base text-gray-600 font-medium px-2 sm:px-0"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            Tôi có thể giúp bạn tìm hiểu về các ngành học, học phí, thủ tục xét tuyển và nhiều thông tin khác
          </motion.p>
        </motion.div>

        {/* Quick Questions Grid */}
        <motion.div
          className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-4 gap-3 xs:gap-4 sm:gap-6 mb-6 sm:mb-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          {quickQuestions.map((item, index) => (
            <motion.button
              key={index}
              onClick={() => onQuestionClick(item.question)}
              className="group p-4 xs:p-5 sm:p-6 bg-white/80 backdrop-blur-sm rounded-xl border border-gray-200/50 text-left relative overflow-hidden touch-manipulation"
              initial={{ y: 50, opacity: 0 }}
              animate={{
                y: 0,
                opacity: 1,
                transition: { delay: 0.8 + index * 0.1, duration: 0.5 }
              }}
              whileHover={{
                scale: 1.02,
                y: -2,
                borderColor: "rgb(147 197 253)",
                boxShadow: "0 25px 50px -12px rgba(59, 130, 246, 0.2)",
                transition: { duration: 0.3 }
              }}
              whileTap={{ scale: 0.98 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-br from-blue-50/50 to-purple-50/50"
                initial={{ opacity: 0 }}
                whileHover={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.div
                className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-purple-500"
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />

              <div className="flex items-center gap-2 xs:gap-3 mb-2 xs:mb-3">
                <motion.div
                  className="w-8 h-8 xs:w-9 xs:h-9 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-100 to-blue-200 rounded-lg flex items-center justify-center shadow-lg flex-shrink-0"
                  whileHover={{
                    scale: 1.1,
                    rotate: 12,
                    background: "linear-gradient(135deg, rgb(191 219 254), rgb(196 181 253))",
                    transition: { duration: 0.3 }
                  }}
                >
                  <motion.div
                    className="text-blue-600"
                    whileHover={{
                      color: "rgb(147 51 234)",
                      transition: { duration: 0.3 }
                    }}
                  >
                    {React.cloneElement(item.icon, {
                      className: "w-4 h-4 xs:w-5 xs:h-5 sm:w-5 sm:h-5"
                    })}
                  </motion.div>
                </motion.div>
                <motion.h3
                  className="font-bold text-gray-900 text-sm xs:text-base sm:text-base leading-tight"
                  whileHover={{
                    color: "rgb(37 99 235)",
                    transition: { duration: 0.3 }
                  }}
                >
                  {item.title}
                </motion.h3>
              </div>
              <p className="text-xs xs:text-sm sm:text-sm text-gray-600 leading-relaxed relative z-10">
                {item.description}
              </p>
            </motion.button>
          ))}
        </motion.div>

        {/* Additional Info */}
        <motion.div
          className="bg-white/80 backdrop-blur-sm rounded-xl p-4 xs:p-5 sm:p-6 border border-gray-200/50 shadow-xl relative overflow-hidden"
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.5 }}
          whileHover={{
            scale: 1.01,
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.1)",
            transition: { duration: 0.3 }
          }}
        >
          <motion.div
            className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-transparent to-purple-50/30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.3, duration: 0.5 }}
          />
          <motion.div
            className="flex flex-col xs:flex-row items-center justify-center gap-3 xs:gap-4 sm:gap-8 text-xs xs:text-sm sm:text-sm text-gray-600"
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.4, duration: 0.4 }}
          >
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <motion.div
                className="w-2 h-2 bg-green-500 rounded-full shadow-lg shadow-green-500/50"
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
              <span className="font-medium">Trực tuyến 24/7</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <Phone className="w-3 h-3 xs:w-4 xs:h-4 text-blue-600" />
              <span className="font-medium">Hotline: 0901 955 585</span>
            </motion.div>
            <motion.div
              className="flex items-center gap-2"
              whileHover={{ scale: 1.05 }}
            >
              <BookOpen className="w-3 h-3 xs:w-4 xs:h-4 text-blue-600" />
              <span className="font-medium">5 cơ sở toàn quốc</span>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

export default WelcomeScreen;