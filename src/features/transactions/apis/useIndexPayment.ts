import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { useQuery } from 'react-query';

export enum PaymentStatus {
  SUCCEEDED = 'succeeded',
  FAILED = 'failed',
  PENDING = 'pending',
}

export interface IPaymentTransaction {
  userId: string;
  userName: string;
  referenceId: string;
  orderInfo: string;
  amount: number;
  status: PaymentStatus;
  id: string;
  createdAt: string;
  updatedAt: string;
}

interface IOrderListingParams {
  page: number;
}

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
