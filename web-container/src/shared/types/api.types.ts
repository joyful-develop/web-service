// 백엔드로 보내는 공통 규격
export interface ApiRequest {
  userId: string;
  title?: string;
}

// 백엔드가 보내는 공통 규격
export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
  code?: string;
}
