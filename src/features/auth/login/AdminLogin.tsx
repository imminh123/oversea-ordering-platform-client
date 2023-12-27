import * as React from 'react';
import { Box, Stack, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { Helmet } from 'react-helmet-async';
import { TLoginArgs } from 'app/api/authAPI';
import { adminLoginValidator } from 'app/utils/validators';
import useAuth from 'app/hooks/useAuth';
import { HooksFormInputTextField } from 'app/components/libs/react-hooks-form';
import { envConfig } from 'configs/env.config';
import { sendTokenToChromeExtension } from 'app/utils/helper';
import storage from 'app/utils/storage';

interface Props {}

export const AdminLoginPage: React.FC<Props> = () => {
  const [loading, setLoading] = React.useState<boolean>(false);
  const formMethods = useForm<TLoginArgs>({
    mode: 'onChange',
    defaultValues: { userName: '', password: '' },
    resolver: yupResolver(adminLoginValidator),
  });
  const { handleLoginAdmin } = useAuth();

  const onSubmit = async (data: TLoginArgs) => {
    setLoading(true);

    try {
      await handleLoginAdmin(data.userName, data.password);
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
            <Typography variant='h4'>Đăng nhập Admin</Typography>
          </Stack>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <HooksFormInputTextField name='email' fieldName={'userName'} label={'Email'} />
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
              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </>
  );
};
