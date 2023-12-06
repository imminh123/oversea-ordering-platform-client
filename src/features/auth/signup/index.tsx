import * as React from 'react';
import { Box, Button, Stack, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { Helmet } from 'react-helmet-async';
import { FormProvider, useForm } from 'react-hook-form';
import { LoadingButton } from '@mui/lab';
import { signupValidator } from 'app/utils/validators';
import { HooksFormInputTextField } from 'app/components/libs/react-hooks-form';
import { SignUpDto, TSignUpDto, useSignUp } from './api/useSignUp';
import { useHistory } from 'react-router-dom';
import { RoutePathsEnum } from 'configs/route.config';

interface Props {}
export const SignupPage: React.FC<Props> = () => {
  const { mutateAsync: signup, isLoading } = useSignUp();
  const history = useHistory();

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
            maxWidth: 500,
            m: 'auto',
            px: 2,
            py: 4,
            mt: 10,
            boxShadow: (theme) => theme.shadows[3],
          }}
        >
          <Typography variant='h5' color='primary' sx={{ mb: 4 }} align='center'>
            ĐĂNG KÝ TÀI KHOẢN
          </Typography>
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
                  loadingIndicator='Loading...'
                  fullWidth
                  color='primary'
                  size='large'
                  type='submit'
                  loading={isLoading}
                >
                  ĐĂNG KÝ
                </LoadingButton>
              </Stack>
            </form>
          </FormProvider>
          <Box display={'flex'} justifyContent={'center'} className='mt-5'>
            <Button
              variant='text'
              onClick={() => {
                history.push(RoutePathsEnum.LoginPage);
              }}
            >
              Đăng nhập
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};
