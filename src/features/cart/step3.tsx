import { Assignment, CheckCircleOutline, LocalShipping, Payments, Pending } from '@mui/icons-material';
import { Card, CardActionArea, CardContent, Typography, Box, Button } from '@mui/material';
import queryString from 'query-string';
import { useLocation } from 'react-router-dom';
import { OrderStatus, useGetOrderStatus } from './api/useGetOrderDetail';
import moment from 'moment';
import { formatMoneyToVND } from 'app/utils/helper';
import { usePayOrder } from './api/usePay';
import { Helmet } from 'react-helmet-async';
import { useEffect } from 'react';

export const Step3 = () => {
  const { search } = useLocation();
  const values = queryString.parse(search);
  const id: string = values.id && typeof values.id === 'string' ? values.id : '';
  const { data, isLoading } = useGetOrderStatus(id);
  const { mutateAsync: pay } = usePayOrder();
  const handlePay = () => {
    pay({ referenceId: id });
  };

  const statusMapping = (status: OrderStatus | undefined) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return 'Đã vận chuyển';
      case OrderStatus.PENDING_PAYMENT:
        return 'Đang chờ thanh toán...';
      case OrderStatus.SUCCEEDED:
        return 'Thanh toán thành công';
      default:
        return 'Đã tạo đơn hàng';
    }
  };

  const checkDisable = (status: OrderStatus | undefined) => {
    if (!status) {
      return false;
    }
    return !![OrderStatus.DELIVERED, OrderStatus.PENDING_PAYMENT, OrderStatus.SUCCEEDED].includes(status);
  };

  const iconMapping = (status: OrderStatus | undefined) => {
    switch (status) {
      case OrderStatus.DELIVERED:
        return <LocalShipping color='success' sx={{ height: '160px', width: '160px' }} />;
      case OrderStatus.PENDING_PAYMENT:
        return <Pending color='warning' sx={{ height: '160px', width: '160px' }} />;
      case OrderStatus.SUCCEEDED:
        return <CheckCircleOutline color='success' sx={{ height: '160px', width: '160px' }} />;
      default:
        return <Assignment color='primary' sx={{ height: '160px', width: '160px' }} />;
    }
  };
  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <Box display={'flex'} justifyContent={'center'}>
        <Card className='w-full'>
          <CardActionArea>
            <Typography gutterBottom variant='h4' align='center' component='div' sx={{ marginTop: '10px' }}>
              Thanh toán đơn hàng
            </Typography>
            <Box display={'flex'} justifyContent={'center'}>
              {iconMapping(data?.status)}
            </Box>
            <CardContent>
              <Typography gutterBottom variant='h5' align='center' component='div'>
                {statusMapping(data?.status)}
              </Typography>
              <ul className='text-center'>
                <li>Giá trị đơn hàng: {formatMoneyToVND(data?.total || 0)}</li>
                <li>Thời gian tạo: {moment(data?.createdAt).format('h:mm:ss - DD/MM/YYYY')}</li>
                <li>Mã giao dịch: {data?.id}</li>
              </ul>
              <Box display={'flex'} justifyContent={'center'} className='mt-5'>
                <Button
                  disabled={checkDisable(data?.status)}
                  variant='outlined'
                  startIcon={<Payments />}
                  onClick={handlePay}
                >
                  Thanh toán
                </Button>
              </Box>
            </CardContent>
          </CardActionArea>
        </Card>
      </Box>
    </>
  );
};
