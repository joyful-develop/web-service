import { describe, it, expect } from 'vitest';

import { render, screen } from '@testing-library/react';

import { ManuButton } from './ManuButton.tsx'; // 테스트 대상 컴포넌트

describe('UserProfile 컴포넌트', () => {
  it('API로부터 유저 데이터를 가져와 화면에 표시한다', async () => {
    render(<ManuButton />);

    // 로딩 상태 확인
    expect(screen.getByText(/로딩 중/i)).toBeInTheDocument();

    // MSW 응답이 완료된 후 데이터가 잘 표시되는지 확인
    const userName = await screen.findByText('홍길동');
    expect(userName).toBeInTheDocument();
  });
});
