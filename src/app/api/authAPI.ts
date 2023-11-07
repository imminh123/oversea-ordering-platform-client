import { IUser, IUserServerResponse, UserRole } from 'app/types/user';
import { apiWrapper } from './axiosClient';
import userAPI from './userAPI';

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

// type ApiGetMeArgs = {}
type ApiGetMeRes = IUserServerResponse;
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

const getMe = async (): Promise<TGetMeRes> => {
  
  const result = await apiWrapper.get<ApiGetMeRes>(`authentication/client`);

  return userAPI.mappingServerDataUnderUserView(result);
};

const authAPI = { login, getMe };

export default authAPI;
