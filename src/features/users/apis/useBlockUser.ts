import { useMutation, useQueryClient } from 'react-query';
import { MutationConfig } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import useAlert from 'app/hooks/useAlert';

export interface BlockUserDto {
  isBlock: boolean;
}

export const blockUser = ({ body, id }: { body: BlockUserDto; id: string }): Promise<any> => {
  return apiWrapper.put(`/admin/authentication/${id}`, body);
};

type QueryFnType = typeof blockUser;

export const useBlockUser = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();

  return useMutation({
    mutationFn: blockUser,
    onSuccess() {
      queryClient.invalidateQueries('useAdminGetUserDetail');
      alertSuccess('Block thành công');
    },
    onError(error) {
      alertError(error.message);
    },
    ...config,
  });
};
