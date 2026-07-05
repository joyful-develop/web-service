export interface ApiRequest {
  userId: string;
  title?: string;
}

export type AlertType = 'success' | 'info' | 'warning' | 'error' | 'critical';

export interface ApiError {
  type: AlertType;
  status: number; // http status (예: 400, 401)
  code: string; // Custom code (예: COUPON_ALREADY_USED, C002)
  message: string;
  description: string;
}

export interface ApiResponse<T> {
  success: boolean;
  status: number;
  message: string;
  description: string;
  data: T | null;
  error: ApiError | null;
}
