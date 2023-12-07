import * as React from 'react';

import { Home, TextSnippet, Search as SearchIcon } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { IRoute } from 'app/types/routes';
import { ISidebarMenu } from 'app/types/sidebar';
import { initSidebarActive, initSidebarExpandKey } from 'app/utils/helper';
import { RouteKeysEnum, RoutePathsEnum } from 'configs/route.config';
import { SidebarKeysEnum, SidebarLinksEnum } from 'configs/sidebar.config';
import { HomePage } from 'features/home';
import { useUI } from './index';
import { lazyImport } from 'app/utils/lazyImport';

const { Cart } = lazyImport(() => import('features/cart'), 'Cart');
const { OrderListing } = lazyImport(() => import('features/order'), 'OrderListing');
const { PersonalInfo } = lazyImport(() => import('features/personal-info'), 'PersonalInfo');
const { OrderDetail } = lazyImport(() => import('features/order/components/OrderDetails'), 'OrderDetail');
const { Search } = lazyImport(() => import('features/search'), 'Search');
const { ItemDetail } = lazyImport(() => import('features/search/components/ItemDetail'), 'ItemDetail');

function useNavigation() {
  const history = useHistory();
  const { setSidebarActive, setSidebarExpandKey, sidebarExpandKey } = useUI();

  // This routes use inside layout
  const routes: IRoute[] = React.useMemo(() => {
    const result: IRoute[] = [
      {
        key: RouteKeysEnum.HomePage,
        exact: true,
        path: RoutePathsEnum.HomePage,
        component: <HomePage />,
      },
      {
        key: RouteKeysEnum.Orders,
        exact: true,
        path: RoutePathsEnum.Orders,
        component: <OrderListing />,
      },
      {
        key: RouteKeysEnum.OrderDetail,
        exact: true,
        path: RoutePathsEnum.OrderDetail,
        component: <OrderDetail />,
      },
      {
        key: RouteKeysEnum.Cart,
        exact: true,
        path: RoutePathsEnum.Cart,
        component: <Cart />,
      },
      {
        key: RouteKeysEnum.Cart,
        exact: true,
        path: RoutePathsEnum.CartStep,
        component: <Cart />,
      },
      {
        key: RouteKeysEnum.Search,
        exact: true,
        path: RoutePathsEnum.Search,
        component: <Search />,
      },
      {
        key: RouteKeysEnum.SearchResult,
        exact: true,
        path: RoutePathsEnum.SearchResult,
        component: <ItemDetail />,
      },
      {
        key: RouteKeysEnum.PersonalInfo,
        exact: true,
        path: RoutePathsEnum.PersonalInfo,
        component: <PersonalInfo />,
      },
    ];

    return result;
  }, []);

  const menus: ISidebarMenu[] = React.useMemo(() => {
    const result: ISidebarMenu[] = [
      {
        name: '',
        sidebars: [
          {
            key: SidebarKeysEnum.HomePage,
            parentKey: null,
            link: SidebarLinksEnum.HomePage,
            icon: <Home />,
            label: 'Trang chủ',
          },
          {
            key: SidebarKeysEnum.Orders,
            parentKey: null,
            link: SidebarLinksEnum.Orders,
            icon: <TextSnippet />,
            label: 'Đơn hàng',
          },
          {
            key: SidebarKeysEnum.Search,
            parentKey: null,
            link: SidebarLinksEnum.Search,
            icon: <SearchIcon />,
            label: 'Tìm kiếm sản phẩm',
          },
        ],
      },
    ];

    return result;
  }, []);

  const publicRoutes = React.useMemo(() => {
    return [RoutePathsEnum.LoginPage, RoutePathsEnum.SignupPage, RoutePathsEnum.Active];
  }, []);

  React.useEffect(() => {
    if (history && history.location) {
      setSidebarActive(() => {
        return initSidebarActive(menus, history.location.pathname);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, routes, menus]);

  React.useEffect(() => {
    if (history && history.location && !sidebarExpandKey) {
      setSidebarExpandKey(() => {
        let result: string | null = null;

        for (const menu of menus) {
          result = initSidebarExpandKey(history.location.pathname, menu.sidebars);
          if (result) {
            break;
          }
        }

        return result;
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, menus]);

  return { routes, menus, publicRoutes };
}

export default useNavigation;
