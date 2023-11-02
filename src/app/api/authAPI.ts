import { IUser, IUserServerResponse, UserRole } from 'app/types/user';
import { LocalStorageKeys } from 'app/utils/constants';
// import { apiWrapper } from './axiosClient';
// import userAPI from './userAPI';

const authAPIBaseUrl = '/auth';

/* Types export for outside */
/* ==================== START ==================== */
export type TLoginArgs = {
  username: string;
  password: string;
};
export type TLoginRes = {
  user: IUser;
  token: string;
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
  username: string;
  password: string;
};
type ApiLoginRes = {
  user: IUserServerResponse;
  token: string;
};

// type ApiGetMeArgs = {}
type ApiGetMeRes = IUserServerResponse;
/* ==================== END ==================== */

const login = async (params: TLoginArgs): Promise<TLoginRes> => {
  // NOTE: Should remove this mock logic & implement API logic here
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (params.username === 'admin' && params.password === 'admin123') {
        return resolve({
          user: {
            id: 'id-1',
            username: 'Richard',
            email: 'richard.hungngo@setel.com',
            phoneNumber: '0966382596',
            role: UserRole.SuperAdmin,
          },
          token: 'mock-token',
        });
      }

      return reject({ message: 'Unauthorized!' });
    }, 500);
  });

  // const body: ApiLoginArgs = {
  //   username: params.username,
  //   password: params.password,
  // };
  // const result = await apiWrapper.post<ApiLoginArgs, ApiLoginRes>(`${authAPIBaseUrl}/login`, body);
  //
  // return {
  //   user: userAPI.mappingServerDataUnderUserView(result.user),
  //   token: result.token,
  // };
};

const getMe = async (): Promise<TGetMeRes> => {
  // NOTE: Should remove this mock logic & implement API logic here
  return new Promise((resolve, reject) => {
    const authToken = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN);
    if (authToken && authToken === 'mock-token') {
      return resolve({
        id: 'id-1',
        username: 'Richard',
        email: 'richard.hungngo@setel.com',
        phoneNumber: '0966382596',
        role: UserRole.SuperAdmin,
      });
    }

    return reject({ message: 'Unauthorized!' });
  });
  // const result = await apiWrapper.get<ApiGetMeRes>(`${authAPIBaseUrl}/me`);
  //
  // return userAPI.mappingServerDataUnderUserView(result);
};

const authAPI = { login, getMe };

export default authAPI;
