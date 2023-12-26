import * as React from 'react';
import { Box, Link, Stack, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Helmet } from 'react-helmet-async';
import { FormProvider, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { signupValidator } from 'app/utils/validators';
import { HooksFormInputTextField } from 'app/components/libs/react-hooks-form';
import { SignUpDto, TSignUpDto, useSignUp } from './api/useSignUp';
import { RoutePathsEnum } from 'configs/route.config';

interface Props {}
export const SignupPage: React.FC<Props> = () => {
  const { mutateAsync: signup, isLoading } = useSignUp();

  const formMethods = useForm<TSignUpDto>({
    mode: 'onChange',
    defaultValues: { mail: '', password: '', confirmPassword: '', wareHouseAddress: '' },
    resolver: yupResolver(signupValidator),
  });

  const onSubmit = async (data: TSignUpDto) => {
    try {
      const body: SignUpDto = { ...data };
      signup({ body });
    } catch (err) {
      console.log({ err });
    }
  };

  return (
    <>
      <Helmet>
        <title>Đăng kí</title>
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
            <Typography variant='h4'>Đăng ký</Typography>
            <Typography color='text.secondary' variant='body2'>
              Bạn đã có tài khoản? &nbsp;
              <Link href={RoutePathsEnum.LoginPage} color={'success'} underline='hover' variant='subtitle2'>
                Đăng nhập
              </Link>
            </Typography>
          </Stack>
          <FormProvider {...formMethods}>
            <form onSubmit={formMethods.handleSubmit(onSubmit)}>
              <Stack spacing={2}>
                <HooksFormInputTextField name='email' fieldName={'mail'} label={'Email'} />
                <HooksFormInputTextField name='phone_number' fieldName={'phone'} label={'Số điện thoại'} />
                <HooksFormInputTextField name='password' fieldName={'password'} label={'Mật khẩu'} type={'password'} />
                <HooksFormInputTextField fieldName={'confirmPassword'} label={'Nhập lại mật khẩu'} type={'password'} />
                <HooksFormInputTextField fieldName={'wareHouseAddress'} label={'Kho nhận hàng'} />
                <LoadingButton
                  variant='contained'
                  loadingIndicator='Đang chờ...'
                  fullWidth
                  color='success'
                  size='large'
                  type='submit'
                  loading={isLoading}
                >
                  ĐĂNG KÝ
                </LoadingButton>
              </Stack>
            </form>
          </FormProvider>
        </Box>
      </Box>
    </>
  );
};
