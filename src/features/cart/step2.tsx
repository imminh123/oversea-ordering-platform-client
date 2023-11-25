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
  TextField,
  Typography,
  styled,
} from '@mui/material';
import { FormAddressInput } from 'app/components/FormAddressInput';
import { FormInputText } from 'app/components/libs/react-hooks-form/FormInputText';
import { chooseAddessValidator } from 'app/utils/validators';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { AddressRes, useListAddress } from './api/useGetAddressListing';
import { TotalCart } from './components/TotalCart';
import { Edit, Delete } from '@mui/icons-material';
import useConfirmAlert from 'app/hooks/useConfirmAlert';
import { useDeleteAddress } from './api/useDeleteAddress';
import { IAddAddressParams, useAddAddress } from './api/useAddAddress';
import { ICreateOrderParams, useCreateOrder } from './api/useCreateOrderAndPay';

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

const Label = ({ add }: { add: AddressRes }) => {
  return (
    <Box>
      <p>{`${add.name || 'Chưa có thông tin'} - ${add.phone || 'Chưa có thông tin'}`}</p>
      <p>{`${add.address}, ${add.ward}, ${add.city}, ${add.province}`}</p>
    </Box>
  );
};

export const Step2 = () => {
  const { data: listAddress, isLoading: loadingAddress } = useListAddress();
  const { confirm } = useConfirmAlert();
  const [addressId, setAddressId] = useState('');
  const [wareHouseAddress, setWareHouseAddress] = useState('');
  const { mutateAsync: deleteAddress } = useDeleteAddress();
  const { mutateAsync: addAddress } = useAddAddress();
  const { mutateAsync: createOrder } = useCreateOrder();

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAddressId((event.target as HTMLInputElement).value);
  };
  const [location, setLocation] = useState<{ province?: string; district?: string; ward?: string }>({
    province: '',
    district: '',
    ward: '',
  });

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
    const { province, district, ward } = location;
    const body: IAddAddressParams = {
      ...data,
      province: province || data?.province,
      city: district || data?.city,
      ward: ward || data?.ward,
    };
    addAddress(body);
  };

  const { handleSubmit, control } = useForm<IAddAddressParams>({
    defaultValues: {
      name: '',
      phone: '',
      mail: '',
      note: '',
      address: '',
      province: location.province,
      city: location.district,
      ward: location.ward,
    },
    resolver: yupResolver(chooseAddessValidator),
  });

  const handleOrder = (ids: string[]) => {
    const body: ICreateOrderParams = {
      listItemId: ids,
      addressId,
      wareHouseAddress,
    };
    createOrder(body);
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
    <Grid container spacing={2}>
      <Grid item md={12} lg={6}>
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
              <CardContent>
                <FormControlLabel value='' control={<Radio />} label='Chọn địa chỉ nhận hàng' />
                {!addressId && (
                  <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
                    <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                      <Box flex={1}>
                        <FormInputText name='name' control={control} label='Nguyễn Văn A' />
                      </Box>
                      <Box flex={1}>
                        <FormInputText name='phone' control={control} label='0987654321' />
                      </Box>
                    </Box>
                    <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                      <Box flex={1}>
                        <FormInputText name='address' control={control} label='Số 1, ngõ 2, ngách 3...' />
                      </Box>
                      <Box flex={1}>
                        <FormInputText name='mail' control={control} label='abc@gmail.com' />
                      </Box>
                    </Box>
                    <FormAddressInput
                      defaultVal={{}}
                      onChangeAdress={(data: any) => {
                        setLocation(data);
                      }}
                    />
                    <FormInputText name='note' control={control} label='Ví dụ: Chuyển ngoài giờ hành chính...' />
                  </Box>
                )}
              </CardContent>
              {!addressId && (
                <CardActions>
                  <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                    <Button
                      onClick={handleSubmit(onSubmit, (err) => {
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
        <Box className='w-full mt-4'>
          <TextField
            label={'Chọn kho hàng'}
            className='w-full'
            value={wareHouseAddress}
            onChange={(e) => {
              setWareHouseAddress(e.target.value);
            }}
          />
        </Box>
      </Grid>
      <Grid item md={12} lg={6}>
        <TotalCart order={handleOrder} />
      </Grid>
    </Grid>
  );
};
