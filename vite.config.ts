import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { visualizer } from 'rollup-plugin-visualizer';
import path from 'path';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
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
    // Proxy configuration to handle CORS
    proxy: {
      '/api': {
        target: 'https://agent-tuyensinh-production.up.railway.app',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
        secure: true,
        configure: (proxy, _options) => {
          proxy.on('error', (err, _req, _res) => {
            console.log('proxy error', err);
          });
          proxy.on('proxyReq', (proxyReq, req, _res) => {
            console.log('Sending Request to the Target:', req.method, req.url);
          });
          proxy.on('proxyRes', (proxyRes, req, _res) => {
            console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
          });
        },
      }
    }
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
