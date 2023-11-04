import useAuth from 'app/hooks/useAuth';
import useNavigation from 'app/hooks/useNavigation';
import { RouteKeysEnum, RoutePathsEnum } from 'configs/route.config';
import { LoginPage } from 'features/auth/login';
import { NotFoundPage } from 'features/not-found';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { GlobalLoading } from './global-loading';
import { LayoutPage } from './LayoutPage';

function App() {
  const { routes } = useNavigation();
  const { getMe, initialized } = useAuth();

  useEffect(() => {
    const initApp = async () => {
      try {
        if (!initialized) {
          await getMe();
        }
      } catch (err) {
        console.log({ err });
      }
    };

    initApp();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialized) {
    return <GlobalLoading loading={!initialized} />;
  }

  return (
    <Switch>
      <Route exact={true} path={RoutePathsEnum.LoginPage} component={LoginPage} />

      <LayoutPage>
        <Switch>
          {routes
            .filter((route) => route.key !== RouteKeysEnum.LoginPage)
            .map((route) => {
              return <Route key={route.path} exact={route.exact} path={route.path} component={route.component} />;
            })}
        </Switch>
      </LayoutPage>

      <Route exact={true} component={NotFoundPage} />
    </Switch>
  );
}

export default App;
