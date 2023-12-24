import * as React from 'react';

import { Divider, List, ListSubheader } from '@mui/material';
import { useTranslation } from 'react-i18next';

import useNavigation from 'app/hooks/useNavigation';
import { useUI } from 'app/hooks';

const SidebarItem = React.lazy(() => import('./SidebarItem'));

interface Props {
  sidebarOpen: boolean;
  type?: string;
}

const SidebarList: React.FC<Props> = ({ sidebarOpen, type }) => {
  const { t } = useTranslation();
  const { listDense } = useUI();
  const { menus, adminMenus } = useNavigation();

  return (
    <>
      {(!type || type !== 'admin') &&
        menus.map((menu) => (
          <React.Fragment key={`${menu.name}`}>
            <List
              dense={listDense}
              subheader={<ListSubheader disableSticky>{sidebarOpen ? t(menu.name) : <Divider />}</ListSubheader>}
            >
              {menu.sidebars.map((item) => {
                return <SidebarItem key={item.label} item={item} />;
              })}
            </List>
          </React.Fragment>
        ))}
      {type === 'admin' &&
        adminMenus.map((menu) => (
          <React.Fragment key={`${menu.name}`}>
            <List
              dense={listDense}
              subheader={<ListSubheader disableSticky>{sidebarOpen ? t(menu.name) : <Divider />}</ListSubheader>}
            >
              {menu.sidebars.map((item) => {
                return <SidebarItem key={item.label} item={item} />;
              })}
            </List>
          </React.Fragment>
        ))}
    </>
  );
};

export default SidebarList;
