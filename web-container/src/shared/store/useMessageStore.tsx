import { toast } from 'sonner';
import { create } from 'zustand';

// 1. 메시지 유형 정의
export type MessageType = 'success' | 'info' | 'warning' | 'error' | 'critical';

interface MessageState {
  lastMessage: string | null;
  lastType: MessageType | null;
  // 전역 알림 액션
  notify: (type: MessageType, title: string, description?: string) => void;
  // 에러 클리어
  clearMessage: () => void;
}

export const useMessageStore = create<MessageState>((set) => ({
  lastMessage: null,
  lastType: null,

  notify: (type, title, description) => {
    set({ lastMessage: title, lastType: type });

    // 2. 등급별 sonner 토스트 맵핑 및 디자인 커스텀
    switch (type) {
      case 'success':
        toast.success(title, { description });
        break;
      case 'info':
        toast.info(title, { description });
        break;
      case 'warning':
        toast.warning(title, { description });
        break;
      case 'error':
        toast.error(title, { description });
        break;
      case 'critical':
        toast.error(`[심각] ${title}`, {
          description,
          duration: Infinity,
          action: {
            label: '새로고침',
            onClick: () => window.location.reload(),
          },
        });
        break;
    }
  },

  clearMessage: () => set({ lastMessage: null, lastType: null }),
}));

export const globalNotifier = {
  success: (title: string, desc?: string) => useMessageStore.getState().notify('success', title, desc),
  info: (title: string, desc?: string) => useMessageStore.getState().notify('info', title, desc),
  warn: (title: string, desc?: string) => useMessageStore.getState().notify('warning', title, desc),
  error: (title: string, desc?: string) => useMessageStore.getState().notify('error', title, desc),
  critical: (title: string, desc?: string) => useMessageStore.getState().notify('critical', title, desc),
};
