import { useRouteError, isRouteErrorResponse, useNavigate } from 'react-router';

import { getErrorMessage } from '@/shared/utils/errorParser.ts';

import { useQueryErrorResetBoundary } from '@tanstack/react-query';

export function CentralErrorBoundary2() {
  const error = useRouteError();
  const navigate = useNavigate();
  const errorMessage = getErrorMessage(error);

  // 💥 React Query의 에러 상태 리셋 함수 가져오기
  const { reset } = useQueryErrorResetBoundary();

  // 404 등 라우팅 관련 에러 분기
  if (isRouteErrorResponse(error) && error.status === 404) {
    return (
      <div style={{ padding: 20 }}>
        <h2>페이지를 찾을 수 없습니다 (404)</h2>
        <button onClick={() => navigate('/')}>홈으로 가기</button>
      </div>
    );
  }

  const handleRetry = () => {
    // 1. React Query에 쌓인 에러 캐시를 초기화합니다.
    reset();

    // 2. 현재 라우트의 데이터를 다시 불러오도록 라우터를 재렌더링 시킵니다.
    // (컴포넌트가 다시 마운트되면서 실패했던 queries/mutations가 재실행됩니다)
    navigate('.', { replace: true });
  };

  return (
    <div style={{ padding: 24, border: '2px solid #e74c3c', borderRadius: 8, backgroundColor: '#fdf2f2' }}>
      <h3 style={{ color: '#c0392b', marginTop: 0 }}>데이터를 불러오는 중 오류가 발생했습니다.</h3>
      <p style={{ color: '#7f8c8d', fontSize: '14px' }}>{errorMessage}</p>

      <div style={{ display: 'flex', gap: '10px', marginTop: '15px' }}>
        {/* 🔄 누르면 에러가 사라지고 API를 다시 찌릅니다 */}
        <button
          onClick={handleRetry}
          style={{
            padding: '8px 16px',
            backgroundColor: '#e74c3c',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            fontWeight: 'bold',
          }}>
          다시 시도
        </button>

        <button
          onClick={() => navigate('/')}
          style={{
            padding: '8px 16px',
            backgroundColor: '#bdc3c7',
            color: '#333',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
          }}>
          메인으로 이동
        </button>
      </div>
    </div>
  );
}
