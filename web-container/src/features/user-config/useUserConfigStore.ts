import { create } from 'zustand';
import { createJSONStorage, devtools, persist } from 'zustand/middleware';

import type { TranslationData } from '@/features/user-config/i18n/i18n.types';
import i18n from '@/shared/lib/i18n.ts';

export type ThemeMode = 'light' | 'dark' | 'system';
export type LocaleLanguageCode = 'ko' | 'en' | 'zh' | 'hu';
export interface LocaleLanguage {
  code: LocaleLanguageCode;
  label: string;
}
export const LocaleLanguages: LocaleLanguage[] = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
  { code: 'zh', label: '中文' },
  { code: 'hu', label: 'Magyar' },
];

interface UserConfigState {
  theme: ThemeMode;
  language: LocaleLanguageCode;
  setTheme: (theme: ThemeMode) => void;
  setLanguage: (language: LocaleLanguageCode) => void;
  getLanguageLabel: () => string;
  syncTranslations: (data: TranslationData) => void;
}

export const useUserConfigStore = create<UserConfigState>()(
  devtools(
    persist(
      (set, get) => ({
        theme: 'system',
        language: (i18n.language as LocaleLanguageCode) || 'ko',
        setTheme: (theme) => set({ theme: theme }),
        setLanguage: (language) => {
          i18n.changeLanguage(language);
          set({ language: language });
        },
        getLanguageLabel: () => {
          const findLanguage = LocaleLanguages.find((lang) => lang.code === get().language);
          return findLanguage ? findLanguage.label : '한국어';
        },
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
          set({ language: (i18n.language as LocaleLanguageCode) || 'ko' });
        },
      }),
      {
        name: 'user-config',
        partialize: (state) => ({
          theme: state.theme,
          language: state.language,
        }),
        storage: createJSONStorage(() => localStorage),
      }
    )
  )
);
