import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import viteTsconfigPaths from 'vite-tsconfig-paths';
import { resolve } from 'path';
const { visualizer } = require('rollup-plugin-visualizer');

export default defineConfig({
  // depending on your application, base can also be "/"
  base: '/',
  plugins: [react(), viteTsconfigPaths()],
  server: {
    open: true,
    port: 3000,
  },
  build: {
    rollupOptions: {
      cache: true,
      input: {
        main: resolve(__dirname, 'index.html'),
        nested: resolve(__dirname, 'public/order-success.html'),
      },
      plugins: [visualizer()],
      output: {
        manualChunks(id) {
          if (id.includes('@mui')) {
            return 'mui';
          }
          if (id.includes('src')) {
            return 'src';
          }
          if (id.includes('lodash')) {
            return 'lodash';
          }
          if (id.includes('date-fns') || id.includes('moment') || id.includes('dayjs')) {
            return 'date-time';
          }
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        },
      },
    },
  },
  optimizeDeps: {},
});
