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
  data: {
    accessToken: string;
    refreshToken: string;
  };
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
  data: {
    accessToken: string;
    refreshToken: string;
    expiresIn: number;
    refreshExpiresIn: number;
  };
};
type ApiLoginGGArgs = {
  token: string;
  base: 'google' | 'facebook';
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
    accessToken: result.data.accessToken,
    refreshToken: result.data.refreshToken,
  };
};

export const loginSocial = async (inputs: ApiLoginGGArgs) => {
  const res = await apiWrapper.post<any, TLoginGGRes>('/session/createSessionWithOAuth2', {
    ...inputs,
    redirect_uri: envConfig.VITE_APP_HOST,
  });
  return res.data;
};

const getMe = async (): Promise<TGetMeRes> => {
  const result = await apiWrapper.get<any>(`authentication/client`, {});

  return userAPI.mappingServerDataUnderUserView(result.data);
};

const authAPI = { login, loginSocial, getMe };

export default authAPI;
