import { http, HttpResponse } from 'msw';

import type { ApiRequest } from '@/types/api.ts';

export const menuHandlers = [
  http.post(`${import.meta.env.VITE_API_BASE_URL}/userMenus`, async ({ request }) => {
    const { userId } = (await request.json()) as ApiRequest;

    return HttpResponse.json(
      {
        menus: !userId
          ? []
          : [
              {
                rawId: 1,
                groupId: 'g1',
                id: '1',
                label: 'Home',
                path: '',
                file: 'pages/Home/Home.tsx',
                icon: '',
                isDefault: true,
                order: 1,
                parentId: '',
                children: [],
                desc: '',
              },
              {
                rawId: 2,
                groupId: 'g2',
                id: '2',
                label: 'About',
                path: '/about',
                file: 'pages/About/About.tsx',
                icon: '',
                isDefault: false,
                order: 2,
                parentId: '',
                children: [],
                desc: '',
              },
            ],
      },
      { status: !userId ? 400 : 201 }
    );
  }),
];
