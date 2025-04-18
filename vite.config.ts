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
        '/api/auth': {
          target: process.env.VITE_API_AUTH_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/auth/, ''),
        },
        '/api/employees': {
          target: process.env.VITE_API_EMPLOYEES_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/employees/, ''),
        },
        '/api/innovation': {
          target: process.env.VITE_API_INNOVATION_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/innovation/, ''),
        },
        '/api/repository': {
          target: process.env.VITE_API_REPOSITORY_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/repository/, ''),
        },
        '/api/strapi': {
          target: process.env.VITE_API_STRAPI_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) => path.replace(/^\/api\/strapi/, ''),
        },
        '/api/gamification/v1': {
          target: process.env.VITE_API_GAMIFICATION_SERVICE_URL,
          changeOrigin: true,
          secure: false,
          rewrite: (path) =>
            path.replace(/^\/api\/gamification\/v1/, ''),
        },
        '/api/search-engine/v1': {
          target: process.env.VITE_API_SEARCH_ENGINE_SERVICE_URL,
          changeOrigin: true,
          secure: true,
          rewrite: (path) =>
            path.replace(/^\/api\/search-engine\/v1/, ''),
        },
      },
    },
  };
});
