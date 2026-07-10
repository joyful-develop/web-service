import type { SettingsFormValues } from '@/features/settings/settings.schema.ts';

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

// 가상 API 함수
const fetchSettings = async (): Promise<SettingsFormValues> => {
  return {
    username: 'Chrome User',
    syncEnabled: true,
    theme: 'system',
    language: 'ko',
    emailNotifications: true,
    pushNotifications: false,
    marketingMails: false,
    sessionTimeout: '30',
    twoFactorAuth: false,
  };
};

const updateSettings = async (data: SettingsFormValues) => {
  return data; // 실제 환경에서는 axios나 fetch 사용
};

export const useSettingsQuery = () => {
  return useQuery({
    queryKey: ['settings'],
    queryFn: fetchSettings,
  });
};

export const useUpdateSettingsMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateSettings,
    onSuccess: (data) => {
      queryClient.setQueryData(['settings'], data);
    },
  });
};
