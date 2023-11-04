import * as React from 'react';

import { Box, Stack, Typography } from '@mui/material';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { LoadingButton } from '@mui/lab';

import { TLoginArgs } from 'app/api/authAPI';
import { LanguageTranslate } from 'app/languages';
import { loginValidator } from 'app/utils/validators';
import useAuth from 'app/hooks/useAuth';
import { HooksFormInputTextField } from 'app/components/libs/react-hooks-form';

interface Props {}

export const LoginPage: React.FC<Props> = () => {
  const { t } = useTranslation();
  const [loading, setLoading] = React.useState<boolean>(false);

  const formMethods = useForm<TLoginArgs>({
    mode: 'onChange',
    defaultValues: { username: '', password: '' },
    resolver: yupResolver(loginValidator),
  });
  const { login } = useAuth();

  const onSubmit = async (data: TLoginArgs) => {
    setLoading(true);

    try {
      await login(data.username, data.password);
    } catch (err) {
      console.log({ err });
    } finally {
      setLoading(false);
    }
  };

  return (
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
          {t(LanguageTranslate.form.login.title)}
        </Typography>
        <FormProvider {...formMethods}>
          <form onSubmit={formMethods.handleSubmit(onSubmit)}>
            <Stack spacing={2}>
              <HooksFormInputTextField fieldName={'username'} label={t(LanguageTranslate.form.login.label_username)} />
              <HooksFormInputTextField
                fieldName={'password'}
                label={t(LanguageTranslate.form.login.label_password)}
                type={'password'}
              />
              <LoadingButton
                variant='contained'
                loadingIndicator='Loading...'
                fullWidth
                color='primary'
                size='large'
                type='submit'
                loading={loading}
              >
                {t(LanguageTranslate.form.login.title)}
              </LoadingButton>
            </Stack>
          </form>
        </FormProvider>
      </Box>
    </Box>
  );
};
