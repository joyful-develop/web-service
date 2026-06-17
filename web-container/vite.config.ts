/// <reference types="vitest/config" />

import path from 'path';

import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
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
          find: '@features',
          replacement: path.resolve(__dirname, 'src/features'),
        },
        {
          find: '@hooks',
          replacement: path.resolve(__dirname, 'src/hooks'),
        },
        {
          find: '@layouts',
          replacement: path.resolve(__dirname, 'src/layouts'),
        },
        {
          find: '@mocks',
          replacement: path.resolve(__dirname, 'src/mocks'),
        },
        {
          find: '@pages',
          replacement: path.resolve(__dirname, 'src/pages'),
        },
        {
          find: '@services',
          replacement: path.resolve(__dirname, 'src/services'),
        },
        {
          find: '@store',
          replacement: path.resolve(__dirname, 'src/store'),
        },
        {
          find: '@styles',
          replacement: path.resolve(__dirname, 'src/styles'),
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
      setupFiles: ['./src/__tests__/vitest.setup.ts'],
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
      cssMinify: 'lightningcss',
      sourcemap: true,
      rollupOptions: {
        output: {
          entryFileNames: 'assets/[name]-[hash].js',
          assetFileNames: (assetInfo) => {
            const fileName = assetInfo.names?.[0] ?? '';
            const fileNames: string[] = fileName !== '' ? fileName.split('.') : [];
            let ext: string = fileNames.length > 0 ? fileNames[fileNames.length - 1] : '';
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
              if (id.includes('react@') || id.includes('react-dom@') || id.includes('react-router@')) {
                return 'vendor/react';
              } else if (id.includes('msw')) {
                return 'vendor/msw';
              } else if (id.includes('.pnpm')) {
                return 'vendor/pnpm';
              }
              return 'vendor/common';
            }
          },
        },
      },
    },
    css: {
      transformer: 'lightningcss',
      lightningcss: {
        targets: browserslistToTargets(browserslist('>= 0.25%')),
      },
    },
    server: {
      host: env.VITE_APP_HOST,
      allowedHosts: ['.joyful.com'],
      port: SERVER_PORT,
      strictPort: true,
      open: true,
      hmr: {
        host: env.VITE_APP_HOST,
        port: SERVER_PORT,
        clientPort: SERVER_PORT,
      },
      proxy: {
        '/api': {
          target: env.VITE_API_BASE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api/, ''),
          // secure: false,
          // ws: true,
          configure: (proxy) => {
            proxy.on('error', (err) => {
              console.log('proxy error', err);
            });
            proxy.on('proxyReq', (_proxyReq, req) => {
              console.log('Sending Request to the Target:', req.method, req.url);
            });
            proxy.on('proxyRes', (proxyRes, req) => {
              console.log('Received Response from the Target:', proxyRes.statusCode, req.url);
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
