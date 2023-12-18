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
  PENDING_ORDER = 'pending_order',
  PROCESSING = 'processing',
  PLACED = 'placed',
  IN_TRANSIT = 'in_transit',
  OUT_OF_DELIVERY = 'out_of_delivery',
  ON_HOLD = 'on_hold',
  CANCELLED = 'cancelled',
  REFUNDED = 'refunded',
  PARTIALLY_SHIPPED = 'partially_shipped',
  BACK_ORDERED = 'back_ordered',
}

export interface ItemDetail {
  cartId: string;
  currency: string;
  id: string;
  image: string;
  itemId: number;
  itemName: string;
  itemUrl: string;
  price: number;
  propName: string;
  quantity: number;
  shopId: string;
  shopName: string;
  shopUrl: string;
  vnCost: number;
}

export interface IOrderStatusRes {
  id: string;
  total: number;
  wareHouseAddress: string;
  status: OrderStatus;
  userId: string;
  address: AddressRes;
  listItem: ItemDetail[];
  createdAt: string;
  updatedAt: string;
}

export const getOrderStatus = async (id: string): Promise<IOrderStatusRes> => {
  const res = await apiWrapper.get<{ data: IOrderStatusRes }>(`/order/${id}`, {});
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
