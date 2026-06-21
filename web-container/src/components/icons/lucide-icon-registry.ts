import {
  Bell,
  CircleX,
  CircleCheckBig,
  EllipsisVertical,
  Info,
  Menu,
  PanelLeft,
  RefreshCw,
  Square,
  TriangleAlert,
} from 'lucide-react';

/**
 * 아이콘 레지스트리
 * - 필요한 Lucide 아이콘만 import 후 객체로 매핑
 * - key는 프로젝트에서 사용할 이름 (camelCase)
 */
export const icons = {
  bellIcon: Bell,
  circleCheckBig: CircleCheckBig,
  circleX: CircleX,
  ellipsisVerticalIcon: EllipsisVertical,
  info: Info,
  menuIcon: Menu,
  panelLeftIcon: PanelLeft,
  refreshCwIcon: RefreshCw,
  squareIcon: Square,
  triangleAlert: TriangleAlert,
} as const;

/** 아이콘 이름 타입 */
export type IconName = keyof typeof icons | null;

/** 아이콘 key 리스트 (예: map 렌더링에 활용) */
export const ICON_KEYS = Object.keys(icons) as IconName[];
