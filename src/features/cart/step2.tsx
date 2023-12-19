import { Box, Card, CardContent, Paper, Typography, styled } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { AddressRes, useListAddress } from './api/useGetAddressListing';
import { TotalCart } from './components/TotalCart';
import { ICreateOrderParams } from './api/useCreateOrderAndPay';
import useAlert from 'app/hooks/useAlert';
import { useCreateOrder } from './api/useCreateOrder';
import { Helmet } from 'react-helmet-async';
import { SelectAddressModal } from './components/SelectAddressModal';
import { LocationOn } from '@mui/icons-material';

const Label = ({ add }: { add: AddressRes }) => {
  return (
    <>
      {add && (
        <Box>
          <p className=' font-bold text-sm sm:text-xs'>{`${add.name || 'Chưa có thông tin'} - ${
            add.phone || 'Chưa có thông tin'
          } (Mặc định)`}</p>
          <p className='text-sm sm:text-xs'>{`${add.address}, ${add.ward}, ${add.city}, ${add.province}`}</p>
        </Box>
      )}
    </>
  );
};

export const Step2 = () => {
  const { data: listAddress, isLoading: loadingAddress } = useListAddress();
  const { alertError } = useAlert();

  const [addressId, setAddressId] = useState('');
  const { mutateAsync: createOrder } = useCreateOrder();
  const chooseAdress = useRef<any>();
  const onChangeAddress = (e: string) => {
    setAddressId(e);
  };

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
      <Card
        sx={{
          minWidth: 275,
          '&:hover': {
            background: '#fff',
          },
          marginBottom: '10px',
        }}
      >
        <CardContent>
          <Typography variant='h6'>
            Chọn địa chỉ nhận hàng <LocationOn />
          </Typography>
          {listAddress && listAddress.data && !loadingAddress && (
            <Box className='flex justify-between'>
              <Label
                add={
                  listAddress.data.find((add) => add.id === addressId) ||
                  listAddress.data.find((add) => add.isDefault) ||
                  listAddress.data[0]
                }
              />
              <SelectAddressModal addressList={listAddress.data} setId={onChangeAddress} />
            </Box>
          )}
        </CardContent>
      </Card>
      <TotalCart order={handleOrder} />
    </>
  );
};
