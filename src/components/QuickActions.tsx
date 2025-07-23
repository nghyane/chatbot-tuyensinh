import React from 'react';
import { GraduationCap, FileText, MapPin, Phone, Calendar, DollarSign } from 'lucide-react';

interface QuickActionsProps {
  onActionClick: (message: string) => void;
}

const QuickActions: React.FC<QuickActionsProps> = ({ onActionClick }) => {
  const actions = [
    {
      icon: <GraduationCap className="w-4 h-4" />,
      label: 'Các ngành học',
      message: 'Cho tôi biết về các ngành học tại FPT University'
    },
    {
      icon: <DollarSign className="w-4 h-4" />,
      label: 'Học phí',
      message: 'Học phí của FPT University như thế nào?'
    },
    {
      icon: <FileText className="w-4 h-4" />,
      label: 'Hồ sơ xét tuyển',
      message: 'Hồ sơ xét tuyển cần những gì?'
    },
    {
      icon: <Calendar className="w-4 h-4" />,
      label: 'Lịch tuyển sinh',
      message: 'Lịch tuyển sinh năm 2024 như thế nào?'
    },
    {
      icon: <MapPin className="w-4 h-4" />,
      label: 'Cơ sở đào tạo',
      message: 'FPT University có những cơ sở nào?'
    },
    {
      icon: <Phone className="w-4 h-4" />,
      label: 'Liên hệ',
      message: 'Thông tin liên hệ tư vấn tuyển sinh'
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-2 mb-4">
      {actions.map((action, index) => (
        <button
          key={index}
          onClick={() => onActionClick(action.message)}
          className="flex items-center gap-2 p-3 text-sm text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors duration-200"
        >
          {action.icon}
          <span className="text-left flex-1">{action.label}</span>
        </button>
      ))}
    </div>
  );
};

export default QuickActions;