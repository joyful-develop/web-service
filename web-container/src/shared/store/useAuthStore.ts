import { create } from 'zustand';

interface User {
  name: string;
  email: string;
  avatarUrl?: string;
}

interface AuthState {
  user: User | null;
  logout: () => void;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: {
    name: '홍길동',
    email: 'hong@example.com',
    avatarUrl: 'https://github.com',
  },
  logout: () => set({ user: null }),
}));
