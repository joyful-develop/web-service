import { useRouteError, isRouteErrorResponse } from 'react-router';

import { getErrorMessage } from '@/shared/utils/errorParser.ts';

export function CentralErrorBoundary() {
  const error = useRouteError(); // React Router가 잡은 에러 추출
  const errorMessage = getErrorMessage(error);

  // 404 등 라우팅 관련 에러 분기 처리
  if (isRouteErrorResponse(error)) {
    if (error.status === 404) {
      return <div style={{ padding: 20 }}>페이지를 찾을 수 없습니다 (404)</div>;
    }
  }

  return (
    <div style={{ padding: 20, border: '2px solid red', borderRadius: 8 }}>
      <h2>문제가 발생했습니다.</h2>
      <p style={{ color: 'red' }}>{errorMessage}</p>
      <button onClick={() => window.location.reload()}>새로고침</button>
    </div>
  );
}
