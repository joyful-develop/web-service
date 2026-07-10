import { z } from 'zod';

// 유효한 테마 리터럴 정의 (컴포넌트에서 타입가드용으로 활용)
export const VALID_THEMES = ['light', 'dark', 'system'] as const;
export type ThemeType = (typeof VALID_THEMES)[number];

export const settingsFormSchema = z.object({
  username: z.string().min(2, '이름은 2글자 이상이어야 합니다.'),
  syncEnabled: z.boolean().default(false),

  // 일반 설정 탭
  theme: z.enum(VALID_THEMES, {
    error: '테마를 선택해주세요.',
  }),
  language: z.string().min(1, '언어를 선택해주세요.'),

  // 알림 설정 탭
  emailNotifications: z.boolean().default(true),
  pushNotifications: z.boolean().default(false),
  marketingMails: z.boolean().default(false),

  // 보안 설정 탭
  sessionTimeout: z.string().default('30'),
  twoFactorAuth: z.boolean().default(false),
});

export type SettingsFormValues = z.infer<typeof settingsFormSchema>;
