import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation } from 'react-query';
import { AddressRes } from './useGetAddressListing';
import { useHistory } from 'react-router-dom';

export interface IPayParams {
  referenceId: string;
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

export const payOrder = async (body: IPayParams): Promise<ICreateOrderNPayRes> => {
  const res = (await apiWrapper.post(`/payment`, body)) as any;
  return res.data;
};

type QueryFnType = typeof payOrder;

export const usePayOrder = (config?: MutationConfig<QueryFnType>) => {
  const { alertSuccess, alertError } = useAlert();
  const history = useHistory();
  return useMutation({
    mutationFn: payOrder,
    onSuccess(data) {
      if (data.paymentGatewayUrl) {
        window.open(data.paymentGatewayUrl, '_blank');
      }
      if (data.order.id) {
        history.push({
          pathname: `/orders/${data.order.id}`,
        });
      }
      alertSuccess('Thanh toán đơn hàng thành công');
    },
    onError(error) {
      alertError(error.response?.data.message[0]);
    },
    ...config,
  });
};
