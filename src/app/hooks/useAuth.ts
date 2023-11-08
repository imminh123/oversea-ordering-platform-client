import authAPI, { TGetMeRes, TLoginArgs, TLoginError, TLoginRes } from 'app/api/authAPI';
import AuthContext from 'app/context/auth';
import { LanguageTranslate } from 'app/languages';
import { LocalStorageKeys } from 'app/utils/constants';
import { RoutePathsEnum } from 'configs/route.config';
import { useContext, useMemo } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import useAlert from './useAlert';
import { MutationConfig } from 'app/api/react-query';
type QueryFnType = typeof authAPI.loginGoogleAPI;

function useAuth() {
  const history = useHistory();
  const context = useContext(AuthContext);
  const { alertSuccess, alertError } = useAlert();
  const pathname = useMemo(() => {
    return history.location.pathname;
  }, [history.location.pathname]);
  const { mutateAsync: login } = useMutation<TLoginRes, TLoginError, TLoginArgs>((params) => {
    return authAPI.login(params);
  });
  const { mutateAsync: getMe } = useMutation<TGetMeRes>(() => {
    return authAPI.getMe();
  });

  const logout = (): Promise<void> => {
    localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN);
    context.setAuthenticated(false);
    context.setInitialized(true);
    context.setUser(null);
    history.push(RoutePathsEnum.LoginPage);
    return Promise.resolve();
  };

  const handleGetMe = async () => {
    try {
      if (!pathname.includes(RoutePathsEnum.LoginPage)) {
        const user = await getMe();
        context.setUser(user);
        context.setAuthenticated(true);
      }
    } catch (err) {
      handleErrorResponse(err);
      context.setAuthenticated(false);
      history.push(RoutePathsEnum.LoginPage);
    } finally {
      setTimeout(() => {
        context.setInitialized(true);
      }, 1000);
    }
  };

  const handleLogin = async (username: string, password: string) => {
    try {
      const { accessToken } = await login({ username, password });

      localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, accessToken);
      const user = await getMe();
      context.setUser(user);
      context.setAuthenticated(true);
      alertSuccess(LanguageTranslate.alert.login.success);
      history.push(RoutePathsEnum.HomePage);
    } catch (err) {
      handleErrorResponse(err);
      context.setAuthenticated(false);
    } finally {
      context.setInitialized(true);
    }
  };

  const useLoginWithOAuth2 = (config?: MutationConfig<QueryFnType>) => {
    return useMutation({
      mutationKey: 'useLoginWithOAuth2',
      ...config,
      mutationFn: authAPI.loginGoogleAPI,
    });
  };

  const { mutateAsync: loginGg } = useLoginWithOAuth2();

  const handleLoginGG = async ({ token }: { token: string }) => {
    try {
      const { accessToken } = await loginGg({ token });

      localStorage.setItem(LocalStorageKeys.AUTH_TOKEN, accessToken);
      const user = await getMe();
      context.setUser(user);
      context.setAuthenticated(true);
      alertSuccess(LanguageTranslate.alert.login.success);
      history.push(RoutePathsEnum.HomePage);
    } catch (err) {
      handleErrorResponse(err);
      context.setAuthenticated(false);
    } finally {
      context.setInitialized(true);
    }
  };

  const handleErrorResponse = (err: any) => {
    console.log({ err });
    localStorage.removeItem(LocalStorageKeys.AUTH_TOKEN);
    if (typeof err === 'string') {
      alertError(err);
    } else if (err && err.message && typeof err.message === 'string') {
      alertError(err.message);
    } else {
      alertError(LanguageTranslate.alert.something_went_wrong);
    }
  };

  return {
    ...context,
    login: handleLogin,
    getMe: handleGetMe,
    loginGg: handleLoginGG,
    logout,
  };
}

export default useAuth;
