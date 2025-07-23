import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Bot, Check, Loader2 } from 'lucide-react';
import { usePlaygroundStore } from '@/store';
import { ComboboxAgent } from '@/types/playground';
import { useQueryState } from 'nuqs';

interface AgentSelectorProps {
  className?: string;
}

const AgentSelector: React.FC<AgentSelectorProps> = ({ className = '' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const { agents, isEndpointLoading } = usePlaygroundStore();
  const [agentId, setAgentId] = useQueryState('agent');

  const selectedAgent = agents.find(agent => agent.value === agentId);

  const handleSelectAgent = (agent: ComboboxAgent) => {
    setAgentId(agent.value);
    setIsOpen(false);
  };

  if (isEndpointLoading) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg ${className}`}>
        <Loader2 className="w-4 h-4 animate-spin text-gray-500" />
        <span className="text-sm text-gray-600">Đang tải agents...</span>
      </div>
    );
  }

  if (agents.length === 0) {
    return (
      <div className={`flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg ${className}`}>
        <Bot className="w-4 h-4 text-red-500" />
        <span className="text-sm text-red-600">Không có agent nào khả dụng</span>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`}>
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-2 px-3 py-2 bg-white border border-gray-300 rounded-lg hover:border-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-400 transition-colors"
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Bot className="w-4 h-4 text-blue-600 flex-shrink-0" />
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {selectedAgent?.label || 'Chọn Agent'}
            </p>
            {selectedAgent && (
              <p className="text-xs text-gray-500 truncate">
                {selectedAgent.model.provider} - {selectedAgent.model.model}
              </p>
            )}
          </div>
        </div>
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.2 }}
        >
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </motion.div>
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-60 overflow-y-auto"
          >
            {agents.map((agent) => (
              <motion.button
                key={agent.value}
                onClick={() => handleSelectAgent(agent)}
                className="w-full flex items-center gap-2 px-3 py-2 text-left hover:bg-blue-50 focus:outline-none focus:bg-blue-50 transition-colors"
                whileHover={{ backgroundColor: 'rgba(59, 130, 246, 0.05)' }}
                whileTap={{ scale: 0.98 }}
              >
                <Bot className="w-4 h-4 text-blue-600 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {agent.label}
                  </p>
                  <p className="text-xs text-gray-500 truncate">
                    {agent.model.provider} - {agent.model.model}
                  </p>
                  {agent.storage && (
                    <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-700 text-xs rounded-full">
                      Lưu trữ
                    </span>
                  )}
                </div>
                {selectedAgent?.value === agent.value && (
                  <Check className="w-4 h-4 text-blue-600 flex-shrink-0" />
                )}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop to close dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default AgentSelector;
