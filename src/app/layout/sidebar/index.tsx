import { Divider, Drawer } from '@mui/material';
import { sidebarWidth } from 'configs/sidebar.config';
import { lazy } from 'react';
import { HeaderPlaceHolder } from '../header-placeholder';
import { Link } from 'react-router-dom';

const SidebarList = lazy(() => import('./SidebarList'));
const SidebarDrawer = lazy(() => import('./SidebarDrawer'));
const SidebarLoading = lazy(() => import('./SidebarLoading'));

interface Props {
  open: boolean;
  loading: boolean;
  type?: string;
}

export const Sidebar: React.FC<Props> = ({ open, loading, type }) => {
  return (
    <Drawer
      sx={{
        width: sidebarWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarWidth,
          boxSizing: 'border-box',
        },
      }}
      variant='persistent'
      anchor='left'
      open={open}
    >
      <Link to={'/'}>
        <HeaderPlaceHolder bg='/myb.png' />
      </Link>
      <Divider />
      {loading ? <SidebarLoading /> : <SidebarList sidebarOpen={open} type={type} />}

      <SidebarDrawer loading={loading} type={type} />
    </Drawer>
  );
};
