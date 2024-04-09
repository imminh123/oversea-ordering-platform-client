import { Card, CardActionArea, CardContent, Typography, Box, Button, CardMedia, Grid, Divider } from '@mui/material';
import queryString from 'query-string';
import { useHistory, useLocation } from 'react-router-dom';
import { formatMoneyToVND } from 'app/utils/helper';
import { Helmet } from 'react-helmet-async';
import { useGetQR } from './api/useGetQR';
import { HeaderPlaceHolder } from 'app/layout/header-placeholder';
import { CountdownTimer } from './components/Timer';

export const Step3 = () => {
  const { search } = useLocation();
  const history = useHistory();

  const values = queryString.parse(search);
  const id: string = values.id && typeof values.id === 'string' ? values.id : '';
  const amount: number = parseFloat((values.amount as any) || 0);
  const { data: QRData } = useGetQR({ amount, addInfo: `Thanh toan cho don hang ${id}` });
  // const { data, isLoading } = useGetOrderStatus(id);

  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <Box display={'flex'} justifyContent={'center'}>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <Box className='flex flex-col items-center justify-center'>
              <Typography sx={{ mb: 1 }}>Quét mã bằng ứng dụng ngân hàng/ Zalo/ ZaloPay</Typography>

              <Card sx={{ maxWidth: '500px' }}>
                <CardActionArea>
                  <CardMedia component='img' height={140} image={QRData?.data.qrDataURL} alt='QR' />
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className='flex flex-col items-center justify-center'>
              <Typography sx={{ mb: 1 }}>Thông tin đơn hàng</Typography>

              <Card sx={{ width: '500px' }}>
                <HeaderPlaceHolder bg='/mby-transparent.svg' />
                <CardContent>
                  <Box className='flex justify-between'>
                    <Typography>Số tiền thanh toán</Typography>
                    <Typography>{formatMoneyToVND(amount)}</Typography>
                  </Box>
                </CardContent>
                <Divider></Divider>
                <CardContent>
                  <Typography variant='body1'>Mã giao dịch:</Typography>
                  <Typography sx={{ mb: 1 }}>{id}</Typography>

                  <Typography variant='body1'>Nội dung:</Typography>
                  <Typography>Thanh toan cho don hang {id}</Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: '500px', backgroundColor: '#FEEC99', mt: 3 }}>
                <CardContent>
                  <Typography variant='body1'>Lưu ý:</Typography>
                  <Typography>
                    Trong vòng 1 tiếng kể từ khi chuyển tiền, MBY Logistic sẽ gửi email xác nhận trạng thái đơn hàng.
                    Mọi thông tin về đơn hàng có thể liên hệ qua hotline: 035 6511877 hoặc Zalo MBY Logistic
                  </Typography>
                </CardContent>
              </Card>
              <Card sx={{ width: '500px', mt: 3, backgroundColor: '#FBF1DC' }}>
                <CardContent>
                  <Typography variant='body1' sx={{ textAlign: 'center' }}>
                    Giao dịch hết hạn sau
                  </Typography>
                  <Box className='flex justify-center'>
                    <CountdownTimer />
                  </Box>
                  <Box className='flex justify-center mt-3'>
                    <Button
                      color='warning'
                      variant='contained'
                      onClick={() => {
                        history.push(`/orders/${id}`);
                      }}
                    >
                      Trở về đơn hàng
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};
