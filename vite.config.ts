/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    define: {
      'process.env': env,
    },
    plugins: [react(), tsconfigPaths()],
    resolve: {
      alias: {
        '@src': path.resolve(__dirname, 'src'),
        '@assets': path.resolve(__dirname,'/src/assets'),
        '@components': path.resolve(__dirname,'/src/components'),
        '@services': path.resolve(__dirname,'/src/services'),
        '@models': path.resolve(__dirname,'/src/models'),
        '@interfaces': path.resolve(__dirname,'/src/interfaces'),
        '@utils': path.resolve(__dirname,'/src/utils'),
      },
    },
    test: {
      globals: true,
      setupFiles: ['./setupTests.ts'], // Separate file for test setup
      environment: 'jsdom',
      coverage: {
        provider: 'v8',
        reporter: ['text', 'json', 'html', 'json-summary'],
      },
    },
  }
})
