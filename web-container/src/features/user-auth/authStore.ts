import { create } from 'zustand';
import { devtools, persist } from 'zustand/middleware';

import type { Permission, User } from '@/features/user-auth/user';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  setAuth: (user: User) => void;
  logout: () => void;
  hasPermission: (permission: Permission) => boolean;
}

export const useAuthStore = create<AuthState>()(
  devtools(
    persist(
      (set, get) => ({
        user: null,
        isAuthenticated: false,
        setAuth: (user) => set({ user, isAuthenticated: true }),
        logout: () => set({ user: null, isAuthenticated: false }),
        hasPermission: (permission) => {
          const user = get().user;
          if (!user) return false;
          if (user.role === 'ADMIN') return true; // ADMIN은 모든 권한 통과
          return user.permissions.includes(permission);
        },
      }),
      { name: 'auth-storage' }
    )
  )
);
