import { useState, useRef, useEffect, useCallback, useMemo, Suspense, lazy } from 'react';
import LoadingSpinner from './components/LoadingSpinner';
import { useGlobalLoading } from './hooks/useGlobalLoading';
import { LOADING_MESSAGES, LOADING_DURATIONS } from './utils/loadingUtils';
// Motion imports for animations
import { AnimatePresence, motion } from 'motion/react';
import { Menu } from 'lucide-react';

// Lazy load components for better performance
const Sidebar = lazy(() => import('./components/Sidebar'));
const ChatHeader = lazy(() => import('./components/ChatHeader'));
const ChatMessage = lazy(() => import('./components/ChatMessage'));
const ChatInput = lazy(() => import('./components/ChatInput'));
const TypingIndicator = lazy(() => import('./components/TypingIndicator'));
const WelcomeScreen = lazy(() => import('./components/WelcomeScreen'));


interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface Conversation {
  id: string;
  title: string;
  timestamp: string;
  messages: Message[];
}

function App() {
  const { showLoading, hideLoading } = useGlobalLoading();

  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Tư vấn tuyển sinh',
      timestamp: 'Hôm nay',
      messages: []
    }
  ]);

  const [activeConversationId, setActiveConversationId] = useState('1');
  const [isTyping, setIsTyping] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const activeConversation = useMemo(() =>
    conversations.find(c => c.id === activeConversationId),
    [conversations, activeConversationId]
  );

  const messages = useMemo(() =>
    activeConversation?.messages || [],
    [activeConversation?.messages]
  );

  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  // Show loading ONLY on initial page load/reload - covers entire UI
  useEffect(() => {
    showLoading(LOADING_MESSAGES.INITIALIZING, LOADING_DURATIONS.NORMAL);

    // Simulate loading time for initial app setup
    const timer = setTimeout(() => {
      hideLoading();
    }, LOADING_DURATIONS.NORMAL);

    return () => clearTimeout(timer);
  }, [showLoading, hideLoading]);

  // Prevent body scroll when mobile sidebar is open
  useEffect(() => {
    if (isSidebarOpen) {
      document.body.classList.add('mobile-sidebar-open');
    } else {
      document.body.classList.remove('mobile-sidebar-open');
    }

    // Cleanup on unmount
    return () => {
      document.body.classList.remove('mobile-sidebar-open');
    };
  }, [isSidebarOpen]);

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  const handleSendMessage = useCallback((text: string) => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      isBot: false,
      timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
    };

    setConversations(prev => prev.map(conv =>
      conv.id === activeConversationId
        ? {
            ...conv,
            messages: [...conv.messages, newMessage],
            title: conv.messages.length === 0 ? text.slice(0, 30) + '...' : conv.title
          }
        : conv
    ));

    setIsTyping(true);

    // Simulate bot response (NO global loading during chat - only use typing indicator)
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getBotResponse(text),
        isBot: true,
        timestamp: new Date().toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' })
      };

      setConversations(prev => prev.map(conv =>
        conv.id === activeConversationId
          ? { ...conv, messages: [...conv.messages, botResponse] }
          : conv
      ));
      setIsTyping(false);
    }, 2000);
  }, [activeConversationId]);

  const getBotResponse = useCallback((userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes('ngành học') || message.includes('chuyên ngành')) {
      return `FPT University hiện có các ngành học hot như:

🔹 **Công nghệ thông tin:**
- Kỹ thuật Phần mềm
- An toàn Thông tin  
- Trí tuệ Nhân tạo
- Khoa học Dữ liệu

🔹 **Kinh doanh:**
- Quản trị Kinh doanh
- Marketing
- Kinh doanh Quốc tế
- Logistics & Supply Chain

🔹 **Thiết kế & Nghệ thuật:**
- Thiết kế Đồ họa
- Thiết kế Game
- Kiến trúc

Bạn quan tâm ngành nào cụ thể để tôi tư vấn chi tiết hơn?`;
    }
    
    if (message.includes('học phí') || message.includes('chi phí')) {
      return `**Thông tin học phí FPT University:**

💰 **Mức học phí:** 500,000 - 700,000 VNĐ/tín chỉ (tùy ngành)

🎓 **Học bổng hấp dẫn:**
- Học bổng 100% cho thủ khoa tốt nghiệp THPT
- Học bổng 50% cho học sinh giỏi
- Học bổng tài năng cho các lĩnh vực đặc biệt
- Học bổng doanh nghiệp từ các đối tác

💳 **Hỗ trợ tài chính:**
- Trả góp học phí không lãi suất
- Vay vốn ưu đãi từ ngân hàng
- Chương trình work-study

Bạn muốn biết thêm về điều kiện học bổng cụ thể nào không?`;
    }
    
    if (message.includes('hồ sơ') || message.includes('xét tuyển')) {
      return `**Hồ sơ xét tuyển FPT University:**

📋 **Thành phần hồ sơ:**
- Bằng tốt nghiệp THPT (bản chính)
- Học bạ THPT (bản chính) 
- CCCD/CMND (bản sao)
- Ảnh 3x4 (4 tấm)
- Giấy khám sức khỏe

🎯 **Phương thức xét tuyển:**
- Xét học bạ THPT (70% chỉ tiêu)
- Xét điểm thi tốt nghiệp THPT (30% chỉ tiêu)
- Xét tuyển thẳng cho học sinh giỏi

⏰ **Thời gian nộp hồ sơ:** Từ tháng 3 đến tháng 8 hàng năm

Bạn cần hỗ trợ gì thêm về thủ tục xét tuyển?`;
    }
    
    if (message.includes('cơ sở') || message.includes('địa điểm')) {
      return `**Hệ thống cơ sở FPT University:**

🏢 **5 cơ sở toàn quốc:**

📍 **Hà Nội:** Khu Công nghệ cao Hòa Lạc
📍 **TP.HCM:** Khu Công nghệ cao TP.HCM  
📍 **Đà Nẵng:** Khu đô thị FPT City
📍 **Cần Thơ:** Khu Công nghệ cao Cần Thơ
📍 **Quy Nhon:** Khu kinh tế Nhơn Hội

🏛️ **Cơ sở vật chất hiện đại:**
- Phòng lab công nghệ cao
- Thư viện số hiện đại
- Ký túc xá tiện nghi
- Sân thể thao đa năng
- Khu vực giải trí, ẩm thực

Bạn quan tâm cơ sở nào để tôi cung cấp thông tin chi tiết hơn?`;
    }
    
    if (message.includes('đời sống') || message.includes('sinh viên')) {
      return `**Đời sống sinh viên tại FPT University:**

🎉 **Hoạt động ngoại khóa:**
- Các CLB học thuật và sở thích
- Giải đấu thể thao, esports
- Lễ hội văn hóa, nghệ thuật
- Hoạt động tình nguyện cộng đồng

🏠 **Ký túc xá hiện đại:**
- Phòng 2-4 người, đầy đủ tiện nghi
- Wifi miễn phí tốc độ cao
- Khu vực học tập chung
- An ninh 24/7

🍜 **Ẩm thực đa dạng:**
- Food court với nhiều món ăn
- Quán cà phê, trà sữa
- Khu vực nấu ăn tự phục vụ

💼 **Hỗ trợ việc làm:**
- Job fair thường xuyên
- Thực tập tại doanh nghiệp đối tác
- Tư vấn nghề nghiệp 1-1

Bạn muốn biết thêm về hoạt động nào cụ thể?`;
    }
    
    if (message.includes('liên hệ') || message.includes('hotline')) {
      return `**Thông tin liên hệ tư vấn tuyển sinh:**

📞 **Hotline:** 0901 955 585 (24/7)
✉️ **Email:** tuyensinh@fpt.edu.vn
🌐 **Website:** www.fpt.edu.vn
📱 **Facebook:** FPT University Official

🏢 **Văn phòng tuyển sinh:**
- **Hà Nội:** Tầng 1, tòa FPT Cầu Giấy
- **TP.HCM:** Tầng 1, tòa FPT Tân Thuận
- **Đà Nẵng:** Khu đô thị FPT City
- **Cần Thơ:** 600 Nguyễn Văn Cừ
- **Quy Nhon:** Khu kinh tế Nhơn Hội

⏰ **Giờ làm việc:** 8:00 - 17:00 (Thứ 2 - Chủ nhật)

Bạn có thể đến trực tiếp hoặc đặt lịch hẹn tư vấn online nhé!`;
    }
    
    return `Cảm ơn bạn đã quan tâm đến FPT University! 

Tôi đã ghi nhận câu hỏi của bạn. Để được tư vấn chi tiết và chính xác nhất, bạn có thể:

📞 **Liên hệ trực tiếp:** 0901 955 585
💬 **Chat với tư vấn viên:** Nhấn nút "Chuyển sang tư vấn viên" 
📧 **Email:** tuyensinh@fpt.edu.vn

Hoặc bạn có thể chọn một trong các chủ đề phổ biến để tôi hỗ trợ ngay:
• Thông tin ngành học
• Học phí và học bổng  
• Hồ sơ xét tuyển
• Cơ sở đào tạo
• Đời sống sinh viên`;
  }, []);

  const handleNewChat = useCallback(() => {
    const newConversation: Conversation = {
      id: Date.now().toString(),
      title: 'Cuộc trò chuyện mới',
      timestamp: 'Vừa xong',
      messages: []
    };
    
    setConversations(prev => [newConversation, ...prev]);
    setActiveConversationId(newConversation.id);
  }, []);

  const handleSelectConversation = useCallback((id: string) => {
    setActiveConversationId(id);
    setIsSidebarOpen(false); // Close sidebar on mobile after selection
  }, []);

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen(prev => !prev);
  }, []);

  const closeSidebar = useCallback(() => {
    setIsSidebarOpen(false);
  }, []);

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 via-blue-50/30 to-indigo-50 relative overflow-hidden">
      {/* Global background effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-purple-600/5 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-400/30 to-transparent pointer-events-none"></div>

      {/* Sidebar */}
      <Suspense fallback={
        <div className="hidden lg:block w-64 bg-gray-900 flex items-center justify-center">
          <LoadingSpinner size="md" className="text-white" />
        </div>
      }>
        <Sidebar
          conversations={conversations}
          activeConversation={activeConversationId}
          onNewChat={handleNewChat}
          onSelectConversation={handleSelectConversation}
          isOpen={isSidebarOpen}
          onClose={closeSidebar}
        />
      </Suspense>

      {/* Main Chat Area */}
      <div className={`flex-1 flex flex-col relative min-w-0 ${isSidebarOpen ? 'lg:ml-0' : ''}`}>
        {/* Mobile Header with Menu Button */}
        <div className="lg:hidden flex items-center justify-between p-3 xs:p-4 bg-white/95 backdrop-blur-sm border-b border-gray-200/50 sticky top-0 z-30">
          <motion.button
            onClick={toggleSidebar}
            className="p-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 touch-manipulation flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Mở sidebar"
          >
            <Menu className="w-5 h-5" />
          </motion.button>
          <h1 className="text-sm xs:text-base font-semibold text-gray-900 truncate mx-3">FPT Assistant</h1>
          <div className="w-9 flex-shrink-0"></div> {/* Spacer for centering */}
        </div>

        <Suspense fallback={
          <div className="h-16 bg-white border-b flex items-center justify-center">
            <LoadingSpinner size="sm" />
          </div>
        }>
          <div className="hidden lg:block">
            <ChatHeader />
          </div>
        </Suspense>

        {/* Messages Area */}
        <div className="flex-1 overflow-y-auto relative scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
          <AnimatePresence mode="wait">
            {messages.length === 0 ? (
              <Suspense fallback={
                <div className="flex-1 flex items-center justify-center">
                  <LoadingSpinner size="lg" />
                </div>
              }>
                <WelcomeScreen key="welcome-screen" onQuestionClick={handleSendMessage} />
              </Suspense>
            ) : (
            <div className="max-w-4xl mx-auto px-3 xs:px-4 sm:px-6 py-4 xs:py-6 sm:py-8 relative min-w-0">
              <AnimatePresence mode="popLayout">
                {messages.map((message) => (
                  <Suspense
                    key={message.id}
                    fallback={
                      <div className="h-20 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                        <LoadingSpinner size="sm" />
                      </div>
                    }
                  >
                    <ChatMessage
                      key={message.id}
                      message={message.text}
                      isBot={message.isBot}
                      timestamp={message.timestamp}
                    />
                  </Suspense>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {isTyping && (
                  <Suspense fallback={
                    <div className="h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                      <LoadingSpinner size="sm" />
                    </div>
                  }>
                    <TypingIndicator key="typing-indicator" />
                  </Suspense>
                )}
              </AnimatePresence>
              <div ref={messagesEndRef} />
            </div>
            )}
          </AnimatePresence>
        </div>

        {/* Input Area */}
        <Suspense fallback={
          <div className="h-20 bg-white border-t flex items-center justify-center">
            <LoadingSpinner size="sm" />
          </div>
        }>
          <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
        </Suspense>
      </div>


    </div>
  );
}

export default App;