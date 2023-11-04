import queryString from 'query-string';

import {
  IPaginationQuery,
  IPaginationQueryServer,
  IPaginationResponse,
  IPaginationServerResponse,
} from 'app/types/pagination';
import { IPost, IPostServerResponse } from 'app/types/post';
import { envConfig } from 'configs/env.config';
import { apiWrapper } from './axiosClient';
import { mappingPaginationServerToClient } from 'app/utils/helper';

const postAPIBaseUrl = '/posts';

/* Types export for outside */
/* ==================== START ==================== */
export type TFetchPostsArgs = IPaginationQuery;
export type TFetchPostsRes = IPaginationResponse<IPost>;

export type TFetchOnePostArgs = {
  id: string;
};
export type TFetchOnePostRes = IPost;

export type TCreatePostArgs = {
  title: string;
  description?: string;
};
export type TCreatePostRes = IPost;

export type TUpdatePostArgs = {
  id: string;
  title?: string;
  description?: string;
};
export type TUpdatePostRes = IPost;

export type TDeletePostArgs = {
  id: string;
};
export type TDeletePostRes = IPost;
/* ==================== END ==================== */

/* API Types */
/* ==================== START ==================== */
type ApiFetchPostsArgs = IPaginationQueryServer;
type ApiFetchPostsRes = IPaginationServerResponse<IPostServerResponse>;

type ApiFetchOnePostArgs = {
  id: string;
};
type ApiFetchOnePostRes = IPostServerResponse;

type ApiCreatePostArgs = {
  title: string;
  description?: string;
};
type ApiCreatePostRes = IPostServerResponse;

type ApiUpdatePostArgs = {
  title?: string;
  description?: string;
};
type ApiUpdatePostRes = IPostServerResponse;

type ApiDeletePostArgs = {};
type ApiDeletePostRes = IPostServerResponse;
/* ==================== END ==================== */

const fetchPosts = async (query: TFetchPostsArgs): Promise<TFetchPostsRes> => {
  const queryObject: ApiFetchPostsArgs = {
    page: query.page || envConfig.defaultPage,
    limit: query.limit || envConfig.defaultLimit,
  };
  const url = queryString.stringifyUrl({
    url: postAPIBaseUrl,
    query: queryObject as any,
  });
  const res = await apiWrapper.get<ApiFetchPostsRes>(url);

  return mappingPaginationServerToClient<IPostServerResponse, IPost>({
    paginationData: res,
    mappingFunc: mappingServerDataUnderUserView,
  });
};

const fetchOnePost = async (params: TFetchOnePostArgs): Promise<TFetchOnePostRes> => {
  const queryObject: ApiFetchOnePostArgs = {
    id: params.id,
  };
  const url = `${postAPIBaseUrl}/${queryObject.id}`;
  const res = await apiWrapper.get<ApiFetchOnePostRes>(url);

  return mappingServerDataUnderUserView(res);
};

const createPost = async (params: TCreatePostArgs): Promise<TCreatePostRes> => {
  const body: ApiCreatePostArgs = {
    title: params.title,
    description: params.description,
  };

  const apiResult = await apiWrapper.post<ApiCreatePostArgs, ApiCreatePostRes>(postAPIBaseUrl, body);
  return mappingServerDataUnderUserView(apiResult);
};

const updatePost = async (params: TUpdatePostArgs): Promise<TUpdatePostRes> => {
  const url = `${postAPIBaseUrl}/${params.id}`;
  const updateOptions: ApiUpdatePostArgs = {
    ...(params.title && { title: params.title }),
    ...(params.description && { description: params.description }),
  };

  const apiResult = await apiWrapper.put<ApiUpdatePostArgs, ApiUpdatePostRes>(url, updateOptions);
  return mappingServerDataUnderUserView(apiResult);
};

const deletePost = async (params: TDeletePostArgs): Promise<TDeletePostRes> => {
  const url = `${postAPIBaseUrl}/${params.id}`;

  const apiResult = await apiWrapper._delete<ApiDeletePostArgs, ApiDeletePostRes>(url, {});
  return mappingServerDataUnderUserView(apiResult);
};

const mappingServerDataUnderUserView = (serverData: IPostServerResponse): IPost => {
  const postData: IPost = {
    id: serverData.id,
    title: serverData.title,
    descriptions: serverData.descriptions,
  };

  return postData;
};

const postAPI = {
  fetchPosts,
  fetchOnePost,
  createPost,
  updatePost,
  deletePost,
  mappingServerDataUnderUserView,
};

export default postAPI;
