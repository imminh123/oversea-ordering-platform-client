import { useMutation, useQueryClient } from 'react-query';
import { MutationConfig } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import useAlert from 'app/hooks/useAlert';

export interface SignUpDto {
  mail: string;
  phone: string;
  password: string;
  wareHouseAddress: string;
}

export type TSignUpDto = {
  mail: string;
  phone: string;
  password: string;
  confirmPassword: string;
  wareHouseAddress: string;
};

export const signUpAPI = ({ body }: { body: SignUpDto }): Promise<any> => {
  return apiWrapper.post(`/authentication`, body);
};

type QueryFnType = typeof signUpAPI;

export const useSignUp = (config?: MutationConfig<QueryFnType>) => {
  const queryClient = useQueryClient();
  const { alertSuccess, alertError } = useAlert();
  return useMutation({
    mutationFn: signUpAPI,
    onSuccess() {
      alertSuccess('Create account success!');
    },
    onError(err) {
      alertError(err.message);
    },
    ...config,
  });
};
