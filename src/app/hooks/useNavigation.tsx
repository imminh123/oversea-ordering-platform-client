import * as React from 'react';

import { AccessibilityNew, Accessible, AccountBalance, AccountBox, AccountTree, Adb } from '@mui/icons-material';
import { useHistory } from 'react-router-dom';

import { IBreadcrumbItem } from 'app/types/breadcrumb';
import { IRoute } from 'app/types/routes';
import { ISidebarMenu } from 'app/types/sidebar';
import { initSidebarActive, initSidebarExpandKey } from 'app/utils/helper';
import { RouteKeysEnum, RoutePathsEnum } from 'configs/route.config';
import { SidebarKeysEnum, SidebarLinksEnum } from 'configs/sidebar.config';
import { LoginPage } from 'features/auth/login';
import { HomePage } from 'features/home';

import { useUI } from './index';

const Feature1 = React.lazy(() => import('features/feature-1'));
const Feature2 = React.lazy(() => import('features/feature-2'));
const Feature3 = React.lazy(() => import('features/feature-3'));
const Feature2_1 = React.lazy(() => import('features/feature-2/feature-2.1'));
const Feature2_2 = React.lazy(() => import('features/feature-2/feature-2.2'));
const Feature3_1 = React.lazy(() => import('features/feature-3/feature-3.1'));

function useNavigation() {
  const history = useHistory();
  const { setSidebarActive, setSidebarExpandKey, sidebarExpandKey } = useUI();
  const routes: IRoute[] = React.useMemo(() => {
    const result: IRoute[] = [
      {
        key: RouteKeysEnum.HomePage,
        exact: true,
        path: RoutePathsEnum.HomePage,
        component: HomePage,
      },
      {
        key: RouteKeysEnum.Feature1,
        exact: true,
        path: RoutePathsEnum.Feature1,
        component: Feature1,
      },
      {
        key: RouteKeysEnum.Feature2,
        exact: true,
        path: RoutePathsEnum.Feature2,
        component: Feature2,
      },
      {
        key: RouteKeysEnum.Feature2_1,
        exact: true,
        path: RoutePathsEnum.Feature2_1,
        component: Feature2_1,
      },
      {
        key: RouteKeysEnum.Feature2_2,
        exact: true,
        path: RoutePathsEnum.Feature2_2,
        component: Feature2_2,
      },
      {
        key: RouteKeysEnum.Feature3,
        exact: true,
        path: RoutePathsEnum.Feature3,
        component: Feature3,
      },
      {
        key: RouteKeysEnum.Feature3_1,
        exact: true,
        path: RoutePathsEnum.Feature3_1,
        component: Feature3_1,
      },
      {
        key: RouteKeysEnum.LoginPage,
        exact: true,
        path: RoutePathsEnum.LoginPage,
        component: LoginPage,
      },
    ];

    return result;
  }, []);

  const menus: ISidebarMenu[] = React.useMemo(() => {
    const result: ISidebarMenu[] = [
      {
        name: 'Menu 1',
        sidebars: [
          {
            key: SidebarKeysEnum.Feature1,
            parentKey: null,
            link: SidebarLinksEnum.Feature1,
            icon: <Adb />,
            label: 'Feature 1',
            child: [],
          },
          {
            key: SidebarKeysEnum.Feature2,
            parentKey: null,
            link: SidebarLinksEnum.Feature2,
            icon: <AccountTree />,
            label: 'Feature 2',
            child: [
              {
                key: SidebarKeysEnum.Feature2_1,
                parentKey: SidebarKeysEnum.Feature2,
                link: SidebarLinksEnum.Feature2_1,
                icon: <AccessibilityNew />,
                label: 'Feature 2.1',
              },
              {
                key: SidebarKeysEnum.Feature2_2,
                parentKey: SidebarKeysEnum.Feature2,
                link: SidebarLinksEnum.Feature2_2,
                icon: <Accessible />,
                label: 'Feature 2.2',
              },
            ],
          },
          {
            key: SidebarKeysEnum.Feature3,
            parentKey: null,
            link: SidebarLinksEnum.Feature3,
            icon: <AccountBalance />,
            label: 'Feature 3',
            child: [
              {
                key: SidebarKeysEnum.Feature3_1,
                parentKey: SidebarKeysEnum.Feature3,
                link: SidebarLinksEnum.Feature3_1,
                icon: <AccountBox />,
                label: 'Feature 3.1',
              },
            ],
          },
        ],
      },
    ];

    return result;
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

  return { routes, menus };
}

export default useNavigation;
