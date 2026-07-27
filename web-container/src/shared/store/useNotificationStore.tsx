import type { AxiosError } from 'axios';

import { CircleCheckBig, CircleX, Info, TriangleAlert, type LucideIcon } from 'lucide-react';
import { toast } from 'sonner';
import { create } from 'zustand';

import type { AlertType, ApiError } from '@/shared/types/api.types.ts';
import { errorParser } from '@/shared/utils/error-parser.ts';

interface NotificationState {
  lastMessage: string | null;
  lastType: AlertType | null;
  notify: (type: AlertType, message?: string, description?: string | null, error?: Error | AxiosError | string) => void;
  reset: () => void;
}

export const useNotificationStore = create<NotificationState>((set) => ({
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

    let Icon: LucideIcon;
    switch (type) {
      case 'info':
        Icon = Info;
        break;
      case 'warning':
        Icon = TriangleAlert;
        break;
      case 'error':
        Icon = CircleX;
        break;
      case 'critical':
        Icon = CircleX;
        break;
      default:
        Icon = CircleCheckBig;
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
        icon: Icon ? <Icon size={32} strokeWidth={2} className='bg-blue-500 text-white' /> : null,
      });
    } else {
      toast(msg, {
        description: desc,
        position: 'top-center',
        icon: Icon ? <Icon size={32} strokeWidth={2} className='bg-blue-500 text-white' /> : null,
      });
    }
  },

  reset: () => set({ lastMessage: null, lastType: null }),
}));

export const globalNotifier = {
  success: (message: string, description?: string) =>
    useNotificationStore.getState().notify('success', message, description),
  info: (message: string, description?: string) => useNotificationStore.getState().notify('info', message, description),
  warn: (message: string, description?: string) =>
    useNotificationStore.getState().notify('warning', message, description),
  error: (message?: string, description?: string, error?: Error | AxiosError | string) =>
    useNotificationStore.getState().notify('error', message, description, error),
  critical: (message?: string, description?: string, error?: Error | AxiosError | string) =>
    useNotificationStore.getState().notify('critical', message, description, error),
};
