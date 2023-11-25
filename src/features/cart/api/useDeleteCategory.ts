import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation, useQueryClient } from 'react-query';

export const deleteCartItem = async (ids: string) => {
  return apiWrapper._delete(`/cart`, { ids });
};

type QueryFnType = typeof deleteCartItem;

export const useDeleteCartItem = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();
  return useMutation({
    mutationFn: deleteCartItem,
    onSuccess() {
      alertSuccess('Xóa thành công');
      queryClient.invalidateQueries('useListCartCategories');
    },
    onError(error) {
      alertError(error.message);
    },
    ...config,
  });
};
