import path from 'path';

import { visualizer } from 'rollup-plugin-visualizer';
import { defineConfig, loadEnv } from 'vite';
import svgr from 'vite-plugin-svgr';

import federation from '@originjs/vite-plugin-federation';
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
      svgr(),
      visualizer(),
      federation({
        name: 'host-app',
        remotes: {
          remoteApp: 'http://localhost:5001/assets/remoteEntry.js',
        },
        shared: ['react', 'react-dom'],
      }),
    ],
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
          find: '@entities',
          replacement: path.resolve(__dirname, 'src/entities'),
        },
        {
          find: '@features',
          replacement: path.resolve(__dirname, 'src/features'),
        },
        {
          find: '@lib',
          replacement: path.resolve(__dirname, 'src/lib'),
        },
        {
          find: '@pages',
          replacement: path.resolve(__dirname, 'src/pages'),
        },
        {
          find: '@sharded',
          replacement: path.resolve(__dirname, 'src/sharded'),
        },
        {
          find: '@widgets',
          replacement: path.resolve(__dirname, 'src/widgets'),
        },
      ],
      extensions: [],
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
      sourcemap: true,
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
              const module = id.split('node_modules/').pop()?.split('/')[0];
              if (
                module === 'react-dom' ||
                module === 'react-router' ||
                module === 'headlessui' ||
                module === 'floating-ui'
              ) {
                return `vendor/${module}`;
              }
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
