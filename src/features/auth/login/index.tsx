import * as React from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';
import { TLoginArgs } from 'app/api/authAPI';
import { loginValidator } from 'app/utils/validators';
import useAuth from 'app/hooks/useAuth';
import { HooksFormInputTextField } from 'app/components/libs/react-hooks-form';
import Google from '../../../assets/images/google.svg';
import { useGoogleLogin } from '@react-oauth/google';
import { RoutePathsEnum } from 'configs/route.config';
import { FacebookLoginButton } from './FacebookLoginButton';
import { envConfig } from 'configs/env.config';
import { sendTokenToChromeExtension } from 'app/utils/helper';
import storage from 'app/utils/storage';

interface Props {}

export const LoginPage: React.FC<Props> = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const formMethods = useForm<TLoginArgs>({
    mode: 'onChange',
    defaultValues: { userName: '', password: '' },
    resolver: yupResolver(loginValidator),
  });
  const { login, handleLoginSocial } = useAuth();
  const loginWithGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      handleLoginSocial({ token: tokenResponse.code, base: 'google' });
    },
    flow: 'auth-code',
    scope: 'https://www.googleapis.com/auth/cloud-platform',
  });
  const handleFacebookLogin = (accessToken: string) => {
    handleLoginSocial({ token: accessToken, base: 'facebook' });
  };

  const onSubmit = async (data: TLoginArgs) => {
    setLoading(true);

    try {
      await login(data.userName, data.password);
    } catch (err) {
      console.log({ err });
    }
    setLoading(false);

    const token = storage.getAccessTokenClient();
    sendTokenToChromeExtension({ extensionId: envConfig.VITE_EXTENSION_KEY, jwt: token });
  };

  return (
    <>
      <Helmet>
        <title>Đăng nhập</title>
      </Helmet>
      <Box
        sx={{
          width: '100%',
        }}
      >
        <Box
          sx={{
            m: 'auto',
            maxWidth: 550,
            px: 3,
            py: '150px',
            width: '100%',
          }}
        >
          <Stack spacing={1} sx={{ mb: 3 }}>
            <Typography variant='h4'>Đăng nhập</Typography>
            <Typography color='text.secondary' variant='body2'>
              Bạn chưa có tài khoản? &nbsp;
              <Link href={RoutePathsEnum.SignupPage} color={'success'} underline='hover' variant='subtitle2'>
                Đăng ký
              </Link>
            </Typography>
          </Stack>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <HooksFormInputTextField type='email' name='email' fieldName={'userName'} label={'Email'} />
                <HooksFormInputTextField name='password' fieldName={'password'} label={'Mật khẩu'} type={'password'} />
                <LoadingButton
                  variant='contained'
                  loadingIndicator='Đang chờ...'
                  fullWidth
                  color='success'
                  size='large'
                  type='submit'
                  loading={loading}
                >
                  ĐĂNG NHẬP
                </LoadingButton>
                <Typography variant='subtitle2' align='center' className=' text-slate-500'>
                  Hoặc
                </Typography>

                <Box className='flex justify-between gap-2'>
                  <LoadingButton
                    variant='outlined'
                    startIcon={<img src={Google} alt='Google' />}
                    loadingIndicator='Đang chờ...'
                    color='success'
                    size='large'
                    fullWidth
                    onClick={loginWithGoogle}
                  >
                    <span className='text-slate-600'>Google</span>
                  </LoadingButton>
                  <FacebookLoginButton onLogin={handleFacebookLogin} />
                </Box>
              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </>
  );
};
