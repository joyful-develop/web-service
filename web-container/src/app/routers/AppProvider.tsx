// import { queryClient } from '@/app/querys/query-client.ts';
// import DynamicRouter from '@/app/routers/DynamicRouter.tsx';
// import { menuService } from '@/features/menu/menu.api.ts';
// // import type { MenuItem } from '@/features/menu/menu.type.ts';
// // import { useMenuStore } from '@/features/menu/useMenuStore.ts';
// // import { useMenuQuery } from '@/features/menu/useMenuQuery.ts';
// // import { useMenuStore } from '@/features/menu/useMenuStore.ts';
// // import { useMenuQuery } from '@/features/menu/useMenuQuery.ts';
// import type { ApiRequest } from '@/shared/types/api.types.ts';

// export default async function AppProvider() {
//   const request: ApiRequest = { userId: '123456' };
//   await queryClient.prefetchQuery({
//     queryKey: ['menus', request],
//     queryFn: async () => menuService.getUserMenu(request),
//   });

//   // 성공 시 전역 상태(Context)나 Props로 데이터를 내려줄 수 있음
//   return <DynamicRouter />;
// }
