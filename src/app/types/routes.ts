import { RouteKeysEnum, RoutePathsEnum } from 'configs/route.config';

export interface IRoute {
  key: RouteKeysEnum;
  exact: boolean;
  path: RoutePathsEnum;
  component: React.ReactNode;
}
