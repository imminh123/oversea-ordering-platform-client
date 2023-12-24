import { Divider, Drawer } from '@mui/material';
import { sidebarWidth } from 'configs/sidebar.config';
import { lazy } from 'react';
import { HeaderPlaceHolder } from '../header-placeholder';
import { Link } from 'react-router-dom';
import { Scrollbar } from 'app/components/Scrollbar';

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
      PaperProps={{
        sx: {
          backgroundColor: 'neutral.800',
          color: 'common.white',
        },
      }}
      variant='persistent'
      anchor='left'
      open={open}
    >
      <Link to={'/'}>
        <HeaderPlaceHolder bg='/mby-transparent.svg' />
      </Link>
      <Scrollbar
        sx={{
          height: '100%',
          '& .simplebar-content': {
            height: '100%',
          },
          '& .simplebar-scrollbar:before': {
            background: 'neutral.400',
          },
        }}
      >
        {loading ? <SidebarLoading /> : <SidebarList sidebarOpen={open} type={type} />}
      </Scrollbar>

      <SidebarDrawer loading={loading} type={type} />
    </Drawer>
  );
};
