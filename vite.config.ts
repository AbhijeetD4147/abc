import { defineConfig } from 'vite'
import { nodePolyfills } from 'vite-plugin-node-polyfills'

export default defineConfig({
  plugins: [
    nodePolyfills(),
  ],
  resolve: {
    alias: {
      // We can remove the manual buffer alias as the plugin handles it.
    },
  },
  optimizeDeps: {
    // The plugin also handles this, so we can remove it.
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
