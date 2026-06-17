// 백엔드로 보내는 공통 규격
export interface ApiRequest {
  userId: string;
}

// 백엔드가 보내는 공통 규격
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  code?: string;
}

// 오류 처리에 사용되는 공통 규격
export interface ApiErrorResponse {
  message: string;
  code?: string;
  status?: number;
}
