import { todoService, type TodoRequest, type TodoResponse } from '@/features/todo/todo-service.ts';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation<TodoResponse, Error, TodoRequest>({
    mutationFn: todoService,

    // 성공 시 실행할 사이드 이펙트 (보통 기존 쿼리 무효화에 사용)
    onSuccess: (data) => {
      console.log('생성 성공:', data);
      // 'todos'라는 Key를 가진 useQuery를 신선하지 않은(stale) 상태로 만들어 데이터를 새로고침합니다.
      queryClient.invalidateQueries({ queryKey: ['todos'] });
    },
  });
};
