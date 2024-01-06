import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';

interface IStat {
  lenCart?: number;
  lenOrder: number;
  countCreated: number;
  countPendingPayment: number;
  countDelivered?: number;
}

export const getStat = async (): Promise<{ data: IStat }> => {
  const result: { data: IStat } = await apiWrapper.get(`/dashboard`, {});
  // delete result.data['countDelivered']
  // delete result.data['lenCart']
  return result;
};

type QueryFnType = typeof getStat;

export const useGetStat = (config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useGetStat'],
    queryFn: () => getStat(),
    ...config,
  });
};
