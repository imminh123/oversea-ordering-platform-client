import { IUser, IUserServerResponse } from 'app/types/user';
import { apiWrapper } from './axiosClient';
import userAPI from './userAPI';
import { envConfig } from 'configs/env.config';
/* Types export for outside */
/* ==================== START ==================== */
export type TLoginArgs = {
  username: string;
  password: string;
};
export type TLoginRes = {
  accessToken: string;
  refreshToken: string;
};
export type TLoginGGRes = {
  accessToken: string;
  refreshToken: string;
};
export type TLoginError = {
  message: string;
};

// export type TGetMeArgs = {}
export type TGetMeRes = IUser;
/* ==================== END ==================== */

/* API Types */
/* ==================== START ==================== */
type ApiLoginArgs = {
  mail: string;
  password: string;
};
type ApiLoginRes = {
  accessToken: string;
  refreshToken: string;
  expiresIn: number;
  refreshExpiresIn: number;
};
type ApiLoginGGArgs = {
  token: string;
};

// type ApiGetMeArgs = {}
export type ApiGetMeRes = IUserServerResponse;
/* ==================== END ==================== */

const login = async (params: TLoginArgs): Promise<TLoginRes> => {
  const body: ApiLoginArgs = {
    mail: params.username,
    password: params.password,
  };
  const result = await apiWrapper.post<ApiLoginArgs, ApiLoginRes>(`/session/createClientSession`, body);

  return {
    accessToken: result.accessToken,
    refreshToken: result.refreshToken,
  };
};

export const loginGoogleAPI = (inputs: ApiLoginGGArgs): Promise<TLoginGGRes> => {
  return apiWrapper.post('/session/createSessionWithOAuth2', {
    ...inputs,
    base: 'google',
    redirect_uri: envConfig.VITE_APP_HOST,
  });
};

const getMe = async (): Promise<TGetMeRes> => {
  const result = await apiWrapper.get<ApiGetMeRes>(`authentication/client`, {});

  return userAPI.mappingServerDataUnderUserView(result);
};

const authAPI = { login, loginGoogleAPI, getMe };

export default authAPI;
