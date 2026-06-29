import { toast } from 'sonner';

import { Mutation, QueryClient } from '@tanstack/react-query';

export const handleGlobalMutationSuccess = (
  _data: unknown,
  _variables: unknown,
  _context: unknown,
  mutation: Mutation<unknown, unknown, unknown, unknown>,
  queryClient: QueryClient // 쿼리 무효화를 위해 클라이언트 인스턴스를 전달받음
) => {
  const meta = mutation.meta;

  // 1. 자동 쿼리 무효화(Invalidation) 처리
  // 예: meta: { invalidates: [['posts'], ['user']] } 구조로 설정 시 작동
  if (meta?.invalidates) {
    meta.invalidates.forEach((queryKey) => {
      queryClient.invalidateQueries({ queryKey });
    });
  }

  // 2. 전역 성공 토스트 비활성화 여부 확인
  if (meta?.preventGlobalSuccess) {
    return;
  }

  // 3. sonner 성공 토스트 트리거
  // 메타에 지정된 메시지가 있으면 사용하고, 없으면 기본 메시지를 출력합니다.
  const message = meta?.customSuccessMessage || '요청이 성공적으로 처리되었습니다.';

  toast.success('완료', {
    description: message,
  });
};
