import { useMutation, useQueryClient } from 'react-query';
import { MutationConfig } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import useAlert from 'app/hooks/useAlert';
import { OrderStatus } from 'features/cart/api/useGetOrderDetail';

export interface UpdateOrderDto {
  status: OrderStatus;
  listItem: Array<{ id: string; quantity: number }>;
  meta?: any;
}

export const adminUpdateOrder = ({ body, id }: { body: UpdateOrderDto; id: string }): Promise<any> => {
  return apiWrapper.put(`/order/updateStatus/${id}`, body);
};

type QueryFnType = typeof adminUpdateOrder;

export const useUpdateOrderAdmin = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();

  return useMutation({
    mutationFn: adminUpdateOrder,
    onSuccess() {
      queryClient.invalidateQueries('useGetOrder');
      alertSuccess('Chỉnh sửa thành công');
    },
    onError(error) {
      alertError(error.message);
    },
    ...config,
  });
};
