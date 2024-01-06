import {
  CssBaseline,
  Container,
  Box,
  Card,
  CardContent,
  Grid,
  Typography,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useGetStat } from './api/useGetStat';
import Spinner from 'app/layout/async/Spinner';
import { IOrderDetailRes } from 'features/cart/api/useGetOrderDetail';
import { ClientOrderRow } from 'features/order';
import { useIndexOrders } from 'features/order/api/useOrderListing';
import { ClientCard } from './components/ClientCard';
import { ListNotifications } from './components/ListNotifications';

interface Props {}

export const HomePage: React.FC<Props> = () => {
  const { data, isLoading } = useGetStat();
  const { data: orderItems, isLoading: loadingOrders } = useIndexOrders({
    page: 1,
    perPage: 5,
  });

  return (
    <React.Fragment>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <CssBaseline />
      <Container className='my-5'>
        <Grid container spacing={3}>
          {data?.data &&
            !isLoading &&
            Object.entries(data?.data).map((value, index) => (
              <Grid key={index} item xs={12} sm={6} lg={4}>
                <ClientCard type={value[0]} value={value[1]} />
              </Grid>
            ))}
        </Grid>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} lg={4}>
            <ListNotifications />
          </Grid>
          <Grid item xs={12} sm={6} lg={8}>
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
                        <ClientOrderRow key={row.id} item={row} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Card>
            )}
          </Grid>
        </Grid>

        {(isLoading || loadingOrders) && (
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
