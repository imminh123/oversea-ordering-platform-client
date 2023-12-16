import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  CssBaseline,
  Divider,
  Grid,
  Link,
  Paper,
  SwipeableDrawer,
  Table,
  TableBody,
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
import { Item, TD } from 'app/utils/Item';
import { Global } from '@emotion/react';

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

const drawerBleeding = 85;

const StyledBox = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'light' ? '#fff' : 'grey',
}));

const Puller = styled(Box)(({ theme }) => ({
  width: 30,
  height: 6,
  backgroundColor: 'grey',
  borderRadius: 3,
  position: 'absolute',
  top: 8,
  left: 'calc(50% - 15px)',
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

  // TODO: use to calculate money of cart from client (call BE endpoint to calculate now)
  // const totalMoneyClient = useMemo(() => {
  //   return (
  //     cartItems?.data
  //       .filter((e) => cartIds.includes(e._id))
  //       .reduce((accumulator: any, currentValue) => {
  //         const temp = currentValue.listItem.reduce((a: any, c) => {
  //           return a + parseFloat(c.vnPrice) * c.quantity;
  //         }, 0);
  //         return accumulator + temp;
  //       }, 0)
  //   );
  // }, [cartIds, cartItems?.data]);

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
            height: `calc(50% - ${drawerBleeding}px)`,
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
                            value={cartIds.includes(item._id)}
                            onChange={(e) => handleCheckCart(e.target.checked, item._id)}
                          />
                          <Link href={item.shopUrl}> Shop: {item.shopName}</Link>
                        </th>
                      </tr>
                      <TableRow>
                        <TD sx={{ fontWeight: 'bold', padding: '8px' }}>Sản phẩm</TD>
                        <TD sx={{ minWidth: '100px', fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>
                          Số lượng
                        </TD>
                        <TD sx={{ fontWeight: 'bold', padding: '8px' }}>Thuộc tính</TD>
                        <TD sx={{ fontWeight: 'bold', textAlign: 'right', padding: '8px' }}>Đơn giá</TD>
                        <TD sx={{ fontWeight: 'bold', textAlign: 'center', padding: '8px' }}>Thao tác</TD>
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
          {(!cartItems || !cartItems?.data.length) && !isLoading && <Item elevation={3}>Không có bản ghi</Item>}
          {isLoading && (
            <Item elevation={3}>
              <CircularProgress className='m-5' />
            </Item>
          )}
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
                <Button
                  variant='contained'
                  disabled={refreshing}
                  onClick={() => {
                    refreshCart();
                  }}
                >
                  REFRESH GIÁ TAOBAO
                </Button>
                <Button variant='contained' disabled={isLoading || !cartIds.length} onClick={onSubmit}>
                  {!cartIds.length ? 'CHỌN SẢN PHẨM ĐỂ ĐẶT' : 'BẮT ĐẦU ĐẶT HÀNG'}
                </Button>
              </Box>
            </SumaryInfo>
          </Grid>
        )}
      </Grid>
      {matchesSM && (
        <SwipeableDrawer
          container={undefined}
          anchor='bottom'
          open={open}
          onClose={toggleDrawer(false)}
          onOpen={toggleDrawer(true)}
          swipeAreaWidth={drawerBleeding}
          disableSwipeToOpen={false}
          ModalProps={{
            keepMounted: true,
          }}
        >
          <StyledBox
            sx={{
              position: 'absolute',
              top: -drawerBleeding,
              borderTopLeftRadius: 8,
              borderTopRightRadius: 8,
              visibility: 'visible',
              right: 0,
              left: 0,
              height: 85,
            }}
          >
            <Puller />
            <Box className='grid grid-cols-2 gap-3 p-3 mt-2'>
              <Button
                variant='contained'
                size='small'
                sx={{ height: '50px' }}
                disabled={refreshing}
                onClick={() => {
                  refreshCart();
                }}
              >
                REFRESH GIÁ TAOBAO
              </Button>
              <Button
                sx={{ height: '50px' }}
                size='small'
                variant='contained'
                disabled={isLoading || !cartIds.length}
                onClick={onSubmit}
              >
                {!cartIds.length ? 'CHỌN SẢN PHẨM ĐỂ ĐẶT' : 'BẮT ĐẦU ĐẶT HÀNG'}
              </Button>
            </Box>
          </StyledBox>
          <StyledBox
            sx={{
              px: 2,
              pb: 2,
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
      )}
    </>
  );
};
