import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  
  console.log('Loaded environment variables:', env);

  return {
    plugins: [
      react(),
    ],
    server: {
      port: 3000,
    },
    define: {
      'process.env': env,
    }
  };
});
