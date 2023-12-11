import { useQuery } from 'react-query';
import { ExtractFnReturnType } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import { ApiGetMeRes } from 'app/api/authAPI';

export const getUserDetail = async (id: string): Promise<ApiGetMeRes> => {
  const url = `/authentication/${id}`;

  const res = await apiWrapper.get<{ data: ApiGetMeRes }>(url, {});
  return res.data;
};

type QueryFnType = typeof getUserDetail;

export const useAdminGetUerDetail = (id: string) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useAdminGetUerDetail', id],
    queryFn: () => getUserDetail(id),
  });
};
