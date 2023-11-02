import DrawerWrapper from 'app/context/ui/drawer/DrawerWrapper';
import { EDrawerType } from 'app/context/ui/enum';
import { sidebarWidth } from 'configs/sidebar.config';
import { lazy } from 'react';

const SidebarList = lazy(() => import('./SidebarList'));
const SidebarLoading = lazy(() => import('./SidebarLoading'));

interface Props {
  loading: boolean;
}

const SidebarDrawer: React.FC<Props> = ({ loading }) => {
  return (
    <DrawerWrapper drawerType={EDrawerType.SIDEBAR_DRAWER} drawerWidth={sidebarWidth} closeable={false}>
      {loading ? <SidebarLoading /> : <SidebarList sidebarOpen={true} />}
    </DrawerWrapper>
  );
};

export default SidebarDrawer;
