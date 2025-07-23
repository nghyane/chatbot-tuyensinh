export default {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
    // Add cssnano for production minification
    ...(process.env.NODE_ENV === 'production' ? {
      cssnano: {
        preset: ['default', {
          discardComments: {
            removeAll: true,
          },
          normalizeWhitespace: true,
        }]
      }
    } : {})
  },
};
