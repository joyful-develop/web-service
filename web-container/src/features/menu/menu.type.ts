export type MenuType = 'local' | 'remote';

export interface MenuItem {
  rawId: number;
  groupId: string;
  id: string;
  label: string;
  path: string;
  type: MenuType;
  localPath: string | null;
  remoteUrl: string | null;
  icon: string | null;
  isDefault: boolean;
  order: number;
  parentId: string | null;
  children: MenuItem[] | null;
  desc: string | null;
}
