import { LocalStorageKeys } from 'app/utils/constants';
import axios, { AxiosInstance } from 'axios';
import { envConfig } from 'configs/env.config';
import queryString from 'query-string';

const REQUEST_TIMEOUT = 2 * 60 * 1000;

const axiosClient: AxiosInstance = axios.create({
  baseURL: envConfig.baseURL,
  headers: {
    'content-type': 'application/json',
  },
  paramsSerializer: (params) => queryString.stringify(params),
});

axiosClient.interceptors.request.use(async (config) => {
  const token = localStorage.getItem(LocalStorageKeys.AUTH_TOKEN);

  if (token) {
    config.headers['access-token'] = `${token}`;
  }

  return config;
});

axiosClient.interceptors.response.use(
  (response) => {
    if (response && response.data) {
      return response.data;
    }

    return response;
  },
  (error) => {
    console.log({ error });
    // Handle errors
    if (error && error.response && error.response.data) {
      throw error.response.data;
    }

    throw error;
  },
);

async function get<T>(url: string): Promise<T> {
  const data: any = await axiosClient({
    method: 'GET',
    url,
    timeout: REQUEST_TIMEOUT,
  });

  return data;
}

async function post<T, U>(
  url: string,
  body: T,
  options: {
    contentType?: 'application/json' | 'multipart/form-data';
  } = {},
): Promise<U> {
  let bodyData: T | FormData;
  const { contentType = 'application/json' } = options;
  if (contentType === 'application/json') {
    bodyData = body;
  } else {
    bodyData = new FormData();
    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        const element = body[key];
        bodyData.append(key, element as any);
      }
    }
  }

  const data: any = await axiosClient({
    method: 'POST',
    url,
    data: bodyData,
    headers: {
      'Content-Type': contentType,
      'X-CSRF-TOKEN': document.querySelector('[name~=csrf-token][content]') as any,
    },
    timeout: REQUEST_TIMEOUT,
  });

  return data;
}

async function put<T, U>(
  url: string,
  body: T,
  options: {
    contentType?: 'application/json' | 'multipart/form-data';
  } = {},
): Promise<U> {
  let bodyData: T | FormData;
  const { contentType = 'application/json' } = options;
  if (contentType === 'application/json') {
    bodyData = body;
  } else {
    bodyData = new FormData();
    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        const element = body[key];
        bodyData.append(key, element as any);
      }
    }
  }

  const data: any = await axiosClient({
    method: 'PUT',
    url,
    data: bodyData,
    headers: {
      'Content-Type': contentType,
    },
    timeout: REQUEST_TIMEOUT,
  });

  return data;
}

async function _delete<T, U>(
  url: string,
  body: T,
  options: {
    contentType?: 'application/json' | 'multipart/form-data';
  } = {},
): Promise<U> {
  let bodyData: T | FormData;
  const { contentType = 'application/json' } = options;
  if (contentType === 'application/json') {
    bodyData = body;
  } else {
    bodyData = new FormData();
    for (const key in body) {
      if (Object.prototype.hasOwnProperty.call(body, key)) {
        const element = body[key];
        bodyData.append(key, element as any);
      }
    }
  }

  const data: any = await axiosClient({
    method: 'DELETE',
    url,
    data: bodyData,
    headers: {
      'Content-Type': contentType,
    },
    timeout: REQUEST_TIMEOUT,
  });

  return data;
}

export const apiWrapper = {
  get,
  post,
  put,
  _delete,
};
