import { defineConfig } from 'vitest/config'
import vue from '@vitejs/plugin-vue'
import { fileURLToPath } from 'node:url'

export default defineConfig({
  // @ts-expect-error - Vite plugin type mismatch between vitest's internal vite and @vitejs/plugin-vue
  plugins: [vue()],
  test: {
    environment: 'happy-dom',
    globals: true,
  },
  resolve: {
    alias: {
      '~': fileURLToPath(new URL('./', import.meta.url)),
      '@': fileURLToPath(new URL('./', import.meta.url)),
    },
  },
})
