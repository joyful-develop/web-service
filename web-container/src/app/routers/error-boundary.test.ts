// // 📄 src/tests/router-instance-error.test.tsx
// import { describe, it, expect, vi, beforeEach } from 'vitest';
// import { render, screen, waitFor } from '@testing-library/react';

// import AppRouter from '@/app/routers/AppRouter.tsx';

// // 2. 특정 페이지 컴포넌트를 에러 유발 컴포넌트로 모킹 (파일 경로 지정)
// vi.mock('../pages/DashboardPage', () => {
//   return {
//     DashboardPage: () => {
//       throw new Error('기존 라우터 내부에서 발생한 실제 컴포넌트 에러!');
//     },
//   };
// });

// describe('완성된 Router 인스턴스를 활용한 ErrorBoundary 테스트', () => {
//   beforeEach(() => {
//     // 테스트 간 라우터 상태가 꼬이지 않도록 초기화 (필요 시)
//     vi.restoreAllMocks();
//   });

//   it('RouterProvider에 기존 router를 주입하고 에러 페이지 주소로 이동 시 ErrorBoundary가 작동한다', async () => {
//     // 터미널 콘솔에 찍히는 리액트 자체 에러 로그 숨기기
//     const consoleSpy = vi.spyOn(console, 'error').mockImplementation(() => {});

//     // 3. 이미 구성되어 있는 <RouterProvider router={router} /> 그대로 렌더링
//     render(<AppRouter />);

//     // 4. 테스트 코드 내부에서 강제로 에러가 발생하는 주소('/dashboard')로 이동시킴
//     // 데이터 라우터는 외부에서 직접 navigate 명령을 내릴 수 있습니다.
//     await waitFor(() => {
//       router.navigate('/dashboard');
//     });

//     // 5. 검증 (Assertion)
//     // 기존에 주입되어 있던 ProjectErrorBoundary가 정상 동작했는지 확인
//     expect(screen.getByTestId('project-error-boundary')).toBeInTheDocument();
//     expect(screen.getByRole('alert')).toHaveTextContent('기존 라우터 내부에서 발생한 실제 컴포넌트 에러!');

//     consoleSpy.mockRestore();
//   });
// });
