import 'vite';

import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './e2e', // 설정한 테스트 폴더명
  /* Fail the build on CI if you accidentally left test.only in the source code. */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Opt out of parallel tests on CI for resources */
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',

  // ▼▼▼ 이 부분을 추가하세요 ▼▼▼
  webServer: {
    command: 'pnpm run dev', // Vite 실행 명령어
    url: 'http://localhost:5001', // Vite 기본 포트 (프로젝트 설정에 맞게 변경)
    reuseExistingServer: !process.env.CI,
  },
  // ▲▲▲ 이 부분을 추가하세요 ▲▲▲

  use: {
    baseURL: 'http://localhost:5001', // baseURL을 설정해두면 page.goto('/')로 접근 가능
    trace: 'on-first-retry',
  },

  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
