import { useUI } from './index';

function useAlert() {
  const { setAlert } = useUI();

  const alertSuccess = (message: string) => {
    console.log({ message });
    setAlert('success', message);
  };

  const alertError = (message: string) => {
    console.log({ message });
    setAlert('error', message);
  };

  const alertInfo = (message: string) => {
    console.log({ message });
    setAlert('info', message);
  };

  const alertWarning = (message: string) => {
    console.log({ message });
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
