import React, { createContext, useContext, useState, ReactNode, useRef, useCallback } from 'react';

interface LoadingContextType {
  isGlobalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
  loadingMessage?: string;
  setLoadingMessage: (message?: string) => void;
}

const LoadingContext = createContext<LoadingContextType | undefined>(undefined);

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (context === undefined) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

interface LoadingProviderProps {
  children: ReactNode;
  maxLoadingDuration?: number; // Maximum loading duration in milliseconds
}

export const LoadingProvider: React.FC<LoadingProviderProps> = ({
  children,
  maxLoadingDuration = 1500 // Default 1.5 seconds
}) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState<string | undefined>();
  const timeoutRef = useRef<number | null>(null);

  const setGlobalLoading = useCallback((loading: boolean) => {
    // Clear any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    setIsGlobalLoading(loading);

    if (!loading) {
      setLoadingMessage(undefined);
    } else {
      // Set auto-hide timeout when loading starts
      timeoutRef.current = setTimeout(() => {
        console.warn('Loading automatically hidden after maximum duration');
        setIsGlobalLoading(false);
        setLoadingMessage(undefined);
        timeoutRef.current = null;
      }, maxLoadingDuration);
    }
  }, [maxLoadingDuration]);

  return (
    <LoadingContext.Provider
      value={{
        isGlobalLoading,
        setGlobalLoading,
        loadingMessage,
        setLoadingMessage,
      }}
    >
      {children}
    </LoadingContext.Provider>
  );
};
