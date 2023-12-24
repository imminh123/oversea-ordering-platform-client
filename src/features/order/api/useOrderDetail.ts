import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IOrderDetailRes } from 'features/cart/api/useGetOrderDetail';
import { useQuery } from 'react-query';

export const getOrder = async (id: string): Promise<{ data: IOrderDetailRes }> => {
  return apiWrapper.get(`/order/${id}`, {});
};

type QueryFnType = typeof getOrder;

export const useGetOrder = (id: string, config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useGetOrder', id],
    queryFn: () => getOrder(id),
    ...config,
  });
};
