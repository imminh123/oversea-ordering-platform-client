import {
  TableRow,
  TableHead,
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  Pagination,
  CircularProgress,
  Box,
  Container,
  Grid,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useIndexOrders } from './api/useOrderListing';
import { IOrderStatusRes, OrderStatus } from 'features/cart/api/useGetOrderDetail';
import { formatMoneyToVND } from 'app/utils/helper';
import { Chip } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { OrderStatusOptions } from './order.const';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

export const mappingStatus = (status?: OrderStatus) => {
  switch (status) {
    case OrderStatus.CREATED:
      return <Chip label='Đã tạo đơn hàng' color='primary' variant='outlined' />;
    case OrderStatus.PENDING_PAYMENT:
      return <Chip label='Đang chờ' color='warning' variant='outlined' />;
    case OrderStatus.DELIVERED:
      return <Chip label='Đang vận chuyển' color='success' variant='outlined' />;
    case OrderStatus.SUCCEEDED:
      return <Chip label='Thành công' color='success' variant='outlined' />;
    case OrderStatus.TIMEOUT:
      return <Chip label='Hết hạn' color='error' variant='outlined' />;
    default:
      return <Chip label='Lỗi' color='error' variant='outlined' />;
  }
};

const OrderRow = ({ item }: { item: IOrderStatusRes }) => {
  const history = useHistory();
  return (
    <TableRow
      onClick={() => {
        history.push(`orders/${item.id}`);
      }}
      className=' cursor-pointer'
      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
    >
      <TableCell component='th' scope='row'>
        {item.listItem[0].itemName}
      </TableCell>
      <TableCell width={'100px'} size='small' align='right'>
        {mappingStatus(item.status)}
      </TableCell>
      <TableCell className='break-words text-ellipsis'>{`${item.address.name} - ${item.address.phone}`}</TableCell>
      <TableCell>{item.wareHouseAddress}</TableCell>
      <TableCell align='right'>{formatMoneyToVND(item?.total)}</TableCell>
    </TableRow>
  );
};

export const OrderListing = () => {
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<OrderStatus>();
  const [value, setValue] = useState<any>([null, null]);
  const { data: cartItems, isLoading } = useIndexOrders({
    page,
    status,
    ...(value[0] && { timeFrom: new Date(value[0]).toISOString() }),
    ...(value[1] && { timeTo: new Date(value[1]).toISOString() }),
  });
  const count = parseInt(cartItems?.headers['x-pages-count'].toString() || '0');

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleInputChange = (event: any, type: string) => {
    switch (type) {
      case 'status':
        setStatus(event.target.value);
        break;
    }
  };
  return (
    <>
      <Helmet>
        <title>Đơn hàng</title>
      </Helmet>
      <Container className='mt-5'>
        <Grid container className='my-3' gap={3}>
          <Grid item xs={12} sm={5}>
            <FormControl fullWidth>
              <InputLabel id='status-select-label'>Trạng thái đơn hàng</InputLabel>
              <Select
                labelId='status-select-label'
                id='status-select'
                variant='outlined'
                value={status || ''}
                label='Trạng thái đơn hàng'
                onChange={(e) => handleInputChange(e, 'status')}
              >
                {OrderStatusOptions.map((lang, index) => {
                  return (
                    <MenuItem key={index} value={lang.value}>
                      {lang.label}
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={5}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateRangePicker
                startText='Bắt đầu'
                endText='Kết thúc'
                value={value}
                disableFuture
                inputFormat='dd/MM/yyyy'
                onChange={(newValue) => {
                  setValue(newValue);
                }}
                renderInput={(startProps, endProps) => (
                  <React.Fragment>
                    <TextField {...startProps} />
                    <Box sx={{ mx: 2 }}> tới </Box>
                    <TextField {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </Grid>
        </Grid>
        {!!cartItems && !!cartItems?.data.length && !isLoading && (
          <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label='đơn hàng'>
              <TableHead>
                <TableRow>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell sx={{ maxWidth: '150px' }} size='small' align='right'>
                    Trạng thái
                  </TableCell>
                  <TableCell className=' min-w-[150px]'>Người nhận</TableCell>
                  <TableCell align='right'>Kho hàng</TableCell>
                  <TableCell align='right'>Tiền hàng</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems?.data.map((row: IOrderStatusRes) => (
                  <OrderRow key={row.id} item={row} />
                ))}
              </TableBody>
            </Table>
            <Pagination className='flex justify-center my-2' count={count} page={page} onChange={handleChange} />
          </TableContainer>
        )}
        {(!cartItems || !cartItems?.data.length) && <Item elevation={3}>Không có bản ghi</Item>}
        {isLoading && (
          <Item elevation={3}>
            <CircularProgress />
          </Item>
        )}
      </Container>
    </>
  );
};
