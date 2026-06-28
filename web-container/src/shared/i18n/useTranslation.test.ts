import { describe, test, expect } from 'vitest';

import { createWrapper } from '@/__tests__/test-utils.tsx';
import { useTranslation } from '@/shared/i18n/useTranslation.ts';
import i18n from '@/shared/lib/i18n.ts';

import { renderHook, waitFor } from '@testing-library/react';

describe('TypeScript 기반 DB 다국어 연동 및 Vitest v4 테스트', () => {
  test('초기화 상태에서는 리소스 셋이 존재하지 않는다', () => {
    // 타입 Augmentation 덕분에 존재하지 않는 'hello' 같은 키를 적으면 컴파일러 에러가 납니다.
    expect(i18n.t('welcome')).toBe('welcome');
    expect(i18n.hasResourceBundle('ko', 'translation')).toBe(false);
  });

  test('React Query 성공 시 데이터가 반환되고 i18n 인스턴스에 타입 가이드대로 주입된다', async () => {
    const { result } = renderHook(() => useTranslation(), {
      wrapper: createWrapper(),
    });

    // 1. 비동기 패칭 완료 대기
    await waitFor(() => {
      expect(result.current.isSuccess).toBe(true);
    });

    // 2. 결과 데이터 객체 타입 추론 검증 (IDE에서 자동완성 지원)
    expect(result.current.data?.ko.translation.greeting).toBe('안녕하세요.');
    expect(result.current.data?.en.translation.logout).toBe('Log Out');

    // 3. i18n 실제 주입 확인
    expect(i18n.hasResourceBundle('ko', 'translation')).toBe(true);

    // 4. 번역 함수 작동 검증
    expect(i18n.t('greeting')).toBe('안녕하세요.');

    // 5. 언어 전환 테스트
    i18n.changeLanguage('en');
    expect(i18n.t('greeting')).toBe('Hello.');
  });
});
