import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation, useQueryClient } from 'react-query';

export const deleteAddress = async (id: string) => {
  return apiWrapper._delete(`/address/${id}`, {});
};

type QueryFnType = typeof deleteAddress;

export const useDeleteAddress = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();
  return useMutation({
    mutationFn: deleteAddress,
    onSuccess() {
      alertSuccess('Xóa địa chỉ thành công');
      queryClient.invalidateQueries('useListAddress');
    },
    onError(error) {
      alertError(error.message);
    },
    ...config,
  });
};
