import { useUI } from './index';

function useAlert() {
  const { setAlert } = useUI();

  const alertSuccess = (message: string) => {
    setAlert('success', message);
  };

  const alertError = (message: string) => {
    setAlert('error', message);
  };

  const alertInfo = (message: string) => {
    setAlert('info', message);
  };

  const alertWarning = (message: string) => {
    setAlert('warning', message);
  };

  return {
    alertSuccess,
    alertError,
    alertInfo,
    alertWarning,
  };
}

export default useAlert;
