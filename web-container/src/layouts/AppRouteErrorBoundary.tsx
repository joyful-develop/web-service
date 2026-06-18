import { useRouteError, isRouteErrorResponse } from 'react-router';

export default function AppRouteErrorBoundary() {
  const error = useRouteError();

  if (isRouteErrorResponse(error)) {
    return (
      <div>
        <div>
          상태 코드: {error.status}, 메시지: {error.statusText}
        </div>
        <p>{error.data || '요청하신 페이지에 문제가 있습니다.'}</p>
        <button onClick={() => (window.location.href = '/')}>홈으로 돌아가기</button>
      </div>
    );
  }

  if (error instanceof Error) {
    return (
      <div>
        <h1>애플리케이션 오류가 발생했습니다!</h1>
        <pre>{error.message}</pre>
        <button onClick={() => window.location.reload()}>새로고침</button>
      </div>
    );
  }

  return (
    <div>
      <h1>오류가 발생했습니다!</h1>
      <p>알 수 없는 오류가 발생했습니다.</p>
    </div>
  );
}
