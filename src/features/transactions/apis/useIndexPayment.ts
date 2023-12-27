import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { useQuery } from 'react-query';
import { IOrderListingParams, IPaymentTransaction } from '../Transaction.interface';

export const indexTransactions = async (
  param: IOrderListingParams,
): Promise<{ data: IPaymentTransaction[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/payment/clientIndexPayment`, { ...param, perPage: 10 });
};

type QueryFnType = typeof indexTransactions;

export const useIndexTransactions = (param: IOrderListingParams, config?: QueryConfig<QueryFnType>) => {
  const { page } = param;
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useIndexTransactions', page],
    queryFn: () => indexTransactions(param),
    ...config,
  });
};
