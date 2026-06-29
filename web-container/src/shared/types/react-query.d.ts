import '@tanstack/react-query';

declare module '@tanstack/react-query' {
  interface Register {
    queryMeta: {
      preventGlobalError?: boolean; // 전역 에러 핸들러 무시 여부
      customErrorMessage?: string; // 특정 쿼리 전용 에러 메시지
      customErrorDescription?: string; //특정 쿼리 전용 에러 상세 정보
    };
    mutationMeta: {
      preventGlobalSuccess?: boolean; // 전역 성공 핸들러 무시 여부
      customSuccessMessage?: string; // 특정 쿼리 전용 성공 메시지
      customSuccessDescription?: string; //특정 쿼리 전용 성공 상세 정보
      invalidates?: readonly unknown[][]; // 성공 시 자동으로 무효화할 queryKey 배열
      preventGlobalError?: boolean; // 전역 에러 핸들러 무시 여부
      customErrorMessage?: string; // 특정 쿼리 전용 에러 메시지
      customErrorDescription?: string; //특정 쿼리 전용 에러 상세 정보
    };
  }
}
