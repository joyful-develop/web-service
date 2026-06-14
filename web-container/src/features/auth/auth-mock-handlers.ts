import { http, HttpResponse } from 'msw';

export const authMockHandlers = [
  http.get('/api/users', () => {
    return HttpResponse.json([
      { id: 1, name: 'Alice' },
      { id: 2, name: 'Bob' },
    ]);
  }),

  http.post('/api/users', async ({ request }) => {
    const newUser = await request.json();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (!(newUser as any).name) {
      return new HttpResponse(null, { status: 400 });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return HttpResponse.json({ id: 2, ...(newUser as any) }, { status: 201 });
  }),
];
