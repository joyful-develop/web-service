import '@testing-library/jest-dom/vitest';
import { beforeAll, afterEach, afterAll } from 'vitest';

import { cleanup } from '@testing-library/react';

import { server } from './server.ts';

afterEach(() => {
  cleanup();
});

// 모든 테스트 실행 전 MSW 서버 시작
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }));

// 각 테스트 후 핸들러 초기화 (테스트 간 영향 방지)
afterEach(() => server.resetHandlers());

// 모든 테스트 종료 후 서버 정리
afterAll(() => server.close());
