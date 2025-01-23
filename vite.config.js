import { defineConfig } from 'vite';
import * as path from 'path';

export default defineConfig({
  root: 'src',
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: [{ find: '#', replacement: path.resolve(__dirname, 'src') }],
  },
  server: {
    port: 8000,
    proxy: {
      '/api/comics': {
        changeOrigin: true,
        target: 'https://xkcd.com',
        rewrite: (path) => path.replace(/^\/api\/comics\/xkcd/, ''),
      },
      '/files/comics': {
        changeOrigin: true,
        target: 'https://imgs.xkcd.com/comics',
        rewrite: (path) => path.replace(/^\/files\/comics\/xkcd/, ''),
      },
    },
  },
});
