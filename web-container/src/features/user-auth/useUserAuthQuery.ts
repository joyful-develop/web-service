import { useNavigate } from 'react-router';

import { useMutation, useQueryClient } from '@tanstack/react-query';

export const useLogout = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: async () => {
      // 실제 API 호출 로직
      // await axios.post('/api/logout');
    },
    onSuccess: () => {
      queryClient.clear(); // 캐시 초기화
      navigate('/login'); // 로그아웃 후 이동
    },
  });
};
