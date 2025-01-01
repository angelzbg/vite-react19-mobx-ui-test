import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    preprocessorOptions: {
      less: {
        // You can customize LESS here (e.g., global variables, mixins)
        javascriptEnabled: true
      }
    }
  }
});
