import { format } from 'date-fns';
import { http, HttpResponse } from 'msw';

import type { TranslationDbData } from '@/shared/i18n/i18n.types.ts';
import type { ApiResponse } from '@/shared/types/api.types.ts';

export const i18n = [
  http.post(`${import.meta.env.VITE_API_BASE_URL}/getTranslations`, async () => {
    const date = new Date();
    const formattedDate: string = format(date, 'yyyy-MM-dd HH:mm:ss');

    const menu: ApiResponse<TranslationDbData[]> = {
      success: true,
      message: '',
      data: [
        {
          rawId: 1,
          status: 'C',
          locale: 'ko',
          key: 'greeting',
          value: '안녕하세요.',
          createBy: '아무개(123456)',
          createAt: `${formattedDate}`,
          updateBy: '아무개(123456)',
          updateAt: `${formattedDate}`,
        },
        {
          rawId: 2,
          status: 'C',
          locale: 'en',
          key: 'greeting',
          value: 'Hello.',
          createBy: '아무개(123456)',
          createAt: `${formattedDate}`,
          updateBy: '아무개(123456)',
          updateAt: `${formattedDate}`,
        },
        {
          rawId: 3,
          status: 'C',
          locale: 'ko',
          key: 'logout',
          value: '로그아웃',
          createBy: '아무개(123456)',
          createAt: `${formattedDate}`,
          updateBy: '아무개(123456)',
          updateAt: `${formattedDate}`,
        },
        {
          rawId: 4,
          status: 'C',
          locale: 'en',
          key: 'logout',
          value: 'Log Out',
          createBy: '아무개(123456)',
          createAt: `${formattedDate}`,
          updateBy: '아무개(123456)',
          updateAt: `${formattedDate}`,
        },
        {
          rawId: 5,
          status: 'C',
          locale: 'ko',
          key: 'welcome',
          value: '안녕하세요, 방문을 환영합니다!!!',
          createBy: '아무개(123456)',
          createAt: `${formattedDate}`,
          updateBy: '아무개(123456)',
          updateAt: `${formattedDate}`,
        },
        {
          rawId: 6,
          status: 'C',
          locale: 'en',
          key: 'welcome',
          value: 'Welcome, nice to meet you!!!',
          createBy: '아무개(123456)',
          createAt: `${formattedDate}`,
          updateBy: '아무개(123456)',
          updateAt: `${formattedDate}`,
        },
        {
          rawId: 7,
          status: 'C',
          locale: 'ko',
          key: 'refresh_btn',
          value: '다국어 데이터 새로고침',
          createBy: '아무개(123456)',
          createAt: `${formattedDate}`,
          updateBy: '아무개(123456)',
          updateAt: `${formattedDate}`,
        },
        {
          rawId: 8,
          status: 'C',
          locale: 'en',
          key: 'refresh_btn',
          value: 'Refresh Translations',
          createBy: '아무개(123456)',
          createAt: `${formattedDate}`,
          updateBy: '아무개(123456)',
          updateAt: `${formattedDate}`,
        },
        {
          rawId: 9,
          status: 'C',
          locale: 'ko',
          key: 'current_lang',
          value: '현재 언어',
          createBy: '아무개(123456)',
          createAt: `${formattedDate}`,
          updateBy: '아무개(123456)',
          updateAt: `${formattedDate}`,
        },
        {
          rawId: 10,
          status: 'C',
          locale: 'en',
          key: 'current_lang',
          value: 'Current Language',
          createBy: '아무개(123456)',
          createAt: `${formattedDate}`,
          updateBy: '아무개(123456)',
          updateAt: `${formattedDate}`,
        },
      ],
    };
    return HttpResponse.json(menu, { status: 200 });
  }),

  http.post(`${import.meta.env.VITE_API_BASE_URL}/setTranslation`, async ({ request }) => {
    const translationDbData = (await request.json()) as TranslationDbData[];

    const groupCounts = translationDbData.reduce<Record<string, number>>((acc, obj) => {
      const key = obj.status;
      acc[key] = (acc[key] || 0) + 1;
      return acc;
    }, {});

    const response: ApiResponse<string> = {
      success: translationDbData.length > 0 ? true : false,
      message: translationDbData.length > 0 ? '' : 'update 에 실패 했습니다.',
      data: translationDbData.length > 0 ? JSON.stringify(groupCounts) : '',
    };

    return HttpResponse.json(response, { status: translationDbData.length > 0 ? 201 : 400 });
  }),
];
