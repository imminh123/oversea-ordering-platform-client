import DrawerWrapper from 'app/context/ui/drawer/DrawerWrapper';
import { EDrawerType } from 'app/context/ui/enum';
import { sidebarWidth } from 'configs/sidebar.config';
import { lazy } from 'react';

const SidebarList = lazy(() => import('./SidebarList'));
const SidebarLoading = lazy(() => import('./SidebarLoading'));

interface Props {
  loading: boolean;
  type?: string;
}

const SidebarDrawer: React.FC<Props> = ({ loading, type }) => {
  return (
    <DrawerWrapper drawerType={EDrawerType.SIDEBAR_DRAWER} drawerWidth={sidebarWidth} closeable={true}>
      {loading ? <SidebarLoading /> : <SidebarList sidebarOpen={true} type={type} />}
    </DrawerWrapper>
  );
};

export default SidebarDrawer;
