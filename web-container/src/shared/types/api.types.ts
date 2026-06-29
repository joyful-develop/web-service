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

// @valid, @validated 로 DTO 검증 실패 오류
export interface VaildError {
  field: string; // "email"
  objectName: string | null; // "userDto"
  value: string; // 사용자가 입력했던 잘못된 값
  valueType: string | null; // 사용자가 입력했던 잘못된 값의 타입
  message: string; // "이메일은 필수 입력 항목입니다."
  code: string | null; // "NotBlank"
}

// 추가 상세 정보 - 사용자에게 알려줄 정보
export interface ErrorDetail {
  message: string;
  messageCode: string | null; // 커스텀 메시지인 경우 다국어 코드
}

export type AlertType = 'Message' | 'Success' | 'Info' | 'Warning' | 'Error';

export interface ApiErrorResponse {
  type?: AlertType | null;
  timestamp: string | null; // "2026-06-21 18:00:01.123",
  status: number | null; // 400
  code: string | null; // "ERR_BAD_REQUEST"
  path: string | null; // "/api/v1/users/register"
  message: string; // "Validation failed for object='userDto'. Error count: 1"
  messageCode?: string | null; // 커스텀 메시지인 경우 다국어 코드
  vaildErrors?: VaildError[] | null;
  errorDetailTitleCode?: string | null;
  errorDetails?: ErrorDetail[] | null;
}

export interface ApiErrorBody {
  type: AlertType;
  message: string;
  code: string;
  status?: number;
  description?: string;
}
