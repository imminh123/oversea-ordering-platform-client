import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation } from 'react-query';
import { AddressRes } from './useGetAddressListing';
import { useHistory } from 'react-router-dom';

export interface ICreateOrderParams {
  listItemId: string[];
  addressId: string;
  wareHouseAddress: string;
}

interface IOrder {
  address: AddressRes;
  id: string;
  listItem: Array<any>;
  status: string;
  total: number;
  userId: string;
  wareHouseAddress: string;
}
interface ICreateOrderNPayRes {
  order: IOrder;
  paymentGatewayUrl: string;
}

export const createOrder = async (body: ICreateOrderParams): Promise<ICreateOrderNPayRes> => {
  const res = (await apiWrapper.post(`/order`, body)) as any;
  return res.data;
};

type QueryFnType = typeof createOrder;

export const useCreateOrder = (config?: MutationConfig<QueryFnType>) => {
  const { alertSuccess, alertError } = useAlert();
  const history = useHistory()
  return useMutation({
    mutationFn: createOrder,
    onSuccess(data) {
      if (data.paymentGatewayUrl) {
        window.open(data.paymentGatewayUrl, '_blank');
        history.push({
            pathname: '/cart/result',
            search: `?id=${data.order.id}`
        })
      }
      alertSuccess('Tạo đơn hàng thành công');
    },
    onError(error) {
      alertError(error.message);
    },
    ...config,
  });
};
