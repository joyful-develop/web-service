// // import { useEffect } from 'react';

// import { menuService } from '@/features/menu/menu.api.ts';
// import { useMenuStore } from '@/features/menu/useMenuStore.ts';
// import type { ApiRequest } from '@/shared/types/api.types.ts';

// import { useQuery } from '@tanstack/react-query';

// // export function useMenuQuery(request: ApiRequest) {
// //   const setMenus = useMenuStore((state) => state.setMenus);

// //   const queryResult = useQuery({
// //     queryKey: ['menus', request],
// //     queryFn: () => menuService.getUserMenu(request),
// //     staleTime: 1000,
// //   });

// //   useEffect(() => {
// //     console.log('queryResult: ', queryResult);
// //     if (queryResult.data && queryResult.data.length > 0) {
// //       setMenus(queryResult.data);
// //     }
// //   }, [queryResult.data, setMenus]);

// //   return queryResult;
// // }

// export function useMenuQuery(request: ApiRequest) {
//   const setMenus = useMenuStore((state) => state.setMenus);

//   return useQuery({
//     // 1. 쿼리 키를 원시 값으로 구체화하여 무한 리렌더링 방지 (예시)
//     queryKey: ['menus', request, setMenus],
//     queryFn: async () => {
//       const data = await menuService.getUserMenu(request);
//       console.log('data: ', data);
//       // 2. useEffect 대신 비동기 함수가 성공 완료된 시점에 상태 저장
//       if (data && data.length > 0) {
//         setMenus(data);
//       }
//       return data;
//     },
//   });
// }
