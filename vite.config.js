import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/test-contacts',
  server: {
      proxy: {
        '/api': {
          target: 'https://live.devnimble.com',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),

        },
      },
    },
    build: {
      rollupOptions: {
        output: {
          manualChunks: {
            'react-router-dom': ['react-router-dom']
          }
        }
      }
    }
});