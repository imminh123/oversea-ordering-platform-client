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
      headers: {
        'content-type': 'application/json',
      },
      paramsSerializer: (params) => {
        return queryString.stringify(params);
      },
    });

    this.axiosInstance.interceptors.request.use(async (config) => {
      const token = storage.getToken();

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
        // TODO: add refresh token here
        if (error && error.response && error.response.data) {
          if (error.response.data.statusCode === 401 || error.response.data.statusCode === 403) {
            window.location.href = '/login';
          }
        }

        throw error;
      },
    );
  }

  async get<T>(url: string, params?: any): Promise<T> {
    const data: any = await this.axiosInstance.get(url, { params, timeout: REQUEST_TIMEOUT });

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
