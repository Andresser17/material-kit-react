import path from 'path';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tsconfigPaths from 'vite-tsconfig-paths';
import checker from 'vite-plugin-checker';

// ----------------------------------------------------------------------

export default defineConfig({
  base: './',
  resolve: {
    alias: {
      'src': path.resolve(__dirname, 'src'),
    },
    // {
    //   find: /^~(.+)/,
    //   replacement: path.join(process.cwd(), 'node_modules/$1'),
    // },
    // {
    //   find: /^src(.+)/,
    //   replacement: path.join(process.cwd(), 'src/$1'),
    // },
  },
  plugins: [
    react(),
    // tsconfigPaths(),
    checker({
      eslint: {
        lintCommand: 'eslint "./src/**/*.{js,jsx,ts,tsx}"',
      },
    }),
  ],
  server: {
    port: 3030,
  },
  preview: {
    port: 3030,
  },
});
