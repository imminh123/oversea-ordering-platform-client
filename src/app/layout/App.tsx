/*global chrome*/
import useAuth from 'app/hooks/useAuth';
import useNavigation from 'app/hooks/useNavigation';
import { RouteKeysEnum, RoutePathsEnum } from 'configs/route.config';
import { LoginPage } from 'features/auth/login';
import { NotFoundPage } from 'features/not-found';
import { useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
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

    initApp().then(() => {
      const token = storage.getToken();
      sendTokenToChromeExtension({ extensionId: envConfig.VITE_EXTENSION_KEY, jwt: token });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!initialized) {
    return <GlobalLoading loading={!initialized} />;
  }

  return (
    <Switch>
      <Route exact={true} path={RoutePathsEnum.LoginPage} component={LoginPage} />
      <LayoutPage>
        {routes
          .filter((route) => route.key !== RouteKeysEnum.LoginPage)
          .map((route) => {
            return (
              <Route key={route.path} exact={route.exact} path={route.path} render={() => <>{route.component}</>} />
            );
          })}
      </LayoutPage>
      <Route path='*' component={NotFoundPage} />
    </Switch>
  );
}

export default App;
