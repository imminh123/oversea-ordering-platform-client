import { apiWrapper } from 'app/api/axiosClient';
import { MutationConfig } from 'app/api/react-query';
import useAlert from 'app/hooks/useAlert';
import { useMutation, useQueryClient } from 'react-query';

export interface IAddAddressParams {
  name: string;
  phone: string;
  mail: string;
  note?: string;
  address: string;
  province?: string;
  city?: string;
  ward?: string;
  isDefault?: boolean;
}

export const addAddress = async (add: IAddAddressParams) => {
  return apiWrapper.post(`/address`, add);
};

type QueryFnType = typeof addAddress;

export const useAddAddress = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();
  return useMutation({
    mutationFn: addAddress,
    onSuccess() {
      alertSuccess('Thêm mới thành công');
      queryClient.invalidateQueries('useListAddress');
    },
    onError(error) {
      alertError(error.message);
    },
    ...config,
  });
};
