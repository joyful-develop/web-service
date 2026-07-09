import { Suspense } from 'react';

import { useLocation, type LoaderFunction } from 'react-router';

import { GlobalSuspenseFallback } from '@/app/layouts/GlobalSuspenseFallback.tsx';
import { postService } from '@/features/post/post-service.ts';
import type { ApiRequest } from '@/shared/types/api.types.ts';

import { CreatePost } from '@features/post/CreatePost.tsx';
import { TodoForm } from '@features/todo/TodoForm.tsx';
import { useSuspenseQuery } from '@tanstack/react-query';

export interface Post {
  id?: number;
  title?: string;
}

export default function Abort() {
  const location = useLocation();

  const { data: posts } = useSuspenseQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const request: ApiRequest = { userId: '123456' };
      const response = await postService.getPosts(request);
      return response || [];
    },
    staleTime: 0,
    gcTime: 0,
  });

  return (
    <Suspense key={location.key} fallback={<GlobalSuspenseFallback />}>
      <div className='space-y-4'>
        <h1 className='text-xl font-bold tracking-tight text-slate-900'>피드 목록</h1>
        <div className='divide-y divide-slate-100 overflow-hidden rounded-xl border border-slate-200 bg-white shadow-sm'>
          {posts.map((post) => (
            <div key={post.id} className='p-4 text-sm text-slate-700 transition-colors hover:bg-slate-50/80'>
              {post.title}
            </div>
          ))}
        </div>
      </div>
      <CreatePost />
      <TodoForm />
    </Suspense>
  );
}

export const loader: LoaderFunction = async () => {
  return {
    message: '타입 안정성이 보장된 데이터 입니다.',
    timestamp: Date.now(),
  };
};
