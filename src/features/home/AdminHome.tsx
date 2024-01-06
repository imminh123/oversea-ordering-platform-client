import {
  CssBaseline,
  Container,
  Box,
  Card,
  CardContent,
  Grid,
  TableContainer,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  CardHeader,
  Typography,
} from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import Spinner from 'app/layout/async/Spinner';
import { useAdminGetStat } from './api/useAdminGetStat';
import { AdminCard } from './components/AdminCard';
import { NoItemFound, LoadingCard } from 'app/components/Item';
import { IOrderDetailRes } from 'features/cart/api/useGetOrderDetail';
import { AdminOrderRow } from 'features/order/AdminOrders';
import { useIndexOrdersAdmin } from 'features/order/api/useOrderListingAdmin';

interface Props {}

export const AdminHome: React.FC<Props> = () => {
  const { data, isLoading } = useAdminGetStat();

  const { data: orderItems, isLoading: loadingCart } = useIndexOrdersAdmin({
    page: 1,
    perPage: 5,
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <CssBaseline />
      <Container className='mt-5'>
        <Grid container spacing={3}>
          {data?.data &&
            !isLoading &&
            Object.entries(data?.data).map((value, index) => (
              <Grid key={index} item xs={12} sm={6} lg={3}>
                <AdminCard type={value[0]} value={value[1]} />
              </Grid>
            ))}
        </Grid>
        {!!orderItems && !!orderItems?.data.length && !isLoading && (
          <Card sx={{ marginTop: '20px' }}>
            <CardHeader title={<Typography variant={'h6'}>Quản lý đơn hàng</Typography>} />
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }} aria-label='đơn hàng'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Sản phẩm</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align='right'>
                      Trạng thái
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} className='min-w-[150px]'>
                      Người nhận
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Tiền hàng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {orderItems?.data.map((row: IOrderDetailRes) => (
                    <AdminOrderRow key={row.id} item={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Card>
        )}
        {(!orderItems || !orderItems?.data.length) && !isLoading && <NoItemFound />}
        {(isLoading || loadingCart) && <LoadingCard />}
        {isLoading && (
          <Card variant='elevation'>
            <CardContent>
              <Box>
                <Spinner />
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </React.Fragment>
  );
};
