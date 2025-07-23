import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import { LoadingProvider } from './contexts/LoadingContext';
import GlobalLoadingOverlay from './components/GlobalLoadingOverlay';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <App />
      <GlobalLoadingOverlay />
    </LoadingProvider>
  </StrictMode>
);
