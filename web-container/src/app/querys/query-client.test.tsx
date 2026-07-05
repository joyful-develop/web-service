import { AxiosError, AxiosHeaders, type InternalAxiosRequestConfig } from 'axios';

import { toast } from 'sonner';
import { afterEach, describe, it, expect, vi, beforeEach } from 'vitest';

import { queryClient } from '@/app/querys/query-client.ts';
import { LucideIcon } from '@/shared/icons/LucideIcon.tsx';

import { QueryObserver, MutationObserver } from '@tanstack/react-query';
import { waitFor } from '@testing-library/react';

vi.mock('sonner', () => {
  const mockToast = vi.fn();
  return {
    toast: mockToast,
  };
});

const config: InternalAxiosRequestConfig = {
  headers: new AxiosHeaders(),
  method: 'GET',
  url: '/api/data',
};
const mockError = new AxiosError(
  '요청에 실패했습니다', // message
  'ERR_BAD_REQUEST', // code
  config, //config
  null, // request
  {
    // response
    data: {
      success: false,
      status: 400,
      message: '',
      description: '',
      data: null,
      error: {
        type: 'error',
        status: 400,
        code: 'COUPON_ALREADY_USED',
        message: '요청에 실패했습니다.',
        description: '잘못된 요청입니다.',
      },
    },
    status: 400,
    statusText: 'Bad Request',
    headers: {},
    config: config,
  }
);

const message = '요청에 실패했습니다. (400, ERR_BAD_REQUEST, COUPON_ALREADY_USED)';
const description = '잘못된 요청입니다.';

describe('useMessageStore 를 사용한 React Query v5 중앙 관리 에러 핸들링 통합 테스트', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    queryClient.clear();
  });

  it('V5 Query 실패 시 캐시의 onError가 작동하여 toast() 함수를 정확히 1번 호출해야 한다', async () => {
    const observer = new QueryObserver(queryClient, {
      queryKey: ['test-global-toast-call'],
      queryFn: () => Promise.reject(mockError),
    });

    const unsubscribe = observer.subscribe(() => {});

    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(1);
    });

    expect(toast).toHaveBeenCalledWith(message, {
      description: description,
      position: 'top-center',
      icon: <LucideIcon name={'circleX'} size={32} strokeWidth={2} className='bg-blue-500 text-white' />,
    });

    unsubscribe();
  });

  it('V5 Query 실패 시 meta.preventGlobalError 가 true 이면 toast() 함수를 호출하지 않는다', async () => {
    const observer = new QueryObserver(queryClient, {
      queryKey: ['test-global-toast-call'],
      queryFn: () => Promise.reject(mockError),
      meta: { preventGlobalError: true },
    });

    const unsubscribe = observer.subscribe(() => {});

    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(0);
    });

    unsubscribe();
  });

  it('V5 Mutation 실패 시 캐시의 onError가 작동하여 toast() 함수를 정확히 1번 호출해야 한다', async () => {
    const mockMutationFn = vi.fn().mockRejectedValue(mockError);

    // 내부 build 메서드 대신 공식 MutationObserver를 생성하여 테스트
    const observer = new MutationObserver(queryClient, {
      mutationFn: mockMutationFn,
    });

    // 컴포넌트 없이 직접 실행
    await observer.mutate(undefined).catch(() => {});

    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(1);
    });

    expect(toast).toHaveBeenCalledWith(message, {
      description: description,
      position: 'top-center',
      icon: <LucideIcon name={'circleX'} size={32} strokeWidth={2} className='bg-blue-500 text-white' />,
    });
  });

  it('V5 Mutation 실패 시 meta.preventGlobalError 가 true 이면 toast() 함수를 호출하지 않는다', async () => {
    const mockMutationFn = vi.fn().mockRejectedValue(mockError);

    const mutation = queryClient.getMutationCache().build(queryClient, {
      mutationFn: mockMutationFn,
      meta: { preventGlobalError: true },
    });

    await mutation.execute(undefined).catch(() => {});

    await waitFor(() => {
      expect(toast).toHaveBeenCalledTimes(0);
    });
  });
});
