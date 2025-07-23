/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Custom breakpoints optimized for mobile-first design
      screens: {
        'xs': '475px',    // Extra small devices (large phones)
        'sm': '640px',    // Small devices (landscape phones)
        'md': '768px',    // Medium devices (tablets)
        'lg': '1024px',   // Large devices (laptops)
        'xl': '1280px',   // Extra large devices (desktops)
        '2xl': '1536px',  // 2X large devices (large desktops)
        // Custom breakpoints for specific use cases
        'mobile': {'max': '767px'},     // Target mobile only
        'tablet': {'min': '768px', 'max': '1023px'}, // Target tablet only
        'desktop': {'min': '1024px'},   // Target desktop and up
      },
      // Custom animations for better performance
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-slow': 'bounce 2s infinite',
      },
      // Optimize gradient colors
      colors: {
        primary: {
          50: '#eff6ff',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
        },
      },
    },
  },
  plugins: [],
  // Performance optimizations
  corePlugins: {
    // Disable unused core plugins to reduce CSS size
    preflight: true,
    container: false, // Not used in the project
    accessibility: false, // Not used in the project
  },
  // Optimize for production
  ...(process.env.NODE_ENV === 'production' && {
    // Additional production optimizations
    experimental: {
      optimizeUniversalDefaults: true,
    },
  }),
};
