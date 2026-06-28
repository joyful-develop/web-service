import React, { useState } from 'react';

import { useCreateTodo } from '@/features/todo/useCreateTodo.ts';

export const TodoForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  // Custom Hook 호출
  const { mutate, isPending, isError, error } = useCreateTodo();

  const handleSubmit = (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!title || !description) return;

    // 비동기 요청 트리거
    mutate(
      { title, description },
      {
        // 컴포넌트 내부에서만 처리하고 싶은 UI 로직이 있다면 이곳에 추가 콜백 작성 가능
        onSuccess: () => {
          setTitle('');
          setDescription('');
          alert('할 일이 등록되었습니다!');
        },
      }
    );
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxWidth: '300px' }}>
      <input
        type='text'
        placeholder='제목'
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        disabled={isPending}
      />
      <textarea
        placeholder='상세 내용'
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        disabled={isPending}
      />

      <button type='submit' disabled={isPending}>
        {isPending ? '등록 중...' : '추가하기'}
      </button>

      {isError && <p style={{ color: 'red' }}>에러 발생: {error.message}</p>}
    </form>
  );
};
