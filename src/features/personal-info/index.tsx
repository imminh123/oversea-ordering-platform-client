import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, CssBaseline, Box, Typography, Card, CardContent, CardActions } from '@mui/material';
import { updateProfileValidator } from 'app/utils/validators';
import React, { useEffect, useMemo } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useGetInfo } from './api/useGetInfo';
import { UpdateInfoDTO, useUpdateInfo } from './api/useUpdateInfo';
import { Helmet } from 'react-helmet-async';
import { AddressData } from 'app/components/form/AddressInput';
import {
  HooksFormInputAddress,
  HooksFormInputSingleDatePicker,
  HooksFormInputSingleSelect,
  HooksFormInputTextField,
} from 'app/components/libs/react-hooks-form';
import { UserRole } from 'app/types/user';
import { LoadingButton } from '@mui/lab';
import Spinner from 'app/layout/async/Spinner';

interface IFormInput {
  fullname: string;
  gender?: string;
  birthday?: any;
  phone: string;
  address: string;
  mail?: string;
  role?: UserRole;
  isActive?: string;
  addressObjectData?: AddressData;
}

const genderOptions = [
  {
    label: 'Nam',
    value: 'male',
  },
  {
    label: 'Nữ',
    value: 'female',
  },
  {
    label: 'Khác',
    value: 'other',
  },
];

export const PersonalInfo = () => {
  const { data, isLoading } = useGetInfo();
  const { mutateAsync: updateUserInfo, isLoading: isUpdating } = useUpdateInfo();

  const defaultValues = useMemo<IFormInput>(() => {
    return {
      fullname: data?.fullname || '',
      phone: data?.phone || '',
      gender: data?.gender || '',
      birthday: data?.birthday ? new Date(data?.birthday) : undefined,
      address: data?.address || '',
      mail: data?.mail || '',
      role: data?.role || UserRole.Client,
      isActive: data?.isActive.toString() || 'false',
      addressObjectData: {
        province: '',
        district: '',
        ward: '',
      },
    };
  }, [data]);

  const formMethods = useForm<IFormInput>({
    defaultValues,
    resolver: yupResolver(updateProfileValidator),
  });

  useEffect(() => {
    !!data &&
      formMethods.reset({
        ...data,
        isActive: data.isActive.toString(),
        addressObjectData: {
          province: data?.province || '',
          district: data?.city || '',
          ward: data?.ward || '',
        },
      });
  }, [data]);

  const onSubmit = async (data: IFormInput) => {
    const body: UpdateInfoDTO = {
      ...data,
      province: data?.addressObjectData?.province,
      city: data?.addressObjectData?.district,
      ward: data?.addressObjectData?.ward,
    };
    await updateUserInfo({ body });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Thông tin</title>
      </Helmet>
      {!!data && !isLoading && (
        <FormProvider {...formMethods}>
          <CssBaseline />
          <Container maxWidth='md'>
            <Card sx={{ minWidth: 275 }} className='mt-10'>
              <CardContent>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <Typography variant={'h6'} sx={{ gridColumn: 'span 2' }}>
                    Chỉnh sửa thông tin tài khoản
                  </Typography>
                  <HooksFormInputTextField fieldName={'fullname'} label={'Họ và tên'} />
                  <HooksFormInputSingleDatePicker fieldName={'birthday'} label={'Ngày sinh'} />
                  <HooksFormInputTextField fieldName={'phone'} label={'Sđt'} />
                  <HooksFormInputSingleSelect fieldName={'gender'} options={genderOptions} label={'Giới tính'} />
                  <HooksFormInputTextField fieldName={'mail'} label={'Mail'} />
                  <HooksFormInputTextField fieldName={'address'} label={'Địa chỉ'} />
                  <HooksFormInputAddress
                    fieldName={'addressObjectData'}
                    sx={{ gridColumn: 'span 2' }}
                    spacing={'10px'}
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                  <LoadingButton
                    loadingIndicator='Đang chờ...'
                    onClick={formMethods.handleSubmit(onSubmit, (err) => {
                      console.log(err);
                    })}
                    variant={'contained'}
                    loading={isUpdating}
                  >
                    Lưu
                  </LoadingButton>
                  <Button onClick={() => history.back()} variant={'outlined'}>
                    Quay lại
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Container>
        </FormProvider>
      )}
      {isLoading && (
        <Card variant='elevation'>
          <CardContent>
            <Box>
              <Spinner />
            </Box>
          </CardContent>
        </Card>
      )}
    </React.Fragment>
  );
};
