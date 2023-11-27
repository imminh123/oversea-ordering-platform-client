import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation, useQueryClient } from 'react-query';

export const updateQuantity = async ({ id, quantity }: { id: string; quantity: number }) => {
  return apiWrapper.put(`/cart/${id}`, { quantity });
};

type QueryFnType = typeof updateQuantity;

export const useUpdateQuantity = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();
  return useMutation({
    mutationFn: updateQuantity,
    onSuccess() {
      alertSuccess('Cập nhật thành công');
      queryClient.invalidateQueries('useListCartCategories');
      queryClient.invalidateQueries('useCalculatePrice');
    },
    onError(error) {
      alertError(error.message);
    },
    ...config,
  });
};
