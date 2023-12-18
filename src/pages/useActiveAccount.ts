import { useMutation } from 'react-query';
import { MutationConfig } from 'app/api/react-query';
import { apiWrapper } from 'app/api/axiosClient';
import useAlert from 'app/hooks/useAlert';
import { useHistory } from 'react-router-dom';
import { RoutePathsEnum } from 'configs/route.config';

export const active = (token: string): Promise<any> => {
  return apiWrapper.post(`/authentication/register/${token}`, {});
};

type QueryFnType = typeof active;

export const useActiveAccount = (config?: MutationConfig<QueryFnType>) => {
  const { alertSuccess, alertError } = useAlert();
  const history = useHistory();

  return useMutation({
    mutationFn: active,
    onSuccess() {
      alertSuccess('Active account success!');
      history.push(RoutePathsEnum.LoginPage);
    },
    onError(err) {
      alertError(err.message);
    },
    ...config,
  });
};
