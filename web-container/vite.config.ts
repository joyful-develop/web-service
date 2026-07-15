/// <reference types="vitest/config" />

import path from 'path';

import browserslist from 'browserslist';
import { browserslistToTargets } from 'lightningcss';
import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import checker from 'vite-plugin-checker';
import svgr from 'vite-plugin-svgr';

// import { federation } from '@module-federation/vite';
import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';

export default ({ mode }: { mode: string }) => {
  const env = {
    ...process.env,
    ...loadEnv(mode, path.resolve(process.cwd(), './'), ''),
  };
  const SERVER_PORT: number = env.VITE_APP_PORT as unknown as number;

  return defineConfig({
    plugins: [
      react(),
      tailwindcss(),
      svgr({
        include: '**/*.svg?react',
      }),
      visualizer(),
      env.VITE_APP_MODE !== 'production' &&
        checker({
          typescript: true,
        }),
      // federation({
      //   name: 'host-admin',
      //   remotes: {}, // 런타임에 DB 데이터로 동적 주입
      //   shared: {
      //     react: { singleton: true },
      //     'react-dom': { singleton: true },
      //     'react-router': { singleton: true },
      //   },
      // }),
    ].filter(Boolean),
    resolve: {
      alias: [
        {
          find: '@',
          replacement: path.resolve(__dirname, 'src'),
        },
        {
          find: '@app',
          replacement: path.resolve(__dirname, 'src/app'),
        },
        {
          find: '@features',
          replacement: path.resolve(__dirname, 'src/features'),
        },
        {
          find: '@pages',
          replacement: path.resolve(__dirname, 'src/pages'),
        },
        {
          find: '@shared',
          replacement: path.resolve(__dirname, 'src/shared'),
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
      emptyOutDir: true,
      target: 'esnext',
      rolldownOptions: {
        output: {
          minify: {
            compress: {
              dropConsole: true,
              dropDebugger: true,
            },
          },
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
              if (id.includes('@radix-ui') || id.includes('sonner')) {
                return 'vendor/radix-ui';
              } else if (id.includes('react-dom@')) {
                return 'vendor/react-dom';
              } else if (id.includes('react@') || id.includes('react-router@') || id.includes('react-hook-form@')) {
                return 'vendor/react';
              } else if (id.includes('msw')) {
                return 'vendor/msw';
              } else if (id.includes('axios')) {
                return 'vendor/axios';
              } else if (id.includes('@tanstack')) {
                return 'vendor/tanstack';
              } else if (id.includes('zod')) {
                return 'vendor/zod';
              } else if (id.includes('i18next')) {
                return 'vendor/i18next';
              } else if (id.includes('module-federation')) {
                return 'vendor/module-federation';
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
      port: SERVER_PORT,
      strictPort: true,
      open: true,
      watch: {
        usePolling: true, // 파일 시스템 잠금 충동 방지
        interval: 100, // 0.1 초마다 검사
      },
      hmr: {
        host: env.VITE_APP_HOST,
        port: SERVER_PORT,
        clientPort: SERVER_PORT,
        overlay: false,
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
