import { CssBaseline, Container, Box, Card, CardContent, Button, CardActions, Grid, Typography } from '@mui/material';
import { ApexOptions } from 'apexcharts';
import React, { useEffect, useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { Helmet } from 'react-helmet-async';
import { useGetStat } from './api/useGetStat';
import Spinner from 'app/layout/async/Spinner';
import { useHistory } from 'react-router-dom';

interface Props {}
interface DashboardStat {
  series: { data: number[] }[];
}

export const HomePage: React.FC<Props> = () => {
  const history = useHistory();
  const { data, isLoading } = useGetStat();
  return (
    <React.Fragment>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <CssBaseline />
      <Container className='mt-5'>
        {data?.data && !isLoading && (
          <Grid container spacing={2} marginTop={'20px'}>
            <Grid item xs={6}>
              <Card sx={{ color: '#ffffff', backgroundColor: '#00c0ef' }}>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Giỏ hàng
                  </Typography>
                  <Typography variant='body2' color='#fff'>
                    Số sản phẩm trong giỏ: <span className='font-semibold text-xl'>{data.data.lenCart}</span>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    sx={{ color: '#fff' }}
                    size='small'
                    onClick={() => {
                      history.push('/cart');
                    }}
                  >
                    Chi tiết
                  </Button>
                </CardActions>
              </Card>
            </Grid>
            <Grid item xs={6}>
              <Card sx={{ color: '#ffffff', backgroundColor: '#f39c12' }}>
                <CardContent>
                  <Typography gutterBottom variant='h5' component='div'>
                    Đơn hàng
                  </Typography>
                  <Typography variant='body2' color='#fff'>
                    Tổng số đơn hàng: <span className='font-semibold text-xl'>{data.data.lenOrder}</span>
                  </Typography>
                  <Typography variant='body2' color='#fff'>
                    Đơn mới:
                    <span className='font-semibold text-xl'>{data.data.countCreated}</span>
                  </Typography>
                  <Typography variant='body2' color='#fff'>
                    Đơn chờ thanh toán: <span className='font-semibold text-xl'>{data.data.countPendingPayment}</span>
                  </Typography>
                  <Typography variant='body2' color='#fff'>
                    Đơn đã thanh toán: <span className='font-semibold text-xl'>{data.data.countDelivered}</span>
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    sx={{ color: '#fff' }}
                    size='small'
                    onClick={() => {
                      history.push('/orders');
                    }}
                  >
                    Chi tiết
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          </Grid>
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
      </Container>
    </React.Fragment>
  );
};
