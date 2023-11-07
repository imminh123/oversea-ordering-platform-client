import queryString from 'query-string';

import {
  IPaginationQuery,
  IPaginationQueryServer,
  IPaginationResponse,
  IPaginationServerResponse,
} from 'app/types/pagination';
import { IUser, IUserServerResponse, UserRole } from 'app/types/user';
import { envConfig } from 'configs/env.config';
import { apiWrapper } from './axiosClient';
import { mappingPaginationServerToClient } from 'app/utils/helper';

const userAPIBaseUrl = '/users';

/* Types export for outside */
/* ==================== START ==================== */
export type TFetchUsersArgs = IPaginationQuery;
export type TFetchUsersRes = IPaginationResponse<IUser>;

export type TFetchOneUserArgs = {
  id: string;
};
export type TFetchOneUserRes = IUser;

export type TCreateUserArgs = {
  username: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  password: string;
};
export type TCreateUserRes = IUser;

export type TUpdateUserArgs = {
  id: string;
  username?: string;
  email?: string;
  phoneNumber?: string;
  role?: UserRole;
  password?: string;
};
export type TUpdateUserRes = IUser;

export type TDeleteUserArgs = {
  id: string;
};
export type TDeleteUserRes = IUser;
/* ==================== END ==================== */

/* API Types */
/* ==================== START ==================== */
type ApiFetchUsersArgs = IPaginationQueryServer;
type ApiFetchUsersRes = IPaginationServerResponse<IUserServerResponse>;

type ApiFetchOneUserArgs = {
  id: string;
};
type ApiFetchOneUserRes = IUserServerResponse;

type ApiCreateUserArgs = {
  username: string;
  email: string;
  phoneNumber: string;
  role: UserRole;
  password: string;
};
type ApiCreateUserRes = IUserServerResponse;

type ApiUpdateUserArgs = {
  username?: string;
  email?: string;
  phoneNumber?: string;
  role?: UserRole;
  password?: string;
};
type ApiUpdateUserRes = IUserServerResponse;

type ApiDeleteUserArgs = {};
type ApiDeleteUserRes = IUserServerResponse;
/* ==================== END ==================== */

const fetchUsers = async (query: TFetchUsersArgs): Promise<TFetchUsersRes> => {
  const queryObject: ApiFetchUsersArgs = {
    page: query.page || envConfig.defaultPage,
    limit: query.limit || envConfig.defaultLimit,
  };

  const url = queryString.stringifyUrl({
    url: userAPIBaseUrl,
    query: queryObject as any,
  });
  const res = await apiWrapper.get<ApiFetchUsersRes>(url);

  return mappingPaginationServerToClient<IUserServerResponse, IUser>({
    paginationData: res,
    mappingFunc: mappingServerDataUnderUserView,
  });
};

const fetchOneUser = async (params: TFetchOneUserArgs): Promise<TFetchOneUserRes> => {
  const queryObject: ApiFetchOneUserArgs = {
    id: params.id,
  };
  const url = `${userAPIBaseUrl}/${queryObject.id}`;
  const res = await apiWrapper.get<ApiFetchOneUserRes>(url);

  return mappingServerDataUnderUserView(res);
};

const createUser = async (params: TCreateUserArgs): Promise<TCreateUserRes> => {
  const body: ApiCreateUserArgs = {
    username: params.username,
    email: params.email,
    phoneNumber: params.phoneNumber,
    role: params.role,
    password: params.password,
  };

  const apiResult = await apiWrapper.post<ApiCreateUserArgs, ApiCreateUserRes>(userAPIBaseUrl, body);
  return mappingServerDataUnderUserView(apiResult);
};

const updateUser = async (params: TUpdateUserArgs): Promise<TUpdateUserRes> => {
  const url = `${userAPIBaseUrl}/${params.id}`;
  const updateOptions: ApiUpdateUserArgs = {
    ...(params.email && { email: params.email }),
    ...(params.phoneNumber && { phoneNumber: params.phoneNumber }),
    ...(params.role && { role: params.role }),
    ...(params.password && { password: params.password }),
  };

  const apiResult = await apiWrapper.put<ApiUpdateUserArgs, ApiUpdateUserRes>(url, updateOptions);
  return mappingServerDataUnderUserView(apiResult);
};

const deleteUser = async (params: TDeleteUserArgs): Promise<TDeleteUserRes> => {
  const url = `${userAPIBaseUrl}/${params.id}`;

  const apiResult = await apiWrapper._delete<ApiDeleteUserArgs, ApiDeleteUserRes>(url, {});
  return mappingServerDataUnderUserView(apiResult);
};

const mappingServerDataUnderUserView = (serverData: IUserServerResponse): IUser => {
  const userData: IUser = {
    id: serverData.id,
    fullname: serverData.fullname,
    email: serverData.email,
    phone: serverData.phone,
    role: serverData.role,
  };

  return userData;
};

const userAPI = {
  fetchUsers,
  fetchOneUser,
  createUser,
  updateUser,
  deleteUser,
  mappingServerDataUnderUserView,
};

export default userAPI;
