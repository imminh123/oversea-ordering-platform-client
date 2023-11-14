import { useQuery } from 'react-query';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import { ApiGetMeRes } from 'app/api/authAPI';

export const getProfile = (): Promise<ApiGetMeRes> => {
  const url = `/authentication/client`;

  return apiWrapper.get(url, {}).then((res) => res.data);
};

type QueryFnType = typeof getProfile;

export const useGetInfo = ({ config }: { config?: QueryConfig<QueryFnType> }) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useGetInfo'],
    queryFn: () => getProfile(),
    ...config,
  });
};
