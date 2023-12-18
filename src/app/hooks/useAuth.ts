import authAPI, { TGetMeRes, TLoginArgs, TLoginError, TLoginRes } from 'app/api/authAPI';
import AuthContext from 'app/context/auth';
import { LanguageTranslate } from 'app/languages';
import { RoutePathsEnum } from 'configs/route.config';
import { useContext } from 'react';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';
import useAlert from './useAlert';
import { MutationConfig } from 'app/api/react-query';
import storage from 'app/utils/storage';
import { UserRole } from 'app/types/user';
type QueryFnType = typeof authAPI.loginSocial;

function useAuth() {
  const history = useHistory();
  const context = useContext(AuthContext);
  const { alertSuccess, alertError } = useAlert();
  const { mutateAsync: login } = useMutation<TLoginRes, TLoginError, TLoginArgs>((params) => {
    return authAPI.login(params);
  });
  const { mutateAsync: loginAdmin } = useMutation<TLoginRes, TLoginError, TLoginArgs>((params) => {
    return authAPI.loginAdmin(params);
  });
  const { mutateAsync: getMe } = useMutation<TGetMeRes>(() => {
    return authAPI.getMe();
  });

  const logout = (): Promise<void> => {
    if (context.user?.role === UserRole.Admin) {
      history.push(RoutePathsEnum.AdminLoginPage);
    } else {
      history.push(RoutePathsEnum.LoginPage);
    }
    storage.clearToken();
    context.setAuthenticated(false);
    context.setInitialized(true);
    context.setUser(null);
    return Promise.resolve();
  };

  const handleGetMe = async () => {
    try {
      const user = await getMe();
      context.setUser(user);
      context.setAuthenticated(true);
    } catch (err) {
      context.setAuthenticated(false);
      history.push(RoutePathsEnum.LoginPage);
    } finally {
      setTimeout(() => {
        context.setInitialized(true);
      }, 500);
    }
  };

  const handleLogin = async (userName: string, password: string) => {
    try {
      const { accessToken } = await login({ userName, password });
      storage.setToken(accessToken);
      const user = await getMe();
      context.setUser(user);
      context.setAuthenticated(true);
      alertSuccess(LanguageTranslate.alert.login.success);
      if (user.role === UserRole.Client) {
        history.push(RoutePathsEnum.HomePage);
      }
    } catch (err) {
      handleErrorResponse(err);
      context.setAuthenticated(false);
    } finally {
      context.setInitialized(true);
    }
  };

  const handleLoginAdmin = async (userName: string, password: string) => {
    try {
      const { accessToken } = await loginAdmin({ userName, password });
      storage.setToken(accessToken);
      const user = await getMe();
      context.setUser(user);
      context.setAuthenticated(true);
      alertSuccess(LanguageTranslate.alert.login.success);
      if (user.role === UserRole.Admin || user.role === UserRole.Root) {
        history.push(RoutePathsEnum.AdminHome);
      }
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
      mutationFn: authAPI.loginSocial,
    });
  };

  const { mutateAsync: loginSocial } = useLoginWithOAuth2();

  const handleLoginSocial = async ({ token, base }: { token: string; base: 'google' | 'facebook' }) => {
    try {
      const { accessToken } = await loginSocial({ token, base });
      storage.setToken(accessToken);
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
    storage.clearToken();
    if (typeof err === 'string') {
      alertError(err);
    } else if (err && err?.response && typeof err?.response?.data?.message === 'string') {
      alertError(err?.response?.data?.message);
    } else {
      alertError(LanguageTranslate.alert.something_went_wrong);
    }
  };

  return {
    ...context,
    login: handleLogin,
    getMe: handleGetMe,
    handleLoginSocial,
    logout,
    handleLoginAdmin,
  };
}

export default useAuth;
