// import { render, screen, waitFor } from '@testing-library/react';
// import { Root } from 'react-day-picker';
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import AppRouter from '@/app/routers/AppRouter.tsx';

// // 1. 외부 모듈 모킹 (Mocking)
// vi.mock('@/app/layouts/RootLayout.tsx', () => ({ default: () => <div>Root Layout</div> }));
// vi.mock('@/app/routers/CentralErrorBoundary.tsx', () => ({ default: () => <div>Central Error</div> }));
// vi.mock('@/app/routers/RootErrorBoundary.tsx', () => ({ default: () => <div>Root Error</div> }));
// vi.mock('@/pages/Login.tsx', () => ({ default: () => <div>Login Page</div> }));
// vi.mock('@/pages/Forbidden.tsx', () => ({ default: () => <div>Forbidden Page</div> }));

// // lazy-loader 모킹: 단순한 컴포넌트를 반환하는 구조로 시뮬레이션
// vi.mock('@/app/routers/lazy-loader.tsx', () => ({
//   createDynamicComponent: vi.fn().mockReturnValue(() => ({
//     Component: () => <div>Dynamic Page Content</div>,
//   })),
// }));

// // Zustand 스토어와 React Query 훅 모킹 함수 정의
// const mockUseMenuQuery = vi.hoisted(() => vi.fn());
// const mockUseMenuStore = vi.hoisted(() => vi.fn());

// vi.mock('@/features/menu/useMenuQuery.ts', () => ({
//   useMenuQuery: mockUseMenuQuery,
// }));

// vi.mock('@/features/menu/useMenuStore.ts', () => ({
//   useMenuStore: mockUseMenuStore,
// }));

// describe('AppRouter 컴포넌트 테스트', () => {
//   beforeEach(() => {
//     vi.clearAllMocks();
//   });

//   it('데이터가 로딩 중일 때는 로딩 메시지를 표시한다', () => {
//     // 가짜 훅 상태 설정: isLoading이 true일 때
//     mockUseMenuQuery.mockReturnValue({ isLoading: true });
//     mockUseMenuStore.mockReturnValue([]); // 빈 메뉴

//     render(<AppRouter />);

//     expect(screen.getByText('메뉴 로딩 중...')).toBeInTheDocument();
//   });

//   it('메뉴 데이터 로드 후 동적 라우터가 정상적으로 렌더링된다', async () => {
//     // 가짜 훅 상태 설정: 로딩 완료 및 가짜 메뉴 데이터 제공
//     mockUseMenuQuery.mockReturnValue({ isLoading: false });

//     // useMenuStore((state) => state.menus) 선택자 함수 실행 시 반환할 값
//     mockUseMenuStore.mockImplementation((selector) =>
//       selector({
//         menus: [
//           {
//             isDefault: true,
//             path: '/home',
//             type: 'PAGE',
//             localPath: 'pages/Home',
//             remoteUrl: '',
//           },
//         ],
//       })
//     );

//     render(<AppRouter />);

//     // RootLayout이 정상적으로 렌더링되었는지 확인
//     await waitFor(() => {
//       expect(screen.getByText('Root Layout')).toBeInTheDocument();
//     });
//   });
// });
