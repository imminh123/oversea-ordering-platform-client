import axios, { AxiosInstance } from 'axios';
import queryString from 'query-string';

import { envConfig } from 'configs/env.config';
import storage from 'app/utils/storage';

const REQUEST_TIMEOUT = 2 * 60 * 1000;

export class ApiWrapper {
  private readonly axiosInstance: AxiosInstance;

  constructor(baseURL?: string) {
    this.axiosInstance = axios.create({
      baseURL: baseURL || envConfig.baseURL,
      // headers: {
      //   'content-type': 'application/json',
      // },
      paramsSerializer: (params) => {
        return queryString.stringify(params);
      },
    });

    // this.axiosInstance.interceptors.request.use(async (config) => {
    //   const token = storage.getToken();
    //
    //   if (token) {
    //     config.headers.Authorization = `Bearer ${token}`;
    //   }
    //
    //   return config;
    // });

    this.axiosInstance.interceptors.response.use(
      (response) => {
        if (response && response.data) {
          return response.data;
        }

        return response;
      },
      async (error) => {
        // Handle errors
        if (error && error.response && error.response.data) {
          throw error.response.data;
        }

        throw error;
      },
    );
  }

  async get<T>(url: string, withCredentials = true): Promise<T> {
    const data: any = await this.axiosInstance.get(url);

    return data;
  }

  async post<T, U>(url: string, body: T, headers: any = {}, withCredentials = true): Promise<U> {
    const data: any = await this.axiosInstance({
      method: 'POST',
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

  async put<T, U>(url: string, body: T, headers: any = {}, withCredentials = true): Promise<U> {
    const data: any = await this.axiosInstance({
      method: 'PUT',
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

  async _delete<T, U>(url: string, body: T, headers: any = {}, withCredentials = true): Promise<U> {
    const data: any = await this.axiosInstance({
      method: 'DELETE',
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

  async patch<T, U>(url: string, body: T, headers: any = {}, withCredentials = true): Promise<U> {
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
