import { AxiosError } from 'axios';

import { beforeEach, describe, expect, it } from 'vitest';

import { useErrorStore } from '@/store/useErrorStore.ts';

describe('Error Store', () => {
  beforeEach(() => {
    useErrorStore.getState().reset();
  });

  it('초기값은 모두 null 이어야 한다.', () => {
    const state = useErrorStore.getState();
    expect(state.type).toBeNull();
    expect(state.message).toBeNull();
    expect(state.description).toBeNull();
  });

  it('setError(AxiosError)를 호출하면 message가 업데이트되어야 한다', () => {
    const error = new AxiosError('AxiosError 타입의 에러 테스트 중 입니다.');
    error.name = 'AxiosError';
    error.status = 400;
    error.code = 'ERR_BAD_REQUEST';
    error.response = {
      data: {
        type: 'Error',
        timestamp: '2026-06-21 18:00:01.123',
        status: 400,
        error: 'ERR_BAD_REQUEST',
        path: '/api/v1/users/register',
        message: '에러 테스트 중 입니다.',
        messageMultiLangCode: 'ERROR-001',
        vaildErrors: [
          {
            field: 'userId',
            objectName: 'userDto',
            value: '',
            valueType: 'string',
            message: 'userId 는는 필수 입력 항목입니다.',
            code: 'NotBlank',
          },
          {
            field: 'email',
            objectName: 'userDto',
            value: 'aaa',
            valueType: 'string',
            message: '올바른 이메일 형식이어야 합니다.',
            code: 'Email',
          },
        ],
        errorDetailTitleMultiLangCode: 'Detail Title',
        errorDetails: [
          {
            message: 'Detail 1',
            messageMultiLangCode: 'DATA-001',
          },
          {
            message: 'Detail 2',
            messageMultiLangCode: 'DATA-002',
          },
        ],
      },
      status: 400,
      statusText: 'Bad Request',
      headers: {},
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      config: {} as any,
    };
    useErrorStore.getState().setError(error);

    const errorDesc =
      'userDto.userId => (string) : userId 는는 필수 입력 항목입니다.(NotBlank)\n' +
      'userDto.email => aaa(string) : 올바른 이메일 형식이어야 합니다.(Email)' +
      '\nDetail Title\n' +
      'Detail 1\n' +
      'Detail 2';

    const state = useErrorStore.getState();
    expect(state.type).toBe('Error');
    expect(state.message).toBe('에러 테스트 중 입니다.');
    expect(state.description).toBe(errorDesc);
  });

  it('setError(Error)를 호출하면 message가 업데이트되어야 한다', () => {
    const error = new Error('에러 테스트 중 입니다.');
    error.name = 'Error';

    useErrorStore.getState().setError(error);

    const state = useErrorStore.getState();
    expect(state.type).toBe('Error');
    expect(state.message).toBe('에러 테스트 중 입니다.');
    expect(state.description).toBe(error.stack);
  });

  it('clearError를 호출하면 message가 다시 null이 되어야 한다.', () => {
    const error = new Error('에러 테스트 중 입니다.');
    error.name = 'Error';

    useErrorStore.getState().setError(error);
    useErrorStore.getState().reset();

    const state = useErrorStore.getState();
    expect(state.type).toBeNull();
    expect(state.message).toBeNull();
    expect(state.description).toBeNull();
  });
});
