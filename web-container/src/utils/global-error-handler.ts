import { AxiosError } from 'axios';

export interface CustomErrorResponse {
  message?: string;
  code?: string;
}

export const handleGlobalError = (error: unknown) => {
  // 1. Axios 에러 처리 (API 에러)
  if (error instanceof AxiosError) {
    const status = error.response?.status;
    const serverData = error.response?.data as CustomErrorResponse;
    const errorMessage = serverData?.message || '알 수 없는 네트워크 오류가 발생했습니다.';

    switch (status) {
      case 401:
        console.error('인증 오류: 로그인이 필요합니다.');
        // 필요 시 토큰 재발급 로직 구현 또는 리다이렉트
        // localStorage.removeItem('accessToken');
        // window.location.href = '/login';
        break;
      case 403:
        console.error('권한 오류: 접근 권한이 없습니다.');
        break;
      case 404:
        console.error('요청 오류: 존재하지 않는 리소스 입니다.');
        break;
      case 500:
        // 500 에러는 상위 ErrorBoundary로 전파하여 에러 스크린을 띄우기 위해 throw
        throw error;
      default:
        console.error(`오류 상태코드 [${status}]: ${errorMessage}`);
    }
    return;
  }

  // 2. 일반 UI / 렌더링 에러 처리
  if (error instanceof Error) {
    console.error('Captured UI Error:', error.message);
    // 외부 모니터링 서비스(Sentry 등)로 전송 로직 추가 가능
    throw error; // ErrorBoundary가 캐치하도록 재생성
  }

  console.error('Unhandled Unknown Error:', error);
};
