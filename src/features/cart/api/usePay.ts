import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation } from 'react-query';
import { AddressRes } from './useGetAddressListing';
import { useHistory } from 'react-router-dom';

export interface IPayParams {
  referenceId: string;
}

interface ITransaction {
  id: string;
  amount: number;
  referenceId: string;
  status: string;
  userId: string;
}
interface ICreateOrderNPayRes {
  transaction: ITransaction;
  paymentGatewayUrl: string;
}

export const payOrder = async (body: IPayParams): Promise<ICreateOrderNPayRes> => {
  const res = (await apiWrapper.post(`/payment`, body)) as any;
  return res.data;
};

type QueryFnType = typeof payOrder;

export const usePayOrder = (config?: MutationConfig<QueryFnType>) => {
  const { alertError } = useAlert();
  const history = useHistory();
  return useMutation({
    mutationFn: payOrder,
    onSuccess(data) {
      if (data.paymentGatewayUrl) {
        window.open(data.paymentGatewayUrl, '_blank');
      }
      if (data?.transaction?.referenceId) {
        history.push({
          pathname: `/orders/${data.transaction.referenceId}`,
        });
      }
    },
    onError(error) {
      alertError(error.message);
    },
    ...config,
  });
};
