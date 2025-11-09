
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: './', // Use relative paths for assets to work with HashRouter on static hosting.
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});
