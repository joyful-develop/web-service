import type { IconName } from '@/shared/icons/hero-icon-registry.ts';

/**
 * 공통 Icon 컴포넌트 Props
 * - 색상은 Tailwind text-* 클래스로 제어
 */
export type IconProps = {
  name: IconName;
  /** 스크린리더용 라벨 (시각적 title 아님) */
  label?: string;
  /** 아이콘 크기 (기본 24) */
  /** Tailwind 클래스와 결합 가능 */
  className?: string;
};
