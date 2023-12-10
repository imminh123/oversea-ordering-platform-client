import { Container, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';

export const AdminOrders = () => {
  return (
    <>
      <Helmet>
        <title>Đơn hàng</title>
      </Helmet>
      <Container className='mt-5'>
        <Typography variant={'h4'} sx={{ gridColumn: 'span 2' }}>
          Quản lý đơn hàng
        </Typography>
        <h1>Đang đợi api...</h1>
      </Container>
    </>
  );
};
