import { type ReactElement, type ReactNode } from 'react';

import { vi } from 'vitest';

import { QueryClient, QueryClientProvider, MutationCache } from '@tanstack/react-query';
import { render as rtlRender, type RenderResult } from '@testing-library/react';

// 💡 vi.fn()에 대입될 모크 함수의 타입을 명시적으로 지정
export const globalErrorMock = vi.fn<(error: Error) => void>();

const createTestQueryClient = (): QueryClient =>
  new QueryClient({
    mutationCache: new MutationCache({
      // 💡 TanStack Query v5의 에러 기본 타입은 'Error' 또는 'unknown'입니다.
      onError: (error: Error) => globalErrorMock(error),
    }),
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false },
    },
  });

// 💡 리턴 타입에 RenderResult 인터페이스를 지정하여 RTL 메서드(screen 등) 호환성 보장
export function renderWithClient(ui: ReactElement): RenderResult {
  const testQueryClient = createTestQueryClient();

  const result = rtlRender(<QueryClientProvider client={testQueryClient}>{ui}</QueryClientProvider>);

  return {
    ...result,
    rerender: (rerenderUi: ReactNode) =>
      result.rerender(<QueryClientProvider client={testQueryClient}>{rerenderUi}</QueryClientProvider>),
  };
}
