import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { TranslationData } from '@/features/user-config/i18n/i18n.types';
import i18n from '@/shared/lib/i18n.ts';

export type ThemeMode = 'light' | 'dark' | 'system';
export type LocaleLanguage = 'ko' | 'en' | 'zh' | 'hu';

interface UserConfigState {
  theme: ThemeMode;
  language: LocaleLanguage;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (lang: LocaleLanguage) => void;
  syncTranslations: (data: TranslationData) => void;
}

export const useUserConfigStore = create<UserConfigState>()(
  devtools(
    persist(
      (set) => ({
        theme: 'system',
        language: (i18n.language as LocaleLanguage) || 'ko',
        setTheme: (theme) => set({ theme: theme }),
        setLanguage: (language) => {
          i18n.changeLanguage(language);
          set({ language: language });
        },
        // DB 데이터를 i18n 리소스에 동적으로 덮어쓰는 핵심 엔지니어링 액션
        syncTranslations: (data) => {
          Object.keys(data).forEach((lang) => {
            i18n.addResourceBundle(
              lang,
              'translation',
              data[lang].translation,
              true, // deep merge
              true // overwrite (새로고침 시 메모리 내 이전 번역 리소스를 완전히 덮어씀)
            );
          });
          console.log('다국어 데이터: ', data);
          // i18n 내부 상태 강제 갱신 리렌더링 트리거
          i18n.changeLanguage(i18n.language);
          set({ language: (i18n.language as LocaleLanguage) || 'ko' });
        },
      }),
      {
        name: 'user-config', // 저장소에 저장될 키
        // 저장소에 저장될 상태
        partialize: (state) => ({
          theme: state.theme,
          language: state.language,
        }),
        storage: createJSONStorage(() => localStorage), // 저장소
      }
    )
  )
);
