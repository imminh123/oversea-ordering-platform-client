import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';
import { IPaymentDetail } from '../Transaction.interface';

export const getPaymentDetail = async (id: string): Promise<{ data: IPaymentDetail }> => {
  return apiWrapper.get(`/payment/${id}`, {});
};

type QueryFnType = typeof getPaymentDetail;

export const useGetPaymentDetail = (id: string, config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useGetPaymentDetail', id],
    queryFn: () => getPaymentDetail(id),
    ...config,
  });
};
