/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string;
  readonly VITE_APP_VERSION: string;
  readonly VITE_APP_MODE: string;
  readonly VITE_APP_RUN_LOCAL: boolean;
  readonly VITE_APP_BASE_PATH: string;
  readonly VITE_APP_HOST: string;
  readonly VITE_APP_PORT: number;
  readonly VITE_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
