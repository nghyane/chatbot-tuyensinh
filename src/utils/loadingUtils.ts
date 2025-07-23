// Utility functions for common loading scenarios

export const LOADING_MESSAGES = {
  INITIALIZING: 'Đang khởi tạo trang...',
  SAVING_DATA: 'Đang lưu dữ liệu...',
  CONNECTING: 'Đang kết nối...',
  UPLOADING: 'Đang tải lên...',
  DOWNLOADING: 'Đang tải xuống...',
  SEARCHING: 'Đang tìm kiếm...',
  LOADING_PROFILE: 'Đang tải thông tin...',
} as const;

export type LoadingMessage = typeof LOADING_MESSAGES[keyof typeof LOADING_MESSAGES];

// Simulate network delay for development/testing
export const simulateNetworkDelay = (min: number = 1000, max: number = 3000): Promise<void> => {
  const delay = Math.random() * (max - min) + min;
  return new Promise(resolve => setTimeout(resolve, delay));
};

// Common loading durations
export const LOADING_DURATIONS = {
  QUICK: 500,
  NORMAL: 1500,
  SLOW: 3000,
  VERY_SLOW: 5000,
} as const;
