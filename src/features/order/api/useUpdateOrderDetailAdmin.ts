import { useMutation, useQueryClient } from 'react-query';
import { MutationConfig } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import useAlert from 'app/hooks/useAlert';

export interface UpdateOrderDetailDto {
  listItem: Array<{ id: string; quantity: number }>;
  taobaoDeliveryIds: string[];
  meta?: any;
}

export const adminUpdateOrderDetail = ({ body, id }: { body: UpdateOrderDetailDto; id: string }): Promise<any> => {
  return apiWrapper.put(`/order/updateOrderDetail/${id}`, body);
};

type QueryFnType = typeof adminUpdateOrderDetail;

export const useUpdateOrderDetailAdmin = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();

  return useMutation({
    mutationFn: adminUpdateOrderDetail,
    onSuccess() {
      queryClient.invalidateQueries('useGetOrder');
      queryClient.invalidateQueries('useGetOrderByAdmin');
      alertSuccess('Chỉnh sửa thành công');
    },
    onError(error) {
      alertError(error?.response?.data?.message || error.message);
    },
    ...config,
  });
};
