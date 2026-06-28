import { create } from 'zustand';

import type { TranslationData } from '@shared/i18n/i18n.types.ts';
import i18n from '@shared/lib/i18n.ts';

interface I18nState {
  currentLang: string;
  setLanguage: (lang: string) => void;
  syncTranslations: (data: TranslationData) => void;
}

export const useI18nStore = create<I18nState>((set) => ({
  currentLang: i18n.language || 'ko',

  // 언어 변경 액션
  setLanguage: (lang) => {
    i18n.changeLanguage(lang);
    set({ currentLang: lang });
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
    // i18n 내부 상태 강제 갱신 리렌더링 트리거
    i18n.changeLanguage(i18n.language);
  },
}));
