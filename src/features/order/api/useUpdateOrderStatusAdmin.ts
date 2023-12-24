import { useMutation, useQueryClient } from 'react-query';
import { MutationConfig } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import useAlert from 'app/hooks/useAlert';
import { IOrderDetailRes, OrderStatus } from 'features/cart/api/useGetOrderDetail';

export interface UpdateOrderStatusDto {
  status: OrderStatus;
  meta?: any;
}

export const adminUpdateOrderStatus = ({
  body,
  id,
}: {
  body: UpdateOrderStatusDto;
  id: string;
}): Promise<{ data: IOrderDetailRes }> => {
  return apiWrapper.put(`/order/updateStatus/${id}`, body);
};

type QueryFnType = typeof adminUpdateOrderStatus;

export const useUpdateOrderStatusAdmin = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();

  return useMutation({
    mutationFn: adminUpdateOrderStatus,
    onSuccess() {
      queryClient.invalidateQueries(['useGetOrderByAdmin']);
      queryClient.invalidateQueries('useGetOrder');
      alertSuccess('Chỉnh sửa thành công');
    },
    onError(error) {
      alertError(error.message);
    },
    ...config,
  });
};
