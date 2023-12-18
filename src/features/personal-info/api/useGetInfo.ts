import { useQuery } from 'react-query';
import { ExtractFnReturnType } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import { ApiGetMeRes } from 'app/api/authAPI';

export const getProfile = async (): Promise<ApiGetMeRes> => {
  const url = `/authentication/client`;

  const res = await apiWrapper.get<{ data: ApiGetMeRes }>(url, {});
  return res.data;
};

type QueryFnType = typeof getProfile;

export const useGetInfo = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useGetInfo'],
    queryFn: () => getProfile(),
  });
};
