import { toast } from 'sonner';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import { LucideIcon } from '@/shared/icons/LucideIcon.tsx';
import { useMessageStore } from '@/shared/store/useMessageStore.tsx';

import { waitFor } from '@testing-library/react';

vi.mock('sonner', () => {
  const mockToast = vi.fn();
  return {
    toast: mockToast,
  };
});

describe('Message Store 통합 테스트', () => {
  beforeEach(() => {
    useMessageStore.getState().reset();
    vi.clearAllMocks();
  });

  it('초기값은 모두 null 이어야 한다.', () => {
    const state = useMessageStore.getState();
    expect(state.lastMessage).toBeNull();
    expect(state.lastType).toBeNull();
  });

  it('notify 를 success 타입으로 호출하면 message 상태가 변경되고 sonner 토스트가 success 타입으로 실행되어야 합니다.', async () => {
    const type = 'success';
    const message = '테스트 메시지';
    const description = '테스트 상세 정보';

    useMessageStore.getState().notify(type, message, description);

    const updatedState = useMessageStore.getState();
    expect(updatedState.lastType).toEqual(type);
    expect(updatedState.lastMessage).toEqual(message);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(1);
    });

    expect(toast).toHaveBeenCalledWith(message, {
      description: description,
      position: 'top-center',
      icon: <LucideIcon name={'circleCheckBig'} size={32} strokeWidth={2} className='bg-blue-500 text-white' />,
    });
  });

  it('notify 를 info 타입으로 호출하면 message 상태가 변경되고 sonner 토스트가 info 타입으로 실행되어야 합니다.', async () => {
    const type = 'info';
    const message = '테스트 메시지';
    const description = '테스트 상세 정보';

    useMessageStore.getState().notify(type, message, description);

    const updatedState = useMessageStore.getState();
    expect(updatedState.lastType).toEqual(type);
    expect(updatedState.lastMessage).toEqual(message);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(1);
    });

    expect(toast).toHaveBeenCalledWith(message, {
      description: description,
      position: 'top-center',
      icon: <LucideIcon name={'info'} size={32} strokeWidth={2} className='bg-blue-500 text-white' />,
    });
  });

  it('notify 를 warning 타입으로 호출하면 message 상태가 변경되고 sonner 토스트가 warning 타입으로 실행되어야 합니다.', async () => {
    const type = 'warning';
    const message = '테스트 메시지';
    const description = '테스트 상세 정보';

    useMessageStore.getState().notify(type, message, description);

    const updatedState = useMessageStore.getState();
    expect(updatedState.lastType).toEqual(type);
    expect(updatedState.lastMessage).toEqual(message);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(1);
    });

    expect(toast).toHaveBeenCalledWith(message, {
      description: description,
      position: 'top-center',
      icon: <LucideIcon name={'triangleAlert'} size={32} strokeWidth={2} className='bg-blue-500 text-white' />,
    });
  });

  it('notify 를 error 타입으로 호출하면 message 상태가 변경되고 sonner 토스트가 error 타입으로 실행되어야 합니다.', async () => {
    const type = 'error';
    const message = '테스트 메시지';
    const description = '테스트 상세 정보';

    useMessageStore.getState().notify(type, message, description);

    const updatedState = useMessageStore.getState();
    expect(updatedState.lastType).toEqual(type);
    expect(updatedState.lastMessage).toEqual(message);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(1);
    });

    expect(toast).toHaveBeenCalledWith(message, {
      description: description,
      position: 'top-center',
      icon: <LucideIcon name={'circleX'} size={32} strokeWidth={2} className='bg-blue-500 text-white' />,
    });
  });

  it('notify 를 critical 타입으로 호출하면 message 상태가 변경되고 sonner 토스트가 critical 타입으로 실행되어야 합니다.', async () => {
    const type = 'critical';
    const message = '테스트 메시지';
    const description = '테스트 상세 정보';

    useMessageStore.getState().notify(type, message, description);

    const updatedState = useMessageStore.getState();
    expect(updatedState.lastType).toEqual(type);
    expect(updatedState.lastMessage).toEqual(message);

    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(1);
    });

    expect(toast).toHaveBeenCalledWith(message, {
      description: description,
      position: 'top-center',
      duration: Infinity,
      action: expect.objectContaining({
        label: '새로 고침',
        onClick: expect.any(Function),
      }),
      icon: <LucideIcon name={'circleX'} size={32} strokeWidth={2} className='bg-blue-500 text-white' />,
    });
  });

  it('reset 을 호출하면 message 상태가 초기화되어야 합니다.', () => {
    const type = 'success';
    const message = '테스트 메시지';
    const description = '테스트 상세 정보';

    useMessageStore.getState().notify(type, message, description);
    useMessageStore.getState().reset();

    const state = useMessageStore.getState();
    expect(state.lastType).toBeNull();
    expect(state.lastMessage).toBeNull();
  });
});
