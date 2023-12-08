import { apiWrapper } from 'app/api/axiosClient';
import { ExtractFnReturnType, QueryConfig } from 'app/api/react-query';
import { useQuery } from 'react-query';
import { AddressRes } from './useGetAddressListing';

export enum OrderStatus {
  CREATED = 'created',
  PENDING_PAYMENT = 'pending_payment',
  DELIVERED = 'delivered',
  SUCCEEDED = 'succeeded',
  TIMEOUT = 'timeout',
  FAILED = 'failed',
}

export interface IOrderStatusRes {
  id: string;
  total: number;
  wareHouseAddress: string;
  status: OrderStatus;
  userId: string;
  address: AddressRes;
  listItem: Array<any>;
  createdAt: string;
  updatedAt: string;
}

export const getOrderStatus = async (id: string): Promise<IOrderStatusRes> => {
  const res = await apiWrapper.get(`/order/${id}`, {});
  return res.data;
};

type QueryFnType = typeof getOrderStatus;

export const useGetOrderStatus = (id: string, config?: QueryConfig<QueryFnType>) => {
  return useQuery<ExtractFnReturnType<QueryFnType>>({
    queryKey: ['useGetOrderStatus'],
    queryFn: () => getOrderStatus(id),
    ...config,
  });
};
