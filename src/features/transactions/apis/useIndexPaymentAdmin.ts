import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { useQuery } from 'react-query';
import { IAdminOrderListingPararms, IPaymentTransaction } from '../Transaction.interface';

export const indexTransactionsAdmin = async (
  param: IAdminOrderListingPararms,
): Promise<{ data: IPaymentTransaction[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/payment/admin`, { ...param, perPage: 10 });
};

type QueryFnType = typeof indexTransactionsAdmin;

export const useIndexTransactionsAdmin = (param: IAdminOrderListingPararms, config?: QueryConfig<QueryFnType>) => {
  const { page, status, userId, userName, timeFrom, timeTo } = param;
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useIndexTransactionsAdmin', page, status, userId, userName, timeFrom, timeTo],
    queryFn: () => indexTransactionsAdmin(param),
    ...config,
  });
};
