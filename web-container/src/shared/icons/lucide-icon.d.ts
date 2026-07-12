import type { ComponentProps } from 'react';

import type { IconName } from '@/shared/icons/lucide-icon-registry.ts';

import type { Calendar } from 'lucide-react';

/** Lucide 아이콘 공통 props */
type LucideBaseProps = ComponentProps<typeof Calendar>;

/**
 * 공통 Icon 컴포넌트 Props
 * - 색상은 Tailwind text-* 클래스로 제어
 * - color prop은 제외하고 항상 currentColor 사용
 */
export type IconProps = {
  name: IconName;
  /** 스크린리더용 라벨 (시각적 title 아님) */
  label?: string;
  /** 아이콘 크기 (기본 24) */
  size?: number;
  /** 선 굵기 (기본 2) */
  strokeWidth?: number;
  /** Tailwind 클래스와 결합 가능 */
  className?: string;
} & Omit<LucideBaseProps, 'ref' | 'color'>;
