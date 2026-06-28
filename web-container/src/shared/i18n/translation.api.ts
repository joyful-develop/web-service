import type { TranslationData, TranslationDbData } from '@shared/i18n/i18n.types.ts';
import axiosInstance from '@shared/lib/axios-instance.ts';
import type { ApiResponse } from '@shared/types/api.types';

export const translationApi = {
  getTranslation: async () => {
    const response = await axiosInstance.post<ApiResponse<TranslationDbData[]>>('getTranslation');

    const translationData: TranslationData = {};
    response.data.forEach(({ locale, key, value }) => {
      if (!translationData[locale]) {
        translationData[locale] = { translation: {} };
      }
      translationData[locale].translation[key] = value;
    });

    console.log(translationData);
    return { ...translationData };
  },
};
