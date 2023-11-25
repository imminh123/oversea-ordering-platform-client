import { apiWrapper } from 'app/api/axiosClient';
import { useMutation, useQueryClient } from 'react-query';

export const refreshCart = async () => {
  return apiWrapper.put(`/cart/refreshCart`, {});
};

export const useRefreshCart = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: refreshCart,
    onSuccess() {
      queryClient.invalidateQueries('useListCartCategories');
    },
  });
};
