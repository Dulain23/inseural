import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig(({ mode }) => {

  const env = loadEnv(mode, process.cwd());

  const targetUrl = 'http://localhost:4000';

  return {
    plugins: [react()],
    server: {
      host: true,
      proxy: {
        '/api': {
          target: targetUrl,
          secure: false,
          changeOrigin: true,
        }
      }
    },
  };
});