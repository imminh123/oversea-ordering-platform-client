import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { IPaginationHeader } from 'app/types/pagination';
import { IOrderDetailRes, OrderStatus } from 'features/cart/api/useGetOrderDetail';
import { useQuery } from 'react-query';

interface IOrderListingParams {
  page: number;
  perPage?: number;
  status?: OrderStatus;
  userName?: string;
  itemName?: string;
  timeFrom?: string;
  timeTo?: string;
  taobaoDeliveryId?: string;
}

export const indexOrderAdmin = async (
  param: IOrderListingParams,
): Promise<{ data: IOrderDetailRes[]; headers: IPaginationHeader }> => {
  return apiWrapper.get(`/order/admin`, { ...param, perPage: param.perPage || 10 });
};

type QueryFnType = typeof indexOrderAdmin;

export const useIndexOrdersAdmin = (param: IOrderListingParams, config?: QueryConfig<QueryFnType>) => {
  const { page, status, timeFrom, timeTo, itemName, userName, taobaoDeliveryId, perPage } = param;
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useIndexOrdersAdmin', page, status, timeFrom, timeTo, itemName, userName, taobaoDeliveryId, perPage],
    queryFn: () => indexOrderAdmin(param),
    ...config,
  });
};
