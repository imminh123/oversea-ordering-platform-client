import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';

interface IStat {
  countOrderFromBeginOfDay: number;
  countOrderFromBeginOfMonth: number;
  totalMoneyEarnedFromBeginOfDay: string;
  totalMoneyEarnedFromBeginOfMonth: string;
}

export const adminGetStat = async (): Promise<{ data: IStat }> => {
  const result: { data: IStat } = await apiWrapper.get(`/dashboard/admin`, {});
  result.data.totalMoneyEarnedFromBeginOfDay = Number(result.data.totalMoneyEarnedFromBeginOfDay).toLocaleString();
  result.data.totalMoneyEarnedFromBeginOfMonth = Number(result.data.totalMoneyEarnedFromBeginOfMonth).toLocaleString();
  return result;
};

type QueryFnType = typeof adminGetStat;

export const useAdminGetStat = (config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useAdminGetStat'],
    queryFn: () => adminGetStat(),
    ...config,
  });
};
