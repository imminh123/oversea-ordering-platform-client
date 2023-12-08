import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { IOrderStatusRes, OrderStatus } from 'features/cart/api/useGetOrderDetail';
import { useQuery } from 'react-query';

interface IOrderListingParams {
  page: number;
  status?: OrderStatus;
  timeFrom?: string;
  timeTo?: string;
}

export const indexOrder = async (
  param: IOrderListingParams,
): Promise<{ data: IOrderStatusRes[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/order`, { ...param, perPage: 10 });
};

type QueryFnType = typeof indexOrder;

export const useIndexOrders = (param: IOrderListingParams, config?: QueryConfig<QueryFnType>) => {
  const { page, status, timeFrom, timeTo } = param;
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useIndexOrders', page, status, timeFrom, timeTo],
    queryFn: () => indexOrder(param),
    ...config,
  });
};
