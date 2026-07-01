// 백엔드로 보내는 공통 규격
export interface ApiRequest {
  userId: string;
  title?: string;
}

// 백엔드가 보내는 공통 규격
export interface ApiResponse<T> {
  success: boolean;
  message?: string; // 메시지 제목 또는 다국어 코드
  description?: string; // 메시지 본문 또는 다국어 코드
  errorType?: AlertType; // 에러 타입
  errorCode?: string; //에러 코드
  data: T;
}

export type AlertType = 'success' | 'info' | 'warning' | 'error' | 'critical';

export interface ApiError {
  type: AlertType;
  message: string;
  description: string;
  errorCode: string;
  status: number;
}
