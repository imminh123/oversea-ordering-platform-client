/*global chrome*/
import useAuth from 'app/hooks/useAuth';
import useNavigation from 'app/hooks/useNavigation';
import { RoutePathsEnum } from 'configs/route.config';
import { LoginPage } from 'features/auth/login';
import { SignupPage } from 'features/auth/signup';
import { NotFoundPage } from 'features/not-found';
import { ActivePage } from 'pages/ActiveAccount';
import { useEffect } from 'react';
import { Route, Switch, matchPath, useHistory } from 'react-router-dom';
import { GlobalLoading } from './global-loading';
import { LayoutPage } from './LayoutPage';
import storage from 'app/utils/storage';
import { envConfig } from 'configs/env.config';

const sendTokenToChromeExtension = ({ extensionId, jwt }: { extensionId: string; jwt: string }) => {
  chrome.runtime.sendMessage(extensionId, { jwt }, (response: any) => {
    if (!response.success) {
      console.log('error sending message', response);
      return response;
    }
    console.log('Sucesss ::: ', response.message);
  });
};

function App() {
  const { routes, publicRoutes } = useNavigation();
  const { getMe, initialized } = useAuth();
  const history = useHistory();
  const isPublicPage = publicRoutes.some((p) => {
    const match = matchPath(history.location.pathname, {
      path: p,
      exact: true,
    });
    return !!match;
  });

  useEffect(() => {
    const initApp = async () => {
      try {
        if (initialized && !isPublicPage) {
          await getMe();
        }
      } catch (err) {
        console.log({ err });
      }
    };

    initApp().then(() => {
      const token = storage.getToken();
      sendTokenToChromeExtension({ extensionId: envConfig.VITE_EXTENSION_KEY, jwt: token });
    });
  }, []);

  if (!initialized) {
    return <GlobalLoading loading={!initialized} />;
  }

  return (
    <Switch>
      <Route exact={true} path={RoutePathsEnum.LoginPage} component={LoginPage} />
      <Route exact={true} path={RoutePathsEnum.SignupPage} component={SignupPage} />
      <Route exact={true} path={RoutePathsEnum.Active} component={ActivePage} />
      <LayoutPage>
        {routes.map((route) => {
          return <Route key={route.path} exact={route.exact} path={route.path} render={() => route.component} />;
        })}
      </LayoutPage>
      // TODO: fix not redirect to 404 page
      <Route path='*' component={NotFoundPage} />
    </Switch>
  );
}

export default App;
