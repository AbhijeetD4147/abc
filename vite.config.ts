import { defineConfig } from 'vite'

export default defineConfig({
  resolve: {
    alias: {
      'buffer': 'buffer',
    },
  },
  optimizeDeps: {
    include: ['buffer'],
  },
  build: {
    target: 'esnext', // Add this line to support top-level await
    commonjsOptions: {
      transformMixedEsModules: true,
    },
    rollupOptions: {
      external: [], // Override any external settings that might be causing issues
    },
  },
})
