/// <reference types="vitest/config" />

import path from 'path';

import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
  const env = {
    ...process.env,
    ...loadEnv(mode, path.resolve(process.cwd(), './config'), ''),
  };
  const SERVER_PORT: number = env.VITE_APP_PORT as unknown as number;

  return defineConfig({
    envDir: './config/',
    envPrefix: ['VITE_'],
    plugins: [
      react(),
      tailwindcss(),
      svgr({
        svgrOptions: {
          svgo: true,
          svgoConfig: {
            plugins: [
              {
                name: 'preset-default',
                params: {
                  overrides: {
                    removeViewBox: false,
                  },
                },
              },
              'cleanupIDs',
              'removeStyleElement',
              'removeScriptElement',
            ],
          },
        },
        include: '**/*.svg?react',
      }),
      visualizer(),
    ],
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src'),
        },
        {
          find: '@assets',
          replacement: path.resolve(__dirname, 'src/assets'),
        },
        {
          find: '@components',
          replacement: path.resolve(__dirname, 'src/components'),
        },
        {
          find: '@hooks',
          replacement: path.resolve(__dirname, 'src/hooks'),
        },
        {
          find: '@pages',
          replacement: path.resolve(__dirname, 'src/pages'),
        },
        {
          find: '@layout',
          replacement: path.resolve(__dirname, 'src/layout'),
        },
        {
          find: '@stores',
          replacement: path.resolve(__dirname, 'src/stores'),
        },
        {
          find: '@types',
          replacement: path.resolve(__dirname, 'src/types'),
        },
        {
          find: '@utils',
          replacement: path.resolve(__dirname, 'src/utils'),
        },
      ],
      extensions: [],
    },
    test: {
      globals: true,
      environment: 'jsdom',
      setupFiles: ['./tests/vitest.setup.ts'],
      exclude: ['./node_modules/**', './dist/**', './e2e/**'],
    },
    mode: env.VITE_APP_MODE,
    root: './',
    publicDir: './public/',
    base: env.VITE_APP_BASE_PATH,
    define: {
      __APP_ENV__: JSON.stringify(env.APP_ENV),
      __APP_VERSION__: JSON.stringify(env.VITE_APP_VERSION),
      'import.meta.env.ENV_VARIABLE': JSON.stringify(process.env.ENV_VARIABLE),
    },
    build: {
      outDir: path.resolve(__dirname, './dist'),
      emptyOutDir: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.names?.[0] ?? '';
            const fileNames: string[] =
              fileName !== '' ? fileName.split('.') : [];
            let ext: string =
              fileNames.length > 0 ? fileNames[fileNames.length - 1] : '';
            if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(ext)) {
              ext = 'images';
            } else if (/woff|woff2/i.test(ext)) {
              ext = 'fonts';
            }
            return `assets/${ext}/[name]-[hash][extname]`;
          },
          chunkFileNames: 'assets/[name]-[hash].js',
          manualChunks(id) {
            if (id.includes('node_modules')) {
              if (
                id.includes('react@') ||
                id.includes('react-dom@') ||
                id.includes('react-router@') ||
                id.includes('react-router-dom@')
              ) {
                return `vendor/react`;
              }
              return `vendor/common`;
            }
          },
        },
      },
    },
    server: {
      host: env.VITE_APP_HOST,
      port: SERVER_PORT,
      strictPort: true,
      // https
      open: true,
      proxy: {
        '/api': {
          target: env.VITE_APP_API_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          // secure: false,
          // ws: true,
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (_proxyReq, req) => {
              console.log(
                'Sending Request to the Target:',
                req.method,
                req.url
              );
            });
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log(
                'Received Response from the Target:',
                proxyRes.statusCode,
                req.url
              );
            });
          },
        },
      },
    },
    preview: {
      host: env.VITE_APP_HOST,
      port: SERVER_PORT,
      open: true,
    },
  });
};
