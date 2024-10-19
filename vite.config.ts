import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/subgraph': {
        target: 'https://api.thegraph.com',
        changeOrigin: true,
        rewrite: (path) => path.replace('\subgraph', ''),
      },
    },
  },
});