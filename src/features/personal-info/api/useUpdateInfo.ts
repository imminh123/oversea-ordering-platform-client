import { useMutation, useQueryClient } from 'react-query';
import { MutationConfig } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import useAlert from 'app/hooks/useAlert';

export interface UpdateInfoDTO {
  fullname: string;
  gender?: string;
  birthday?: string;
  phone: string;
  address: string;
  province: string;
  city: string;
  ward: string;
}

export const updateInfoAPI = ({ body }: { body: UpdateInfoDTO }): Promise<any> => {
  return apiWrapper.put(`/authentication`, body);
};

type QueryFnType = typeof updateInfoAPI;

export const useUpdateInfo = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();

  return useMutation({
    mutationFn: updateInfoAPI,
    onSuccess() {
      queryClient.invalidateQueries('useGetInfo');
      alertSuccess('Đăng ký thành công');
    },
    onError(error) {
      alertError(error.message);
    },
    ...config,
  });
};
