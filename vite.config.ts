/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env': env,
    },
    plugins: [react()],
    resolve: {
      alias: {
        src: '/src',
        components: '/src/components',
      },
    },
    test: {
      globals: true,
      setupFiles: ['./setupTests.ts', 'dotenv/config'], // Separate file for test setup
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'json-summary'],
      },
    },
  }
})
