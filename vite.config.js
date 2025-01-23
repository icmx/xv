import { defineConfig } from 'vite';
import * as path from 'path';

export const GLOBAL_COMMIT_REF =
  process.env['COMMIT_REF'] || 'development';

export default defineConfig({
  root: 'src',
  publicDir: 'static',
  define: {
    GLOBAL_COMMIT_REF: JSON.stringify(GLOBAL_COMMIT_REF),
  },
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
