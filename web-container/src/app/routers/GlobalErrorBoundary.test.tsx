/* eslint-disable @typescript-eslint/no-explicit-any */
import { describe, it, expect, vi, beforeEach } from 'vitest';

import GlobalErrorBoundary from '@/app/routers/GlobalErrorBoundary.tsx';
import * as errorParserModule from '@/shared/utils/error-parser.ts';

import { render, screen } from '@testing-library/react';

// 1. react-router의 가볍고 확실한 정밀 모킹 (실제 훅만 가로챕니다)
const mockUseRouteError = vi.fn();
const mockUseLocation = vi.fn();
const mockNavigate = vi.fn();

vi.mock('react-router', () => ({
  // 에러 바운더리가 호출할 가짜 훅 등록
  useRouteError: () => mockUseRouteError(),
  useLocation: () => mockUseLocation(),
  // <Navigate /> 컴포넌트가 올바른 파라미터로 호출되는지 가로채는 마크업
  Navigate: ({ to, state }: { to: string; state?: any }) => {
    mockNavigate(to, state); // 호출 추적용 스파이 함수 실행
    return <div data-testid='mock-navigate' data-to={to} data-state={JSON.stringify(state)} />;
  },
}));

// 2. 외부 ErrorBoundary UI 컴포넌트 모킹
vi.mock('@/shared/components/ErrorBoundary.tsx', () => ({
  default: ({ message, description }: { message: string; description: string }) => (
    <div data-testid='fallback-error-boundary'>
      <h1>{message}</h1>
      <p>{description}</p>
    </div>
  ),
}));

describe('GlobalErrorBoundary 컴포넌트 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    // 기본 위치 상태 설정 (기본적으로 대시보드에 머물고 있다고 가정)
    mockUseLocation.mockReturnValue({ pathname: '/dashboard' });
    // useRouteError가 던질 가짜 원본 에러 객체 설정
    mockUseRouteError.mockReturnValue(new Error('Original API Error'));
  });

  it('401 에러 발생 시, 현재 경로를 state에 담아 /login으로 리다이렉트해야 한다', () => {
    vi.spyOn(errorParserModule, 'errorParser').mockImplementation(() => ({
      type: 'error',
      status: 401,
      code: 'UNAUTHORIZED',
      message: '인증 만료',
      description: '로그인이 필요합니다.',
    }));

    // 컴포넌트를 그냥 단독 렌더링해도 라우터 컨텍스트 에러가 나지 않습니다!
    render(<GlobalErrorBoundary />);

    // 1. data-testid 요소를 찾을 수 있는지 검증
    const navigateEl = screen.getByTestId('mock-navigate');
    expect(navigateEl).toBeInTheDocument();

    // 2.  Navigate 컴포넌트에 props가 정상 도달했는지 확인
    expect(navigateEl).toHaveAttribute('data-to', '/login');

    // 3. 함수 호출 레벨까지 2중으로 엄격하게 검증 가능
    expect(mockNavigate).toHaveBeenCalledWith('/login', { from: '/dashboard' });
  });

  it('403 에러 발생 시, /forbidden 페이지로 리다이렉트해야 한다', () => {
    vi.spyOn(errorParserModule, 'errorParser').mockImplementation(() => ({
      type: 'error',
      status: 403,
      code: 'FORBIDDEN',
      message: '권한 부족',
      description: '접근 권한이 없습니다.',
    }));

    render(<GlobalErrorBoundary />);

    const navigateEl = screen.getByTestId('mock-navigate');
    expect(navigateEl).toBeInTheDocument();
    expect(navigateEl).toHaveAttribute('data-to', '/forbidden');
    expect(mockNavigate).toHaveBeenCalledWith('/forbidden', undefined);
  });

  it('그 외 일반 에러 발생 시 리다이렉트하지 않고 ErrorBoundary UI를 노출해야 한다', () => {
    vi.spyOn(errorParserModule, 'errorParser').mockImplementation(() => ({
      type: 'error',
      status: 500,
      code: 'INTERNAL_SERVER_ERROR',
      message: '서버 에러 발생',
      description: '잠시 후 다시 시도해주세요.',
    }));

    render(<GlobalErrorBoundary />);

    // Navigate 컴포넌트가 나타나지 않아야 함
    expect(screen.queryByTestId('mock-navigate')).not.toBeInTheDocument();
    expect(mockNavigate).not.toHaveBeenCalled();

    // 대신 일반 UI가 그려졌는지 확인
    expect(screen.getByTestId('fallback-error-boundary')).toBeInTheDocument();
    expect(screen.getByText('서버 에러 발생')).toBeInTheDocument();
  });
});
