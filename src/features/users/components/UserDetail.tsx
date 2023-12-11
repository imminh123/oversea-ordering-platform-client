import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, Card, CardActions, CardContent, Container, CssBaseline, Typography } from '@mui/material';
import { AddressData } from 'app/components/form/AddressInput';
import {
  HooksFormInputTextField,
  HooksFormInputSingleDatePicker,
  HooksFormInputSingleSelect,
  HooksFormInputAddress,
} from 'app/components/libs/react-hooks-form';
import { updateProfileValidator } from 'app/utils/validators';
import { UpdateInfoDTO, useUpdateInfo } from 'features/personal-info/api/useUpdateInfo';
import { useEffect, useMemo } from 'react';
import { Helmet } from 'react-helmet-async';
import { FormProvider, useForm } from 'react-hook-form';
import { useAdminGetUerDetail } from '../apis/useAdminGetInfo';
import { useParams } from 'react-router-dom';
import { UserRole } from 'app/types/user';

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

const statusOptions = [
  {
    value: 'true',
    label: 'Đang hoạt động',
  },
  {
    value: 'false',
    label: 'Ngưng hoạt động',
  },
];

export const UserDetail = () => {
  const param: { id: string } = useParams();
  const { data, isLoading } = useAdminGetUerDetail(param.id);
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

  const onSubmit = async (_data: IFormInput) => {
    alert('waiting endpoit');
  };

  return (
    <>
      <Helmet>
        <title>Quản lý người dùng</title>
      </Helmet>
      <CssBaseline />
      {!!data && !isLoading && (
        <FormProvider {...formMethods}>
          <Container maxWidth='md'>
            <Card sx={{ minWidth: 275 }} className=' mt-10'>
              <CardContent>
                <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <Typography variant={'h4'} sx={{ gridColumn: 'span 2' }}>
                    Thông tin tài khoản
                  </Typography>
                  <HooksFormInputTextField size={'small'} fieldName={'fullname'} label={'Họ và tên'} />
                  <HooksFormInputSingleDatePicker fieldName={'birthday'} label={'Ngày sinh'} />
                  <HooksFormInputTextField size={'small'} fieldName={'phone'} label={'Sđt'} />
                  <HooksFormInputSingleSelect
                    size={'small'}
                    fieldName={'gender'}
                    options={genderOptions}
                    label={'Giới tính'}
                  />
                  <HooksFormInputTextField size={'small'} fieldName={'mail'} label={'Mail'} />
                  <HooksFormInputSingleSelect
                    size={'small'}
                    fieldName={'isActive'}
                    options={statusOptions}
                    label={'Trạng thái tài khoản'}
                  />
                  <HooksFormInputTextField size={'small'} fieldName={'address'} label={'Địa chỉ'} />
                  <HooksFormInputTextField size={'small'} fieldName={'role'} label={'Vai trò'} />
                  <HooksFormInputAddress
                    fieldName={'addressObjectData'}
                    size={'small'}
                    sx={{ gridColumn: 'span 2' }}
                    spacing={'10px'}
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                  <Button
                    onClick={formMethods.handleSubmit(onSubmit, (err) => {
                      console.log(err);
                    })}
                    variant={'contained'}
                    disabled={isUpdating}
                  >
                    Lưu
                  </Button>
                  <Button onClick={() => history.back()} variant={'outlined'}>
                    Quay lại
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Container>
        </FormProvider>
      )}
    </>
  );
};
