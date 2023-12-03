import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, CssBaseline, Box, Typography, Card, CardContent, CardActions } from '@mui/material';
import { FormAddressInput } from 'app/components/FormAddressInput';
import { FormInputDate } from 'app/components/libs/react-hooks-form/FormInputDate';
import { FormInputDropdown } from 'app/components/libs/react-hooks-form/FormInputDropdown';
import { FormInputText } from 'app/components/libs/react-hooks-form/FormInputText';
import { updateProfileValidator } from 'app/utils/validators';
import React, { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useGetInfo } from './api/useGetInfo';
import { UpdateInfoDTO, useUpdateInfo } from './api/useUpdateInfo';
import { Helmet } from 'react-helmet-async';

interface IFormInput {
  fullname: string;
  gender?: string;
  birthday?: any;
  phone: string;
  address: string;
  province?: string;
  city?: string;
  ward?: string;
}

const genderOptions = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

export const PersonalInfo = () => {
  const { data, isLoading } = useGetInfo();
  const { mutateAsync: updateUserInfo, isLoading: isUpdating } = useUpdateInfo();
  const [location, setLocation] = useState<{ province?: string; district?: string; ward?: string }>({
    province: '',
    district: '',
    ward: '',
  });

  const defaultValues = useMemo(() => {
    return {
      fullname: data?.fullname || '',
      phone: data?.phone || '',
      gender: data?.gender || '',
      birthday: data?.birthday ? new Date(data?.birthday) : undefined,
      address: data?.address || '',
      province: data?.province || location.province,
      city: data?.city || location.district,
      ward: data?.ward || location.ward,
    };
  }, [data]);

  const { handleSubmit, reset, control } = useForm<IFormInput>({
    defaultValues,
    resolver: yupResolver(updateProfileValidator),
  });

  useEffect(() => {
    !!data &&
      reset({
        ...data,
        province: location.province || data?.province,
        city: location.district || data?.city,
        ward: location.ward || data?.ward,
      });
  }, [data, location]);

  const onSubmit = (data: IFormInput) => {
    const { province, district, ward } = location;
    const body: UpdateInfoDTO = {
      ...data,
      province: province || data?.province,
      city: district || data?.city,
      ward: ward || data?.ward,
    };
    updateUserInfo({ body });
  };

  return (
    <React.Fragment>
      <Helmet>
        <title>Thông tin</title>
      </Helmet>
      {!!data && !isLoading && (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth='md'>
            <Card sx={{ minWidth: 275 }} className=' mt-10'>
              <CardContent>
                <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                  <Typography variant='h4'>Chỉnh sửa thông tin tài khoản</Typography>
                  <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                    <Box flex={1}>
                      <FormInputText name='fullname' control={control} label='Họ và tên' />
                    </Box>
                    <Box flex={1}>
                      <FormInputDate name='birthday' control={control} label='Ngày sinh' />
                    </Box>
                  </Box>
                  <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                    <Box flex={1}>
                      <FormInputText name='phone' control={control} label='Sđt' />
                    </Box>
                    <Box flex={1}>
                      <FormInputDropdown name='gender' control={control} label='Giới tính' options={genderOptions} />
                    </Box>
                  </Box>
                  <FormInputText name='address' control={control} label='Địa chỉ' />
                  <FormAddressInput
                    defaultVal={{ province: data?.province, district: data?.city, ward: data?.ward }}
                    onChangeAdress={(data: any) => {
                      setLocation(data);
                    }}
                  />
                </Box>
              </CardContent>
              <CardActions>
                <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                  <Button
                    onClick={handleSubmit(onSubmit, (err) => {
                      console.log(err);
                    })}
                    variant={'contained'}
                    disabled={isUpdating}
                  >
                    Lưu
                  </Button>
                  <Button onClick={() => reset()} variant={'outlined'}>
                    Hủy
                  </Button>
                </Box>
              </CardActions>
            </Card>
          </Container>
        </React.Fragment>
      )}
    </React.Fragment>
  );
};
