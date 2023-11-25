import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { IOrderStatusRes } from 'features/cart/api/useGetOrderDetail';
import { useQuery } from 'react-query';

export const indexOrder = async (page: number): Promise<{ data: IOrderStatusRes[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/order`, { page, perPage: 10 });
};

type QueryFnType = typeof indexOrder;

export const useIndexOrders = (page: number, config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useIndexOrders', page],
    queryFn: () => indexOrder(page),
    ...config,
  });
};
