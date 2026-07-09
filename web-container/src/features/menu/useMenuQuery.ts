import { useEffect } from 'react';

import { menuService } from '@/features/menu/menu.api.ts';
import { useMenuStore } from '@/features/menu/useMenuStore.ts';
import type { ApiRequest } from '@/shared/types/api.types.ts';

import { useSuspenseQuery } from '@tanstack/react-query';

export function useMenuQuery(request: ApiRequest) {
  const setMenus = useMenuStore((state) => state.setMenus);

  const queryResult = useSuspenseQuery({
    queryKey: ['menus', request],
    queryFn: () => menuService.getUserMenu(request),
    staleTime: Infinity,
    gcTime: Infinity,
    refetchOnWindowFocus: false, // 브라우저 창을 다시 포커스해도 재요청 안 함
    refetchOnReconnect: false, // 네트워크가 다시 연결되어도 재요청 안 함
  });

  useEffect(() => {
    if (queryResult.data && queryResult.data.length > 0) {
      setMenus(queryResult.data);
    }
  }, [queryResult.data, setMenus]);

  return queryResult;
}
