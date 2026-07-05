import type { AxiosError } from 'axios';

import { toast } from 'sonner';
import { create } from 'zustand';

import type { IconName } from '@/shared/icons/lucide-icon-registry.ts';
import { LucideIcon } from '@/shared/icons/LucideIcon.tsx';
import type { AlertType, ApiError } from '@/shared/types/api.types.ts';
import { errorParser } from '@/shared/utils/error-parser.ts';

interface MessageState {
  lastMessage: string | null;
  lastType: AlertType | null;
  notify: (type: AlertType, message?: string, description?: string | null, error?: Error | AxiosError | string) => void;
  reset: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  lastMessage: null,
  lastType: null,

  notify: (type, message, description, error) => {
    let msg = message;
    let desc = description;
    if (error) {
      const apiError: ApiError = errorParser(error, message, description);
      msg = apiError.message;
      desc = apiError.description;
    }

    set({ lastType: type, lastMessage: msg });

    let iconName: IconName;
    switch (type) {
      case 'info':
        iconName = 'info';
        break;
      case 'warning':
        iconName = 'triangleAlert';
        break;
      case 'error':
        iconName = 'circleX';
        break;
      case 'critical':
        iconName = 'circleX';
        break;
      default:
        iconName = 'circleCheckBig';
        break;
    }
    if (type === 'critical') {
      toast(msg, {
        description: desc,
        position: 'top-center',
        duration: Infinity,
        action: {
          label: '새로 고침',
          onClick: () => window.location.reload(),
        },
        icon: iconName ? (
          <LucideIcon name={iconName} size={32} strokeWidth={2} className='bg-blue-500 text-white' />
        ) : null,
      });
    } else {
      toast(msg, {
        description: desc,
        position: 'top-center',
        icon: iconName ? (
          <LucideIcon name={iconName} size={32} strokeWidth={2} className='bg-blue-500 text-white' />
        ) : null,
      });
    }
  },

  reset: () => set({ lastMessage: null, lastType: null }),
}));

export const globalNotifier = {
  success: (message: string, description?: string) =>
    useMessageStore.getState().notify('success', message, description),
  info: (message: string, description?: string) => useMessageStore.getState().notify('info', message, description),
  warn: (message: string, description?: string) => useMessageStore.getState().notify('warning', message, description),
  error: (message?: string, description?: string, error?: Error | AxiosError | string) =>
    useMessageStore.getState().notify('error', message, description, error),
  critical: (message?: string, description?: string, error?: Error | AxiosError | string) =>
    useMessageStore.getState().notify('critical', message, description, error),
};
