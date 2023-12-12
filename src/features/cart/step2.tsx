import { yupResolver } from '@hookform/resolvers/yup';
import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  FormControlLabel,
  Grid,
  IconButton,
  Paper,
  Radio,
  RadioGroup,
  Typography,
  styled,
} from '@mui/material';
import { chooseAddessValidator } from 'app/utils/validators';
import { useEffect, useRef, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { AddressRes, useListAddress } from './api/useGetAddressListing';
import { TotalCart } from './components/TotalCart';
import { Edit, Delete } from '@mui/icons-material';
import useConfirmAlert from 'app/hooks/useConfirmAlert';
import { useDeleteAddress } from './api/useDeleteAddress';
import { IAddAddressParams, useAddAddress } from './api/useAddAddress';
import { ICreateOrderParams } from './api/useCreateOrderAndPay';
import useAlert from 'app/hooks/useAlert';
import { useCreateOrder } from './api/useCreateOrder';
import { Helmet } from 'react-helmet-async';
import { HooksFormInputAddress, HooksFormInputTextField } from 'app/components/libs/react-hooks-form';
import { AddressData } from 'app/components/form/AddressInput';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  display: 'flex',
  justifyContent: 'space-between',
  textAlign: 'left',
  padding: '10px',
  color: theme.palette.text.secondary,
  marginBottom: '10px',
  '&:hover': {
    background: '#f2f2f2',
  },
}));

interface IFormInput {
  name: string;
  phone: string;
  mail: string;
  note?: string;
  address: string;
  addressObjectData?: AddressData;
}

const Label = ({ add }: { add: AddressRes }) => {
  return (
    <Box>
      <p className=' font-bold text-sm sm:text-xs'>{`${add.name || 'Chưa có thông tin'} - ${
        add.phone || 'Chưa có thông tin'
      }`}</p>
      <p className='text-sm sm:text-xs'>{`${add.address}, ${add.ward}, ${add.city}, ${add.province}`}</p>
    </Box>
  );
};

export const Step2 = () => {
  const { data: listAddress, isLoading: loadingAddress } = useListAddress();
  const { confirm } = useConfirmAlert();
  const { alertError } = useAlert();

  const [addressId, setAddressId] = useState('');
  const { mutateAsync: deleteAddress } = useDeleteAddress();
  const { mutateAsync: addAddress } = useAddAddress();
  const { mutateAsync: createOrder } = useCreateOrder();
  const chooseAdress = useRef<any>();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressId((event.target as HTMLInputElement).value);
  };

  const handleDeleteAddress = (id: string) => {
    confirm({
      onConfirm: () => {
        deleteAddress(id);
      },
      options: {
        title: 'Bạn có chắc muốn xóa địa chỉ này?',
        confirmationText: 'Có',
        cancellationText: 'Hủy',
        description: 'Khi xác nhận sẽ không thể hoàn tác',
      },
    });
  };

  const onSubmit = (data: any) => {
    const body: IAddAddressParams = {
      ...data,
      province: data?.addressObjectData?.province,
      city: data?.addressObjectData?.district,
      ward: data?.addressObjectData?.ward,
    };
    addAddress(body);
  };

  const formMethods = useForm<IFormInput>({
    defaultValues: {
      name: '',
      phone: '',
      mail: '',
      note: '',
      address: '',
      addressObjectData: {
        province: '',
        district: '',
        ward: '',
      },
    },
    resolver: yupResolver(chooseAddessValidator),
  });

  const handleOrder = (ids: string[]) => {
    const body: ICreateOrderParams = {
      listItemId: ids,
      addressId,
    };
    if (!addressId) {
      chooseAdress.current?.focus();
      alertError('Vui lòng thêm địa chỉ nhận hàng');
    } else if (!ids.length) {
      alertError('Vui lòng chọn ít nhất một sản phẩm');
    } else {
      createOrder(body);
    }
  };

  useEffect(() => {
    if (listAddress?.data) {
      const defaultAddressId =
        listAddress?.data.find((e) => {
          if (e.isDefault) {
            return e.id;
          }
        })?.id || '';
      setAddressId(defaultAddressId);
    }
  }, [listAddress?.data]);

  return (
    <>
      <Helmet>
        <title>Đặt hàng</title>
      </Helmet>
      <Grid container spacing={2}>
        <Grid item md={12} lg={6} width={'100%'}>
          <Typography variant='h6'>Chọn địa chỉ nhận hàng</Typography>
          {listAddress && listAddress.data && !loadingAddress && (
            <RadioGroup
              aria-labelledby='pick-order-address'
              value={addressId}
              onChange={handleRadioChange}
              name='pick-address'
            >
              {listAddress.data.map((add: AddressRes) => {
                return (
                  <Item key={add.id}>
                    <FormControlLabel value={add.id} control={<Radio />} label={<Label add={add} />} />
                    <Box>
                      <IconButton title='Sửa địa chỉ' color='primary' aria-label='delete'>
                        <Edit color='primary' />
                      </IconButton>
                      <IconButton
                        title='Xóa địa chỉ'
                        color='error'
                        aria-label='delete'
                        onClick={() => handleDeleteAddress(add.id)}
                      >
                        <Delete color='error' />
                      </IconButton>
                    </Box>
                  </Item>
                );
              })}
              <Card
                sx={{
                  minWidth: 275,
                  '&:hover': {
                    background: '#f2f2f2',
                  },
                }}
              >
                <FormProvider {...formMethods}>
                  <CardContent>
                    <FormControlLabel
                      value=''
                      control={<Radio ref={chooseAdress} />}
                      label={<div className='text-sm sm:text-xs'>Chọn địa chỉ nhận hàng</div>}
                    />
                    {!addressId && (
                      <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                        <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                          <Box flex={1}>
                            <HooksFormInputTextField fullWidth size={'small'} fieldName={'name'} label={'Họ và tên'} />
                          </Box>
                          <Box flex={1}>
                            <HooksFormInputTextField fullWidth size={'small'} fieldName={'phone'} label={'Sđt'} />
                          </Box>
                        </Box>
                        <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                          <Box flex={1}>
                            <HooksFormInputTextField fullWidth size={'small'} fieldName={'address'} label={'Địa chỉ'} />
                          </Box>
                          <Box flex={1}>
                            <HooksFormInputTextField fullWidth size={'small'} fieldName={'mail'} label={'Email'} />
                          </Box>
                        </Box>
                        <HooksFormInputAddress
                          fieldName={'addressObjectData'}
                          size={'small'}
                          sx={{ gridColumn: 'span 2' }}
                          spacing={'10px'}
                        />
                        <HooksFormInputTextField size={'small'} fieldName={'note'} label={'Ghi chú'} />
                      </Box>
                    )}
                  </CardContent>
                </FormProvider>
                {!addressId && (
                  <CardActions>
                    <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                      <Button
                        onClick={formMethods.handleSubmit(onSubmit, (err) => {
                          console.log(err);
                        })}
                        variant={'contained'}
                      >
                        Thêm địa chỉ
                      </Button>
                    </Box>
                  </CardActions>
                )}
              </Card>
            </RadioGroup>
          )}
        </Grid>
        <Grid item md={12} lg={6} width={'100%'}>
          <TotalCart order={handleOrder} />
        </Grid>
      </Grid>
    </>
  );
};
