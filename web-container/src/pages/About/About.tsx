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
  // 💡useSuspenseQuery 덕분에 데이터 상태 분기문(?., isLoading)이 완전 제거된 동기식 코딩
  const { data: posts } = useSuspenseQuery<Post[]>({
    queryKey: ['posts'],
    queryFn: async () => {
      const request: ApiRequest = { userId: '123456' };
      const response = await postService.getPosts(request);
      return response.data;
    },
  });

  return (
    <div>
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
    </div>
  );
}

export async function aboutLoader() {
  const response = await fetch('https://example.com');

  if (!response.ok) {
    throw new Response('데이터를 가져오지 못했습니다.', { status: response.status });
  }
  return response.json();
}
