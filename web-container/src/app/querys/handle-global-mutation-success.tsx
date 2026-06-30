import { toast } from 'sonner';

import { Mutation, QueryClient } from '@tanstack/react-query';

export const handleGlobalMutationSuccess = (
  _data: unknown,
  _variables: unknown,
  _context: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>,
  queryClient: QueryClient
) => {
  const meta = mutation.meta;

  // 자동 쿼리 무효화(Invalidation) 처리
  // 예: meta: { invalidates: [['posts'], ['user']] } 구조로 설정 시 작동
  if (meta?.invalidates) {
    meta.invalidates.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey });
    });
  }

  if (meta?.preventGlobalSuccess) {
    return;
  }

  const message = meta?.customSuccessMessage || '요청이 성공적으로 처리되었습니다.';

  toast.success('완료', {
    description: message,
  });
};
