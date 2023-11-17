import { useQuery } from 'react-query';
import { ExtractFnReturnType } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import { ApiGetMeRes } from 'app/api/authAPI';

export const getProfile = (): Promise<ApiGetMeRes> => {
  const url = `/authentication/client`;


  return apiWrapper.get(url, {}).then(res => res.data);

};

type QueryFnType = typeof getProfile;

export const useGetInfo = () => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useGetInfo'],
    queryFn: () => getProfile(),
  });
};
