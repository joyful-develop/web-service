import type { Role, User } from '@/features/user-account/user.ts';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

interface UpdateUserRolePayload {
  userId: string;
  role: Role; // any 대신 정확한 Role 타입 명시
}

const fetchUsers = async (): Promise<User[]> => {
  const res = await fetch('/api/users');
  if (!res.ok) throw new Error('사용자 목록을 불러오지 못했습니다.');

  // 백엔드 응답 데이터가 실제 구조와 맞는지 검증하고 싶다면 가볍게 파싱을 추가해도 좋습니다.
  return res.json() as Promise<User[]>;
};

const updateUserRole = async ({ userId, role }: UpdateUserRolePayload): Promise<User> => {
  const res = await fetch(`/api/users/${userId}/role`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ role }),
  });
  if (!res.ok) throw new Error('역할 수정에 실패했습니다.');
  return res.json() as Promise<User>;
};

export const useUsers = () => {
  return useQuery<User[], Error>({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 1000 * 60 * 5,
  });
};

export const useUpdateUserRole = () => {
  const queryClient = useQueryClient();

  return useMutation<User, Error, UpdateUserRolePayload>({
    mutationFn: updateUserRole,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] });
    },
  });
};
