import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { NuqsAdapter } from 'nuqs/adapters/react';
import { Toaster } from 'sonner';
import App from './App.tsx';
import { LoadingProvider } from './contexts/LoadingContext';
import GlobalLoadingOverlay from './components/GlobalLoadingOverlay';
import ErrorBoundary from './components/ErrorBoundary';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ErrorBoundary>
      <NuqsAdapter>
        <LoadingProvider>
          <App />
          <GlobalLoadingOverlay />
          <Toaster
            position="top-right"
            richColors
            closeButton
            duration={4000}
          />
        </LoadingProvider>
      </NuqsAdapter>
    </ErrorBoundary>
  </StrictMode>
);
