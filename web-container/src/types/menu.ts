export interface MenuItem {
  rawid: number;
  groupId: string;
  id: string;
  label: string;
  path: string;
  file: string;
  icon?: string;
  isDefault: boolean;
  order: number;
  parentId?: string;
  children?: string[];
  desc?: string;
}
