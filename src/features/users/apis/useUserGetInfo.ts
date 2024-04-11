import { useQuery } from 'react-query';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import { ApiGetMeRes } from 'app/api/authAPI';

export const getUserDetail = async (id: string): Promise<ApiGetMeRes> => {
  const url = `/authentication/${id}`;

  const res = await apiWrapper.get<{ data: ApiGetMeRes }>(url, {});
  return res.data;
};

type QueryFnType = typeof getUserDetail;

export const useGetUserDetail = (id: string, config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useGetUserDetail', id],
    queryFn: () => getUserDetail(id),
    ...config,
  });
};
