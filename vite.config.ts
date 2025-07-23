import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    react(),
    // Add bundle analyzer for analyze mode
    ...(mode === 'analyze' ? [
      visualizer({
        filename: 'dist/stats.html',
        open: true,
        gzipSize: true,
        brotliSize: true,
      })
    ] : [])
  ],

  // Dependency optimization
  optimizeDeps: {
    include: ['react', 'react-dom'],
    // Remove lucide-react from exclude since we're using individual imports
  },

  // Server configuration for development
  server: {
    // Warm up frequently used files for faster loading
    warmup: {
      clientFiles: [
        './src/App.tsx',
        './src/components/Sidebar.tsx',
        './src/components/ChatHeader.tsx',
        './src/components/WelcomeScreen.tsx',
      ],
    },
    // Enable HMR for faster development
    hmr: {
      overlay: true,
    },
  },

  // Build optimization
  build: {
    // Enable minification
    minify: 'esbuild',
    // Optimize chunk splitting
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks for better caching
          vendor: ['react', 'react-dom'],
          // lucide-react will be automatically chunked by Vite
        },
      },
    },
    // Enable source maps for debugging in production
    sourcemap: false,
    // Set chunk size warning limit
    chunkSizeWarningLimit: 1000,
  },

  // CSS optimization
  css: {
    devSourcemap: true,
  },
}));
