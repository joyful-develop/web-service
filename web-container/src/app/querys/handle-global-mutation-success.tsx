import { globalNotifier } from '@/shared/store/useNotificationStore.tsx';

import { Mutation, QueryClient } from '@tanstack/react-query';

export const handleGlobalMutationSuccess = (
  _data: unknown,
  _variables: unknown,
  _context: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>,
  queryClient: QueryClient
) => {
  // 자동 쿼리 무효화(Invalidation) 처리
  // 예: meta: { invalidates: [['posts'], ['user']] } 구조로 설정 시 작동
  if (mutation.meta?.invalidates) {
    mutation.meta.invalidates.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey });
    });
  }

  if (mutation.meta?.preventGlobalSuccess) {
    return;
  }

  const message = mutation.meta?.customSuccessMessage || '요청이 성공적으로 처리되었습니다.';
  const description = mutation.meta?.customSuccessDescription || '';

  globalNotifier.error(message, description);
};
