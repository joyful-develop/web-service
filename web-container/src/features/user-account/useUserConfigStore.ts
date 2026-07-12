import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

export type ThemeMode = 'light' | 'dark' | 'system';
export type LocaleLanguage = 'ko' | 'en' | 'zh' | 'hu';

interface UserConfigState {
  theme: ThemeMode;
  language: LocaleLanguage;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (lang: LocaleLanguage) => void;
}

export const useUserConfigStore = create<UserConfigState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'system',
        language: 'ko',
        setTheme: (theme) => set({ theme }),
        setLanguage: (language) => set({ language }),
      }),
      {
        name: 'user-config', // 브라우저 저장소에 저장될 키(key) 이름
        storage: createJSONStorage(() => localStorage), // 저장할 공간 지정
      }
    )
  )
);
