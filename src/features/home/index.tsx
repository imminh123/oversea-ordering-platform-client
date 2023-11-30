import { CssBaseline, Container, Grid, Card, Button, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';

interface Props {}

export const HomePage: React.FC<Props> = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <Helmet>
        <title>Trang chủ</title>
      </Helmet>
      <CssBaseline />
      <Container>
        <Grid container spacing={2} marginTop={'20px'}>
          <Grid item xs={6}>
            <Card sx={{ color: '#ffffff', backgroundColor: '#00c0ef' }}>
              <CardContent>
                <Typography gutterBottom variant='h5' component='div'>
                  Giỏ hàng
                </Typography>
                <Typography variant='body2' color='#fff'>
                  Vào giỏ hàng
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
                  Xem các đơn hàng của bạn
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
      </Container>
    </React.Fragment>
  );
};
