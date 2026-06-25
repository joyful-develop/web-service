import React, { useState } from 'react';

import axios from 'axios';

import { useMutation, useQueryClient } from '@tanstack/react-query';

import { Button } from './shadcn-ui/button.tsx';

export const CreatePost: React.FC = () => {
  const [title, setTitle] = useState('');
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    mutationFn: (newTitle: string) => axios.post('/api/posts', { title }),

    // 💡 중앙 일괄 성공 알림을 발생시키는 핵심 트리거 코드
    meta: {
      successMessage: `새로운 게시글이 안전하게 등록되었습니다.`,
    },

    onSuccess: () => {
      // 컴포넌트는 성공 시 실행해야 하는 순수 비즈니스 로직(화면 갱신, 폼 초기화 등)만 담당
      queryClient.invalidateQueries({ queryKey: ['posts'] });
      setTitle('');
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;
    mutate(title);
  };

  return (
    <form onSubmit={handleSubmit} className='my-4 flex max-w-xl gap-2'>
      <input
        type='text'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder='새 글 제목을 입력하세요'
        className='flex-1 rounded-xl border px-3 py-2 text-sm'
        disabled={isPending}
      />
      <Button type='submit' disabled={isPending}>
        {isPending ? '등록 중...' : `등록`}
      </Button>
    </form>
  );
};
