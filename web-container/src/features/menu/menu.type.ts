export type MenuType = 'folder' | 'local' | 'remote';

export interface MenuItem {
  rawId: number;
  label: string;
  path: string;
  type: MenuType;
  component: string | null;
  isDefault: boolean;
  isLayout: boolean;
  order: number;
  icon: string | null;
  desc: string | null;
  parentRawId: number | null;
  childrenRawId: MenuItem[] | null;
}
