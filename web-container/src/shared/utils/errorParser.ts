import axios from 'axios';

export class CustomError extends Error {
  constructor(
    // public code: number,
    message: string
  ) {
    super(message);
    this.name = 'CustomError';
  }
}

export const getErrorMessage = (error: unknown): string => {
  if (typeof error === 'string') return error;

  if (axios.isAxiosError(error)) {
    return error.response?.data?.message || error.message || '네트워크 에러가 발생했습니다.';
  }

  if (error instanceof CustomError) {
    return `[Code: ] ${error.message}`;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return '알 수 없는 오류가 발생했습니다.';
};
