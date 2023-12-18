import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IOrderStatusRes } from 'features/cart/api/useGetOrderDetail';
import { useQuery } from 'react-query';

export const getOrderAdmin = async (id: string): Promise<{ data: IOrderStatusRes }> => {
  return apiWrapper.get(`/order/admin/${id}`, {});
};

type QueryFnType = typeof getOrderAdmin;

export const useGetOrderByAdmin = (id: string, config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useGetOrderByAdmin', id],
    queryFn: () => getOrderAdmin(id),
    ...config,
  });
};
