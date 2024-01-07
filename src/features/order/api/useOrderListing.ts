import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { IOrderDetailRes, OrderStatus } from 'features/cart/api/useGetOrderDetail';
import { useQuery } from 'react-query';

interface IOrderListingParams {
  page: number;
  perPage?: number;
  status?: OrderStatus;
  timeFrom?: string;
  timeTo?: string;
}

export const indexOrder = async (
  param: IOrderListingParams,
): Promise<{ data: IOrderDetailRes[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/order`, { ...param, perPage: param.perPage || 10 });
};

type QueryFnType = typeof indexOrder;

export const useIndexOrders = (param: IOrderListingParams, config?: QueryConfig<QueryFnType>) => {
  const { page, status, timeFrom, timeTo, perPage } = param;
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useIndexOrders', page, status, timeFrom, timeTo, perPage],
    queryFn: () => indexOrder(param),
    ...config,
  });
};
