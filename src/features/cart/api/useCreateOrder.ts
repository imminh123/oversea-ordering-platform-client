import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation } from 'react-query';
import { AddressRes } from './useGetAddressListing';

export interface ICreateOrderParams {
  listItemId: string[];
  addressId: string;
  wareHouseAddress?: string;
}

interface IOrder {
  address: AddressRes;
  id: string;
  listItem: Array<any>;
  status: string;
  total: number;
  userId: string;
  wareHouseAddress?: string;
}

export const createOrder = async (body: ICreateOrderParams): Promise<IOrder> => {
  const res = (await apiWrapper.post(`/order/createOrder`, body)) as any;
  return res.data;
};

type QueryFnType = typeof createOrder;

export const useCreateOrder = (config?: MutationConfig<QueryFnType>) => {
  const { alertSuccess, alertError } = useAlert();
  return useMutation({
    mutationFn: createOrder,
    onSuccess() {
      alertSuccess('Tạo đơn hàng thành công');
    },
    onError(error) {
      alertError(error.response?.data.message);
    },
    ...config,
  });
};
