import type { TranslationData, TranslationDbData } from '@/features/user-config/i18n/i18n.types';
import axiosInstance from '@/shared/lib/axios-instance.ts';
import type { ApiResponse } from '@/shared/types/api.types.ts';

export const getAllTranslations = async () => {
  const response = await axiosInstance.post<ApiResponse<TranslationDbData[]>>('getTranslations');

  const translationData: TranslationData = {};
  response.data?.forEach(({ locale, key, value }) => {
    if (!translationData[locale]) {
      translationData[locale] = { translation: {} };
    }
    translationData[locale].translation[key] = value;
  });

  return { ...translationData };
};
