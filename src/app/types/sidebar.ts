import { SidebarKeysEnum, SidebarLinksEnum } from 'configs/sidebar.config';

export interface ISidebarItem {
  key: SidebarKeysEnum;
  parentKey: SidebarKeysEnum | null;
  link: SidebarLinksEnum;
  href?: string;
  icon?: JSX.Element;
  label: string;
  child?: ISidebarItem[];
}

export interface ISidebarMenu {
  name: string;
  sidebars: ISidebarItem[];
}
