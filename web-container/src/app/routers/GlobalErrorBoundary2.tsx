import { useRouteError } from 'react-router';

import { getErrorMessage } from '@/shared/utils/errorParser.ts';

export function GlobalErrorBoundary2() {
  const error = useRouteError();
  const errorMessage = getErrorMessage(error);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        width: '100vw',
        backgroundColor: '#fdfefe',
        fontFamily: 'sans-serif',
      }}>
      <h1 style={{ color: '#e74c3c', fontSize: '32px', marginBottom: '10px' }}>
        시스템에 일시적인 오류가 발생했습니다.
      </h1>
      <p style={{ color: '#7f8c8d', marginBottom: '20px', textAlign: 'center' }}>
        애플리케이션 초기화 중 문제가 발생했습니다. <br />
        아래 버튼을 눌러 서비스를 다시 시작해 주세요.
      </p>

      {/* 개발 환경 확인용 상세 에러 메시지 */}
      <pre
        style={{
          backgroundColor: '#f4f6f7',
          padding: '15px',
          borderRadius: '5px',
          color: '#c0392b',
          maxWidth: '80%',
          overflowX: 'auto',
        }}>
        {errorMessage}
      </pre>

      <button
        onClick={() => (window.location.href = '/')} // 메인으로 강제 새로고침 리셋
        style={{
          padding: '12px 24px',
          backgroundColor: '#3498db',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          fontWeight: 'bold',
          marginTop: '20px',
        }}>
        홈으로 돌아가기
      </button>
    </div>
  );
}
