// src/app/routers/AppRouter.test.tsx
import { describe, it, expect, beforeEach, vi } from 'vitest';

import AppRouter from '@/app/routers/AppRouter.tsx';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'; // useMenuQuery가 react-query 기준일 때
import { render, screen, waitFor } from '@testing-library/react';

// 1. 모듈 페더레이션 및 glob 구조가 포함된 lazy 헬퍼를 가상 모킹으로 교체
vi.mock('@/app/routers/lazy-loader.tsx', () => ({
  createDynamicComponent: (type: string, path: string) => async () => ({
    Component: () => <div>Mocked Page: {path}</div>,
  }),
}));

// 2. React Router 내부의 외부 경로 이동 검증을 위한 mock 설정
const mockNavigate = vi.fn();
vi.mock('react-router', async () => {
  const actual = await vi.importActual('react-router');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// 테스트마다 깨끗한 QueryClient 스택 준비
let queryClient: QueryClient;
beforeEach(() => {
  vi.clearAllMocks();
  queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false, gcTime: 0 }, // 테스트 속도를 위해 재시도 끔
    },
  });
});

describe('AppRouter 통합 테스트', () => {
  // it('로딩 중일 때는 GlobalLoadingFallback 스피너를 표시한다', async () => {
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <AppRouter />
  //     </QueryClientProvider>
  //   );
  //   // 컴포넌트 내부의 기본 메시지 검증
  //   expect(screen.getByText('메뉴 및 권한 정보를 불러오는 중입니다...')).toBeInTheDocument();
  // });

  it('메뉴 데이터를 성공적으로 가져오면 기본(index) 페이지를 렌더링한다', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <AppRouter />
      </QueryClientProvider>
    );
    // 로딩이 끝나고 createDynamicComponent 결과물이 화면에 부착되는지 확인
    await waitFor(() => {
      expect(screen.getByText('Mocked Page: /')).toBeInTheDocument();
    });
  });

  // it('401 인증 에러가 발생하면 에러 바운더리에 의해 로그인 페이지 이동 로직이 실행된다', async () => {
  //   // 해당 테스트 전용 userId를 AppRouter에 강제 주입하기 위해 spy하거나 spy가 어렵다면 전역 기믹 활용
  //   // 여기서는 테스트 편의상 AppRouter 내부의 userId 변수를 테스트용으로 가로채거나 mock을 조정합니다.
  //   vi.spyOn(console, 'error').mockImplementation(() => {}); // 에러 로그 숨기기
  //   // useMenuQuery가 의도적으로 401을 반환하도록 주입 예시 (만약 custom hook이라면 hook 자체를 모킹하는 게 가장 깔끔합니다)
  //   // 아래는 useMenuQuery 자체를 일시적으로 에러 상태로 모킹하는 대안입니다.
  //   // const { useMenuQuery } = await import('@/features/menu/useMenuQuery.ts');
  //   vi.mock('@/features/menu/useMenuQuery.ts', () => ({
  //     useMenuQuery: () => ({
  //       data: undefined,
  //       isLoading: false,
  //       error: { response: { status: 401 } }, // GlobalErrorBoundary의 errorParser가 읽을 구조
  //     }),
  //   }));
  //   render(
  //     <QueryClientProvider client={queryClient}>
  //       <AppRouter />
  //     </QueryClientProvider>
  //   );
  //   // GlobalErrorBoundary 내부의 useEffect 내 navigate('/login') 호출 검증
  //   await waitFor(() => {
  //     expect(mockNavigate).toHaveBeenCalledWith('/login', expect.any(Object));
  //   });
  // });
});
