import { menuService } from '@/features/menu/menu.api.ts';
import type { ApiRequest } from '@/shared/types/api.types.ts';

import { useSuspenseQuery } from '@tanstack/react-query';

export function useMenuQuery(request: ApiRequest) {
  return useSuspenseQuery({
    queryKey: ['menus', request],
    queryFn: () => menuService.getUserMenu(request),
    staleTime: 10 * 60 * 1000, // 10분 동안 fresh 상태 유지
    gcTime: 15 * 60 * 1000,
  });
}
