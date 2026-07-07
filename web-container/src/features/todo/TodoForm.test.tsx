import { http, HttpResponse } from 'msw';
import { describe, it, expect, beforeEach, vi, type MockInstance } from 'vitest';

import { server } from '@/__tests__/mocks/server.ts';
import { globalErrorMock, renderWithClient } from '@/__tests__/test-utils.tsx';
import { TodoForm } from '@/features/todo/TodoForm.tsx';

import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

describe('TodoForm 컴포넌트 테스트 (TypeScript)', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('사용자가 입력을 마치고 제출하면 성공 메시지가 노출되고 인풋이 초기화된다', async () => {
    const user = userEvent.setup();
    renderWithClient(<TodoForm />);

    const titleInput = screen.getByPlaceholderText('제목') as HTMLInputElement;
    const descInput = screen.getByPlaceholderText('상세 내용') as HTMLTextAreaElement;
    const submitButton = screen.getByRole('button', { name: /추가하기/i }) as HTMLButtonElement;

    // 1. 값 입력 시뮬레이션
    await user.type(titleInput, 'TypeScript 테스트');
    await user.type(descInput, '타입 안정성 확보하기');

    // 💡 window.alert 스파이 함수에 명확한 타입(MockInstance) 지정
    const alertMock: MockInstance<typeof window.alert> = vi.spyOn(window, 'alert').mockImplementation(() => {});

    // 2. 폼 제출
    await user.click(submitButton);

    // 3. 비동기 상태 변화(isPending) 중 검증
    await waitFor(() => {
      expect(submitButton).toBeDisabled();
      expect(submitButton).toHaveTextContent('등록 중...');
    });

    // 4. 완료 후 성공 여부 검증
    await vi.waitFor(() => {
      expect(alertMock).toHaveBeenCalledWith('할 일이 등록되었습니다!');
    });

    // 5. 타입이 보장된 인풋 밸류 초기화 확인
    expect(titleInput.value).toEqual('');
    expect(descInput.value).toEqual('');

    alertMock.mockRestore();
  });

  it('서버 에러(500)가 발생하면 중앙 에러 핸들러가 트리거된다', async () => {
    // 💡 에러 오버라이딩 시에도 핸들러와 동일한 타입을 명시하여 타입 에러를 원천 차단
    server.use(
      http.post(`${import.meta.env.VITE_API_BASE_URL}/todos`, () => {
        return new HttpResponse(null, { status: 500 });
      })
    );

    const user = userEvent.setup();
    renderWithClient(<TodoForm />);

    await user.type(screen.getByPlaceholderText('제목'), '실패할 데이터');
    await user.type(screen.getByPlaceholderText('상세 내용'), '실패용');

    await user.click(screen.getByRole('button', { name: /추가하기/i }));

    // 비동기 처리 후 중앙 에러 캐시(MutationCache) 호출 확인
    await vi.waitFor(() => {
      expect(globalErrorMock).toHaveBeenCalledTimes(1);
    });
  });
});
