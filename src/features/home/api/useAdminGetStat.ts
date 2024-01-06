import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';

interface IStat {
  countOrderFromBeginOfDay: number;
  countOrderFromBeginOfMonth: number;
  totalMoneyEarnedFromBeginOfDay: number;
  totalMoneyEarnedFromBeginOfMonth: number;
}

export const adminGetStat = async (): Promise<{ data: IStat }> => {
  return apiWrapper.get(`/dashboard/admin`, {});
};

type QueryFnType = typeof adminGetStat;

export const useAdminGetStat = (config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useAdminGetStat'],
    queryFn: () => adminGetStat(),
    ...config,
  });
};
