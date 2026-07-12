import type { BaseDbData } from '@/shared/types/global.types.ts';

export interface TranslationDbData extends BaseDbData {
  locale: string;
  key: string;
  value: string;
}

export interface TranslationData {
  [locale: string]: {
    translation: {
      [key: string]: string;
    };
  };
}
