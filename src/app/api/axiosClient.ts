import axios, { AxiosInstance } from 'axios';
import queryString from 'query-string';
import { envConfig } from 'configs/env.config';
import storage from 'app/utils/storage';
import { RoutePathsEnum } from 'configs/route.config';
import { jwtDecode } from 'jwt-decode';
import { UserRole } from 'app/types/user';

const REQUEST_TIMEOUT = 2 * 60 * 1000;
interface TokenEntity {
  userId: string;
  role: UserRole;
}
export class ApiWrapper {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || envConfig.baseURL,
      headers: {
        'content-type': 'application/json',
      },
      paramsSerializer: (params) => {
        return queryString.stringify(params);
      },
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = storage.getAccessTokenClient();

      if (token) {
        config.headers['access-token'] = `${token}`;
      }

      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const originalConfig = error.config;
        if (
          originalConfig.url !== '/session/createClientSession' &&
          originalConfig.url !== '/session/adminCreateSession'
        ) {
          const refreshToken = storage.getRefreshTokenClient();
          if (error.response.data.statusCode === 401 && refreshToken) {
            try {
              const res = await this.axiosInstance.post('/session/refreshSession', {
                token: refreshToken,
              });
              const { accessToken } = res.data;
              storage.setAccessTokenClient(accessToken);
              originalConfig.headers['access-token'] = `${accessToken}`;
              return this.axiosInstance(originalConfig);
            } catch (error) {
              window.location.href = RoutePathsEnum.LoginPage;
            }
          }
          if (error.response.data.statusCode === 403) {
            const token = storage.getAccessTokenClient();
            if (token) {
              const user: TokenEntity = jwtDecode(token);
              if (user?.role !== UserRole.Admin) {
                window.location.href = RoutePathsEnum.LoginPage;
              } else {
                window.location.href = RoutePathsEnum.AdminLoginPage;
              }
            }
            storage.clearTokensClient();
          }
        }

        return Promise.reject(error);
      },
    );
  }

  async get<T>(url: string, params?: any, headers?: any): Promise<T> {
    const data: any = await this.axiosInstance.get(url, {
      params,
      timeout: REQUEST_TIMEOUT,
      headers: {
        ...this.axiosInstance.defaults.headers,
        ...headers,
      },
    });

    return data;
  }

  async post<T, U>(url: string, body: T, params?: any, headers: any = {}): Promise<U> {
    const data: any = await this.axiosInstance({
      method: 'POST',
      url,
      data: body,
      params,
      headers: {
        ...this.axiosInstance.defaults.headers,
        ...headers,
      },
      timeout: REQUEST_TIMEOUT,
    });

    return data;
  }

  async put<T, U>(url: string, body: T, headers: any = {}): Promise<U> {
    const data: any = await this.axiosInstance({
      method: 'PUT',
      url,
      data: body,
      headers: {
        ...this.axiosInstance.defaults.headers,
        ...headers,
      },
      timeout: REQUEST_TIMEOUT,
    });

    return data;
  }

  async _delete<T, U>(url: string, body: T, headers: any = {}): Promise<U> {
    const data: any = await this.axiosInstance({
      method: 'DELETE',
      url,
      data: body,
      headers: {
        ...this.axiosInstance.defaults.headers,
        ...headers,
      },
      timeout: REQUEST_TIMEOUT,
    });

    return data;
  }

  async patch<T, U>(url: string, body: T, headers: any = {}, withCredentials = false): Promise<U> {
    const data: any = await this.axiosInstance({
      method: 'PATCH',
      url,
      data: body,
      headers: {
        ...this.axiosInstance.defaults.headers,
        ...headers,
      },
      timeout: REQUEST_TIMEOUT,
      withCredentials,
    });

    return data;
  }
}

export const apiWrapper = new ApiWrapper();
