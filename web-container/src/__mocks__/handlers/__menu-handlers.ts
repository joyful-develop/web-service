import { http, HttpResponse } from 'msw';

import type { PostRequestPayload } from '@/types/post-request-payload.ts';

export const menuHandlers = [
  http.post(`${import.meta.env.VITE_APP_API_URL}/userMenus`, async ({ request }) => {
    const userMenu = await request.json();
    if (!(userMenu as PostRequestPayload).userId) {
      return new HttpResponse(null, { status: 400 });
    }

    return HttpResponse.json({
      menus: [
        {
          rawid: 1,
          groupId: 'g1',
          id: '1',
          label: 'Home',
          path: '',
          file: 'pages/Home/Home.tsx',
          icon: '',
          isDefault: false,
          order: 1,
          parentId: '',
          children: [],
          desc: '',
        },
        {
          rawid: 2,
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
    });
  }),
];
