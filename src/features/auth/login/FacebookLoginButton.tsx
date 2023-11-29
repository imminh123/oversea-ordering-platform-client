import useAlert from 'app/hooks/useAlert';
import Facebook from '../../../assets/images/facebook.svg';
import { LoadingButton } from '@mui/lab';

const FB = (window as any).FB;

export const FacebookLoginButton = ({ onLogin }: { onLogin: any }) => {
  const { alertError } = useAlert();
  const handleLogin = () => {
    FB.login(function (response: any) {
      if (response.authResponse) {
        onLogin(response.authResponse.accessToken);
        // FB.api('/me', function (response: any) {
        //   console.log(`🚀🚀🚀 ~ file: FacebookLoginButton.tsx:13 ~ response:`, response.name);
        // });
      } else {
        console.log('User cancelled login or did not fully authorize.');
        alertError('Người dùng đã hủy đăng nhập hoặc không ủy quyền đầy đủ.');
      }
    });
  };

  return (
    <LoadingButton
      variant='outlined'
      startIcon={<img height={'25px'} width={'25px'} src={Facebook} alt='Facebook' />}
      loadingIndicator='Loading...'
      fullWidth
      color='primary'
      size='large'
      onClick={handleLogin}
    >
      {'Facebook'}
    </LoadingButton>
  );
};
