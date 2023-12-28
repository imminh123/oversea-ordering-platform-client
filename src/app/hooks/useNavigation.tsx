import * as React from 'react';

import {
  Home,
  TextSnippet,
  Search as SearchIcon,
  AttachMoney,
  ManageAccounts,
  AccountBalance,
} from '@mui/icons-material';
import { useHistory } from 'react-router-dom';
import { IRoute } from 'app/types/routes';
import { ISidebarMenu } from 'app/types/sidebar';
import { initSidebarActive, initSidebarExpandKey } from 'app/utils/helper';
import { RouteKeysEnum, RoutePathsEnum } from 'configs/route.config';
import { SidebarKeysEnum, SidebarLinksEnum } from 'configs/sidebar.config';
import { HomePage } from 'features/home/ClientHome';
import { AdminHome } from 'features/home/AdminHome';
import { useUI } from './index';
import { lazyImport } from 'app/utils/lazyImport';

const { Cart } = lazyImport(() => import('features/cart'), 'Cart');
const { OrderListing } = lazyImport(() => import('features/order'), 'OrderListing');
const { PersonalInfo } = lazyImport(() => import('features/personal-info'), 'PersonalInfo');
const { OrderDetail } = lazyImport(() => import('features/order/components/OrderDetails'), 'OrderDetail');
const { OrderDetailAdmin } = lazyImport(
  () => import('features/order/components/OrderDetailsAdmin'),
  'OrderDetailAdmin',
);
const { Search } = lazyImport(() => import('features/search'), 'Search');
const { ItemDetail } = lazyImport(() => import('features/search/components/ItemDetail'), 'ItemDetail');
const { AdminVariables } = lazyImport(() => import('features/variables/AdminVariables'), 'AdminVariables');
const { AdminOrders } = lazyImport(() => import('features/order/AdminOrders'), 'AdminOrders');
const { UsersListing } = lazyImport(() => import('features/users/UsersListing'), 'UsersListing');
const { UserDetail } = lazyImport(() => import('features/users/components/UserDetail'), 'UserDetail');
const { TransactionListing } = lazyImport(
  () => import('features/transactions/TransactionListing'),
  'TransactionListing',
);
const { TransactionListingAdmin } = lazyImport(
  () => import('features/transactions/TransactionListingAdmin'),
  'TransactionListingAdmin',
);
const { TransactionDetailAdmin } = lazyImport(
  () => import('features/transactions/components/TransactionDetailAdmin'),
  'TransactionDetailAdmin',
);
const { TransactionDetail } = lazyImport(
  () => import('features/transactions/components/TransactionDetail'),
  'TransactionDetail',
);

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
      {
        key: RouteKeysEnum.UserTransaction,
        exact: true,
        path: RoutePathsEnum.UserTransaction,
        component: <TransactionListing />,
      },
      {
        key: RouteKeysEnum.UserTransactionDetail,
        exact: true,
        path: RoutePathsEnum.UserTransactionDetail,
        component: <TransactionDetail />,
      },
    ];

    return result;
  }, []);

  const adminRoutes: IRoute[] = React.useMemo(() => {
    const result: IRoute[] = [
      {
        key: RouteKeysEnum.AdminHome,
        exact: true,
        path: RoutePathsEnum.AdminHome,
        component: <AdminHome />,
      },
      {
        key: RouteKeysEnum.AdminInfo,
        exact: true,
        path: RoutePathsEnum.AdminInfo,
        component: <PersonalInfo />,
      },
      {
        key: RouteKeysEnum.AdminVariables,
        exact: true,
        path: RoutePathsEnum.AdminVariables,
        component: <AdminVariables />,
      },
      {
        key: RouteKeysEnum.AdminOrders,
        exact: true,
        path: RoutePathsEnum.AdminOrders,
        component: <AdminOrders />,
      },
      {
        key: RouteKeysEnum.AdminOrderDetail,
        exact: true,
        path: RoutePathsEnum.AdminOrderDetail,
        component: <OrderDetailAdmin />,
      },
      {
        key: RouteKeysEnum.AdminUsers,
        exact: true,
        path: RoutePathsEnum.AdminUsers,
        component: <UsersListing />,
      },
      {
        key: RouteKeysEnum.AdminUserDetail,
        exact: true,
        path: RoutePathsEnum.AdminUserDetail,
        component: <UserDetail />,
      },
      {
        key: RouteKeysEnum.AdminTransactions,
        exact: true,
        path: RoutePathsEnum.AdminTransactions,
        component: <TransactionListingAdmin />,
      },
      {
        key: RouteKeysEnum.AdminTransactionsDetail,
        exact: true,
        path: RoutePathsEnum.AdminTransactionsDetail,
        component: <TransactionDetailAdmin />,
      },
    ];

    return result;
  }, []);

  const menus: ISidebarMenu[] = React.useMemo(() => {
    const result: ISidebarMenu[] = [
      {
        name: 'Đặt hàng',
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
          {
            key: SidebarKeysEnum.UserTransactions,
            parentKey: null,
            link: SidebarLinksEnum.UserTransactions,
            icon: <AccountBalance />,
            label: 'Quản lý thanh toán',
          },
        ],
      },
    ];

    return result;
  }, []);

  const adminMenus: ISidebarMenu[] = React.useMemo(() => {
    const result: ISidebarMenu[] = [
      {
        name: 'Admin menu',
        sidebars: [
          {
            key: SidebarKeysEnum.AdminHomepage,
            parentKey: null,
            link: SidebarLinksEnum.AdminHomepage,
            icon: <Home />,
            label: 'Trang chủ',
          },
          {
            key: SidebarKeysEnum.AdminVariables,
            parentKey: null,
            link: SidebarLinksEnum.AdminVariables,
            icon: <AttachMoney />,
            label: 'Quản lý tỉ giá',
          },
          {
            key: SidebarKeysEnum.AdminOrders,
            parentKey: null,
            link: SidebarLinksEnum.AdminOrders,
            icon: <TextSnippet />,
            label: 'Quản lý đơn hàng',
          },
          {
            key: SidebarKeysEnum.AdminUsers,
            parentKey: null,
            link: SidebarLinksEnum.AdminUsers,
            icon: <ManageAccounts />,
            label: 'Quản lý người dùng',
          },
          {
            key: SidebarKeysEnum.AdminTransactions,
            parentKey: null,
            link: SidebarLinksEnum.AdminTransactions,
            icon: <AccountBalance />,
            label: 'Quản lý thanh toán',
          },
        ],
      },
    ];

    return result;
  }, []);

  const publicRoutes = React.useMemo(() => {
    return [RoutePathsEnum.LoginPage, RoutePathsEnum.AdminLoginPage, RoutePathsEnum.SignupPage, RoutePathsEnum.Active];
  }, []);

  React.useEffect(() => {
    if (history && history.location) {
      setSidebarActive(() => {
        return initSidebarActive([...menus, ...adminMenus], history.location.pathname);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [history, routes, menus, adminMenus]);

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

  return { routes, adminRoutes, publicRoutes, menus, adminMenus };
}

export default useNavigation;
