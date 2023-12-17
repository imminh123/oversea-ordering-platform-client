import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation, useQueryClient } from 'react-query';
import { IAddAddressParams } from './useAddAddress';

export const updateAddress = async ({ id, body }: { id: string; body: IAddAddressParams }) => {
  return apiWrapper.put(`/address/${id}`, body);
};

type QueryFnType = typeof updateAddress;

export const useUpdateAddress = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();
  return useMutation({
    mutationFn: updateAddress,
    onSuccess() {
      alertSuccess('Chỉnh sửa thành công');
      queryClient.invalidateQueries('useListAddress');
    },
    onError(error) {
      alertError(error?.response?.data?.message);
    },
    ...config,
  });
};
