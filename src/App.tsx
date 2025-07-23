import { useState, useRef, useEffect, useCallback, Suspense, lazy } from 'react';
import { useQueryState } from 'nuqs';
import LoadingSpinner from './components/LoadingSpinner';
import { useGlobalLoading } from './hooks/useGlobalLoading';
import { usePlaygroundStore } from './store';
import useChatActions from './hooks/useChatActions';
import useSessionLoader from './hooks/useSessionLoader';
import useAIChatStreamHandler from './hooks/useAIStreamHandler';
import { LOADING_MESSAGES, LOADING_DURATIONS } from './utils/loadingUtils';
import { getOrCreateUserId } from './utils/userUtils';
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


function App() {
  const { showLoading, hideLoading } = useGlobalLoading();

  // Zustand store
  const {
    messages,
    isStreaming,
    sessionsData,
    setUserId
  } = usePlaygroundStore();

  // URL state management
  const [agentId] = useQueryState('agent');
  const [_sessionId] = useQueryState('session');

  // Hooks
  const { initializePlayground, clearChat } = useChatActions();
  const { getSessions } = useSessionLoader();
  const { handleStreamResponse } = useAIChatStreamHandler();

  // Local state for UI
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize user ID on mount
  useEffect(() => {
    const userId = getOrCreateUserId();
    setUserId(userId);
  }, [setUserId]);

  // Initialize playground on mount
  useEffect(() => {
    initializePlayground();
  }, [initializePlayground]);

  // Load sessions when agent changes
  useEffect(() => {
    if (agentId) {
      getSessions(agentId);
    }
  }, [agentId, getSessions]);

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
  }, [messages, isStreaming]);

  const handleSendMessage = useCallback(async (text: string) => {
    if (text.trim() && !isStreaming) {
      try {
        // Use AI stream handler for real API call
        await handleStreamResponse(text.trim());
      } catch (error) {
        console.error('Error sending message:', error);
      }
    }
  }, [handleStreamResponse, isStreaming]);

  const handleNewChat = useCallback(() => {
    clearChat();
    setIsSidebarOpen(false);
  }, [clearChat]);

  const handleSelectConversation = useCallback((_sessionId: string) => {
    // This will be handled by session loading logic
    setIsSidebarOpen(false);
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
          sessions={sessionsData || []}
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
                {messages
                  .filter((message) => {
                    // Don't show empty agent messages without tool calls
                    if (message.role === 'agent' && !message.content && (!message.tool_calls || message.tool_calls.length === 0)) {
                      return false;
                    }
                    return true;
                  })
                  .map((message, index) => (
                  <Suspense
                    key={`${message.created_at}-${index}`}
                    fallback={
                      <div className="h-20 bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
                        <LoadingSpinner size="sm" />
                      </div>
                    }
                  >
                    <ChatMessage
                      key={`${message.created_at}-${index}`}
                      message={message.content}
                      isBot={message.role === 'agent'}
                      timestamp={new Date(message.created_at * 1000).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                      toolCalls={message.tool_calls}
                      images={message.images}
                      streamingError={message.streamingError}
                      isStreaming={isStreaming && index === messages.length - 1}
                    />
                  </Suspense>
                ))}
              </AnimatePresence>

              <AnimatePresence>
                {isStreaming && (() => {
                  // Only show typing indicator if there's no agent message or the last agent message is empty
                  const lastMessage = messages[messages.length - 1];
                  const shouldShowTyping = !lastMessage ||
                    lastMessage.role !== 'agent' ||
                    (!lastMessage.content && (!lastMessage.tool_calls || lastMessage.tool_calls.length === 0));

                  return shouldShowTyping ? (
                    <Suspense fallback={
                      <div className="h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                        <LoadingSpinner size="sm" />
                      </div>
                    }>
                      <TypingIndicator key="typing-indicator" />
                    </Suspense>
                  ) : null;
                })()}
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
          <ChatInput onSendMessage={handleSendMessage} disabled={isStreaming} />
        </Suspense>
      </div>


    </div>
  );
}

export default App;