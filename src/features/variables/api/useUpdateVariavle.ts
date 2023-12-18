import { useMutation, useQueryClient } from 'react-query';
import { MutationConfig } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import useAlert from 'app/hooks/useAlert';

export interface UpdateVariableDto {
  value: string;
  description?: string;
}

export const updateVariable = ({ body, id }: { body: UpdateVariableDto; id: string }): Promise<any> => {
  return apiWrapper.put(`/variables/${id}`, body);
};

type QueryFnType = typeof updateVariable;

export const useUpdateVariable = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();

  return useMutation({
    mutationFn: updateVariable,
    onSuccess() {
      queryClient.invalidateQueries('useListVariables');
      alertSuccess('Chỉnh sửa thành công');
    },
    onError(error) {
      alertError(error.message);
    },
    ...config,
  });
};
