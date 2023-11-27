import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useCalculatePrice } from './api/useCalculatePrice';
import { useRefreshCart } from './api/useRefreshCart';
import { formatMoneyToVND } from 'app/utils/helper';
import { CartItemV2, useListCartCategoriesV2 } from './api/useCartCategoriesListingV2';
import { Step1CartRow } from './components/Step1CartRow';

const SumaryInfo = styled(Paper)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  gap: '10px',
  flexDirection: 'column',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  backgroundColor: '#f2f2f2',
}));

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

export const Step1 = () => {
  const history = useHistory();

  const { mutateAsync: refreshCart, isLoading: refreshing } = useRefreshCart();
  const { data: cartItems, isLoading } = useListCartCategoriesV2();
  const calculatePriceParam =
    cartItems?.data
      .reduce((accumulator: any, currentValue) => {
        const listItemIds = currentValue.listItem.map((item) => item.id);
        return accumulator.concat(listItemIds);
      }, [])
      .join(',') || '';
  const { data: totalPrice } = useCalculatePrice(calculatePriceParam, { enabled: !!cartItems?.data });

  const onSubmit = () => {
    history.push('cart/order');
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        {!!cartItems &&
          !!cartItems?.data.length &&
          !isLoading &&
          cartItems?.data.map((item) => {
            return (
              <TableContainer key={item._id} component={Paper} elevation={3} className='mb-3'>
                <Table sx={{ minWidth: 650 }} aria-label='simple table'>
                  <TableHead>
                    <tr className='text-left'>
                      <th>
                        <br />
                        <Link href={item.shopUrl}> Shop: {item.shopName}</Link>
                      </th>
                    </tr>
                    <TableRow>
                      <TableCell>Sản phẩm</TableCell>
                      <TableCell sx={{ maxWidth: '150px' }} size='small' align='right'>
                        Số lượng
                      </TableCell>
                      <TableCell align='right'>Đơn giá</TableCell>
                      <TableCell align='right'>Tiền hàng</TableCell>
                      <TableCell align='center'>Thao tác</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {item.listItem.map((row: CartItemV2) => (
                      <Step1CartRow key={row.id} row={row} />
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            );
          })}
        {(!cartItems || !cartItems?.data.length) && <Item elevation={3}>No item</Item>}
        {isLoading && (
          <Item elevation={3}>
            <CircularProgress className='m-5' />
          </Item>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <SumaryInfo variant='elevation'>
          <Box display={'flex'} className=' justify-between'>
            <span>Tiền hàng:</span>
            <span>{formatMoneyToVND(parseFloat(totalPrice?.data.totalInVND || '0'))}</span>
          </Box>
          <Box display={'flex'} className=' justify-between'>
            <span>Phí mua hàng:</span>
            <span>_</span>
          </Box>
          <Box display={'flex'} className=' justify-between'>
            <span>Phí kiểm đếm:</span>
            <span>_</span>
          </Box>
          <Box display={'flex'} className=' justify-between'>
            <span>Phí vận chuyển nội địa TQ:</span>
            <span>_</span>
          </Box>
          <Box display={'flex'} className=' justify-between'>
            <span>Phí vận chuyển TQ - VN:</span>
            <span>_</span>
          </Box>
          <Box display={'flex'} className=' justify-between'>
            <span>Phí vận chuyển nội địa VN:</span>
            <span>_</span>
          </Box>
          <Divider />
          <Box display={'flex'} className=' justify-between'>
            <Typography variant='h6' sx={{ mb: 4 }}>
              Tổng tiền:
            </Typography>
            <Typography variant='h5' color='error' sx={{ mb: 4 }}>
              {formatMoneyToVND(parseFloat(totalPrice?.data?.totalInVND || '0'))}
            </Typography>
          </Box>
          <Box display={'flex'} gap={'10px'} className='justify-end'>
            <Button
              variant='contained'
              disabled={refreshing}
              onClick={() => {
                refreshCart();
              }}
            >
              REFRESH GIỎ HÀNG
            </Button>
            <Button variant='contained' disabled={isLoading} onClick={onSubmit}>
              ĐẶT HÀNG
            </Button>
          </Box>
        </SumaryInfo>
      </Grid>
    </Grid>
  );
};
