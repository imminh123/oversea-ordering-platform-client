import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation } from 'react-query';
import { useHistory } from 'react-router-dom';

export interface IPayParams {
  orderId: string;
}

export const reCreateOrderAndPay = async (body: IPayParams) => {
  const res = (await apiWrapper.post(`/order/reCreateOrderAndPay`, body)) as any;
  return res.data;
};

type QueryFnType = typeof reCreateOrderAndPay;

export const useRePay = (config?: MutationConfig<QueryFnType>) => {
  const { alertError } = useAlert();
  const history = useHistory();
  return useMutation({
    mutationFn: reCreateOrderAndPay,
    onSuccess(data) {
      if (data.paymentGatewayUrl) {
        window.open(data.paymentGatewayUrl, '_blank');
      }
      if (data?.order?.id) {
        history.push({
          pathname: `/orders/${data.order.id}`,
        });
      }
    },
    onError(error) {
      alertError(error?.response?.data?.message || error.message);
    },
    ...config,
  });
};
