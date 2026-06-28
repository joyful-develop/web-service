import { delay, http, HttpResponse } from 'msw';

import type { TodoResponse } from '@/features/todo/todo-service';

export const todoHandlers = [
  // Todo 생성 API 모킹 (POST)
  http.post(`${import.meta.env.VITE_API_BASE_URL}/todos`, async ({ request }) => {
    const body = (await request.json()) as { title: string; description: string };

    console.log('title: ' + body.title);

    // 성공 응답 반환
    await delay(100);
    return HttpResponse.json<TodoResponse>(
      {
        id: 999,
        title: body.title,
        description: body.description,
        createdAt: new Date().toISOString(),
      },
      { status: 201 }
    );
  }),
];
