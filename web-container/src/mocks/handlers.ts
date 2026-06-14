import { authMockHandlers } from '@/features/auth/auth-mock-handlers.ts';
import { menuMockHandlers } from '@/layouts/menu/menu-mock-handlers.ts';

export const handlers = [...authMockHandlers, ...menuMockHandlers];
