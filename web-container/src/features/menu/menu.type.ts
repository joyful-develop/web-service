export type MenuType = 'group' | 'local' | 'remote';

export interface MenuItem {
  rawId: number;
  label: string;
  path: string | null;
  type: MenuType;
  component: string | null;
  isDefault: boolean;
  isLayout: boolean;
  order: number;
  icon: string | null;
  desc: string | null;
  specialUse: string | null;
  parentRawId: number | null;
  children: MenuItem[] | null;
}
