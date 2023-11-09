import { RouteKeysEnum, RoutePathsEnum } from 'configs/route.config';
import { RouteProps } from 'react-router-dom';

export interface IRoute {
  key: RouteKeysEnum;
  exact: boolean;
  path: RoutePathsEnum;
  component: React.ReactNode;
}
