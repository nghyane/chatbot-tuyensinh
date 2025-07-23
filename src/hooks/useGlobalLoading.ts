import { useCallback, useRef } from 'react';
import { useLoading } from '../contexts/LoadingContext';

export const useGlobalLoading = () => {
  const { setGlobalLoading, setLoadingMessage, isGlobalLoading } = useLoading();
  const loadingTimeoutRef = useRef<number | null>(null);

  const showLoading = useCallback((message?: string, maxDuration?: number) => {
    // Clear any existing timeout
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }

    if (message) {
      setLoadingMessage(message);
    }
    setGlobalLoading(true);

    // Set a safety timeout if maxDuration is provided
    if (maxDuration) {
      loadingTimeoutRef.current = window.setTimeout(() => {
        console.warn(`Loading automatically hidden after ${maxDuration}ms`);
        setGlobalLoading(false);
        loadingTimeoutRef.current = null;
      }, maxDuration);
    }
  }, [setGlobalLoading, setLoadingMessage]);

  const hideLoading = useCallback(() => {
    // Clear timeout when manually hiding
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    setGlobalLoading(false);
  }, [setGlobalLoading]);

  const withLoading = useCallback(async <T>(
    asyncFunction: () => Promise<T>,
    loadingMessage?: string,
    maxDuration?: number
  ): Promise<T> => {
    try {
      showLoading(loadingMessage, maxDuration);
      const result = await asyncFunction();
      return result;
    } finally {
      hideLoading();
    }
  }, [showLoading, hideLoading]);

  // Force hide loading (emergency function)
  const forceHideLoading = useCallback(() => {
    if (loadingTimeoutRef.current) {
      clearTimeout(loadingTimeoutRef.current);
      loadingTimeoutRef.current = null;
    }
    setGlobalLoading(false);
    setLoadingMessage(undefined);
  }, [setGlobalLoading, setLoadingMessage]);

  return {
    showLoading,
    hideLoading,
    withLoading,
    forceHideLoading,
    isGlobalLoading,
  };
};
