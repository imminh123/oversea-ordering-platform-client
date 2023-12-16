import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation, useQueryClient } from 'react-query';

export interface IAddCartParams {
  id: string;
  pvid?: string[];
  skuId?: string;
  volume: number;
}

export const addToCart = async (body: IAddCartParams) => {
  const res = (await apiWrapper.post(`/cart`, body)) as any;
  return res.data;
};

type QueryFnType = typeof addToCart;

export const useAddToCart = (config?: MutationConfig<QueryFnType>) => {
  const { alertSuccess, alertError } = useAlert();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addToCart,
    onSuccess() {
      alertSuccess('Thêm vào giỏ thành công');
      queryClient.invalidateQueries('useCountCart');
    },
    onError(error) {
      alertError(error.response?.data.message);
    },
    ...config,
  });
};
