import react from '@vitejs/plugin-react';
import { defineConfig, loadEnv } from 'vite';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };
  return {
    plugins: [react()],
    build: {
      modulePreload: false,
      target: 'esnext',
      minify: false,
      cssCodeSplit: false,
    },
    resolve: {
      alias: {
        '@components': '/src/components',
        '@configs': '/src/configs',
        '@constants': '/src/constants',
        '@hooks': '/src/hooks',
        '@services': '/src/services',
        '@utils': '/src/utils',
        '@pages': '/src/pages',
      },
    },
    server: {
      port: 3000,
      proxy: {
        '/api/employees/v1': {
          target: process.env.VITE_API_EMPLOYEES_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(/^\/api\/employees\/v1/, ''),
        },
        '/api/innovation/v1': {
          target: process.env.VITE_API_INNOVATION_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(/^\/api\/innovation\/v1/, ''),
        },
        '/api/repository/v1': {
          target: process.env.VITE_API_REPOSITORY_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(/^\/api\/repository\/v1/, ''),
        },
      },
    },
  };
});
