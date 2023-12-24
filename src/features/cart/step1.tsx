import {
  Box,
  Checkbox,
  CssBaseline,
  Divider,
  Grid,
  Link,
  Paper,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useCalculatePrice } from './api/useCalculatePrice';
import { useRefreshCart } from './api/useRefreshCart';
import { formatMoneyToVND } from 'app/utils/helper';
import { CartItemV2, useListCartCategoriesV2 } from './api/useCartCategoriesListingV2';
import { Step1CartRow } from './components/Step1CartRow';
import queryString from 'query-string';
import { useMemo, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Global } from '@emotion/react';
import { LoadingButton } from '@mui/lab';
import { LoadingCard, NoItemFound } from 'app/components/Item';

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

const drawerBleeding = 100;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'grey',
}));

export const Step1 = () => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const [open, setOpen] = useState(false);

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };
  const history = useHistory();
  const { data: cartItems, isLoading } = useListCartCategoriesV2();
  const [cartIds, setCartIds] = useState<string[]>([]);
  const { mutateAsync: refreshCart, isLoading: refreshing } = useRefreshCart();
  const calculatePriceParam = useMemo(() => {
    return (
      cartItems?.data
        .filter((e) => cartIds.includes(e._id))
        .reduce((accumulator: any, currentValue) => {
          const listItemIds = currentValue.listItem.map((item) => item.id);
          return accumulator.concat(listItemIds);
        }, [])
        .join(',') || ''
    );
  }, [cartIds, cartItems?.data]);

  const { data: totalPrice } = useCalculatePrice(calculatePriceParam);
  const handleCheckCart = (value: boolean, id: string) => {
    if (value) {
      setCartIds((prev) => {
        const newVal = [...prev, id];
        return newVal;
      });
    } else {
      setCartIds((prev) => {
        const newVal = prev.filter((e) => e !== id);
        return newVal;
      });
    }
  };
  const onSubmit = () => {
    const queryObject = { ids: calculatePriceParam };
    history.push({ pathname: 'cart/order', search: queryString.stringify(queryObject) });
  };
  return (
    <>
      <CssBaseline />
      <Global
        styles={{
          '.MuiDrawer-root > .MuiPaper-root': {
            height: `calc(50)`,
            overflow: 'visible',
          },
          '.MuiDrawer-root > .MuiBackdrop-root': {
            ...(!open && { backgroundColor: '#fff' }),
          },
        }}
      />
      <Helmet>
        <title>Giỏ hàng</title>
      </Helmet>
      <Grid container spacing={2} className='mb-5'>
        <Grid item md={12} lg={8} width={'100%'}>
          {!!cartItems &&
            !!cartItems?.data.length &&
            !isLoading &&
            cartItems?.data.map((item) => {
              return (
                <TableContainer key={item._id} component={Paper} elevation={3} className='mb-3'>
                  <Table aria-label='giỏ hàng'>
                    <TableHead>
                      <tr className='text-left'>
                        <th>
                          <Checkbox
                            size='small'
                            disabled={item.listItem.some((e) => !e.isActive)}
                            value={cartIds.includes(item._id)}
                            onChange={(e) => handleCheckCart(e.target.checked, item._id)}
                          />
                          <Link href={item.shopUrl}> Shop: {item.shopName}</Link>
                          {item.listItem.some((e) => !e.isActive) && (
                            <Typography
                              variant='subtitle2'
                              sx={{ marginLeft: '10px' }}
                              color={theme.palette.error.main}
                            >
                              (Vui lòng loại bỏ những sản phẩm không tồn tại)
                            </Typography>
                          )}
                        </th>
                      </tr>
                      <TableRow>
                        <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Sản phẩm</TableCell>
                        <TableCell sx={{ minWidth: '100px', fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>
                          Số lượng
                        </TableCell>
                        <TableCell sx={{ fontWeight: 'bold', padding: '8px' }}>Thuộc tính</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'right', padding: '8px' }}>Đơn giá</TableCell>
                        <TableCell sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Thao tác</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody sx={{ marginBottom: '20px' }}>
                      {item.listItem.map((row: CartItemV2) => (
                        <Step1CartRow key={row.id} row={row} />
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              );
            })}
          {(!cartItems || !cartItems?.data.length) && !isLoading && <NoItemFound />}
          {isLoading && <LoadingCard />}
        </Grid>
        {!matchesSM && (
          <Grid item md={12} lg={4} width={'100%'} className='pb-3'>
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
                <LoadingButton
                  loadingIndicator='Đang chờ...'
                  variant='text'
                  loading={refreshing}
                  onClick={() => {
                    refreshCart();
                  }}
                >
                  Update Giá Taobao
                </LoadingButton>
                <LoadingButton
                  loadingIndicator='Đang chờ...'
                  variant='contained'
                  disabled={!cartIds.length}
                  loading={isLoading}
                  onClick={onSubmit}
                >
                  {!cartIds.length ? 'CHỌN SẢN PHẨM' : 'ĐẶT HÀNG'}
                </LoadingButton>
              </Box>
            </SumaryInfo>
          </Grid>
        )}
      </Grid>
      {matchesSM && (
        <>
          {!!cartIds.length && (
            <LoadingButton
              variant='text'
              size='small'
              sx={{ height: '50px' }}
              onClick={() => {
                setOpen(true);
              }}
            >
              Chi tiết đơn hàng
            </LoadingButton>
          )}
          <Box className='grid grid-cols-2 gap-3 '>
            <LoadingButton
              loadingIndicator='Đang chờ...'
              variant='contained'
              size='small'
              sx={{ height: '40px', fontSize: '10px' }}
              loading={refreshing}
              onClick={() => {
                refreshCart();
              }}
            >
              Update Giá Taobao
            </LoadingButton>
            <LoadingButton
              loadingIndicator='Đang chờ...'
              sx={{ height: '40px', fontSize: '10px' }}
              size='small'
              variant='contained'
              disabled={!cartIds.length}
              loading={isLoading}
              onClick={onSubmit}
            >
              {!cartIds.length ? 'CHỌN SẢN PHẨM ĐỂ ĐẶT' : 'BẮT ĐẦU ĐẶT HÀNG'}
            </LoadingButton>
          </Box>
          <SwipeableDrawer
            container={undefined}
            anchor='bottom'
            open={open}
            onClose={toggleDrawer(false)}
            onOpen={toggleDrawer(true)}
            swipeAreaWidth={drawerBleeding}
            disableSwipeToOpen={true}
          >
            <StyledBox
              sx={{
                p: 2,
                height: '100%',
                overflow: 'auto',
              }}
            >
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
              </SumaryInfo>
            </StyledBox>
          </SwipeableDrawer>
        </>
      )}
    </>
  );
};
