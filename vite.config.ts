import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
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
