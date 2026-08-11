import { defineConfig } from 'vite';
import * as path from 'path';
import { serviceWorker } from './vite/plugins/vite-plugin-service-worker';

const proxy = {
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
};

export default defineConfig({
  root: 'src',
  publicDir: 'static',
  plugins: [
    serviceWorker({
      src: path.resolve(__dirname, 'src/service-worker.js'),
    }),
  ],
  build: {
    outDir: '../dist',
    emptyOutDir: true,
  },
  resolve: {
    alias: [{ find: '#', replacement: path.resolve(__dirname, 'src') }],
  },
  server: { port: 8000, proxy },
  preview: { port: 8001, proxy },
});
