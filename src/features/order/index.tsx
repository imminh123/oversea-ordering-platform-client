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
import { Item, TD } from 'app/utils/Item';

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
        history.push(`/orders/${item.id}`);
      }}
      className=' cursor-pointer'
      sx={{ '&:hover': { backgroundColor: '#e6e6e6' } }}
    >
      <TD component='th' scope='row' className='sm:text-xs'>
        {item.listItem[0].itemName}
      </TD>
      <TableCell width={'100px'} size='small' align='right'>
        {mappingStatus(item.status)}
      </TableCell>
      <TD className='break-words text-ellipsis'>{`${item.address.name} - ${item.address.phone}`}</TD>
      <TD align='right'>{formatMoneyToVND(item?.total)}</TD>
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
        <Box className='grid grid-cols-1 sm:grid-cols-2 gap-2 my-3'>
          <Box>
            <FormControl fullWidth>
              <InputLabel size='small' id='status-select-label'>
                Trạng thái đơn hàng
              </InputLabel>
              <Select
                labelId='status-select-label'
                id='status-select'
                size='small'
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
          </Box>
          <Box className='flex justify-end'>
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
                    <TextField size='small' {...startProps} />
                    <Box sx={{ mx: 2 }}> tới </Box>
                    <TextField size='small' {...endProps} />
                  </React.Fragment>
                )}
              />
            </LocalizationProvider>
          </Box>
        </Box>
        {!!cartItems && !!cartItems?.data.length && !isLoading && (
          <>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }} aria-label='đơn hàng'>
                <TableHead>
                  <TableRow>
                    <TD sx={{ fontWeight: 'bold' }}>Sản phẩm</TD>
                    <TD sx={{ maxWidth: '150px', fontWeight: 'bold' }} align='right'>
                      Trạng thái
                    </TD>
                    <TD sx={{ fontWeight: 'bold' }} className=' min-w-[150px]'>
                      Người nhận
                    </TD>
                    <TD sx={{ fontWeight: 'bold', textAlign: 'right' }}>Tiền hàng</TD>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems?.data.map((row: IOrderStatusRes) => (
                    <OrderRow key={row.id} item={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination className='flex justify-center my-2' count={count} page={page} onChange={handleChange} />
          </>
        )}
        {(!cartItems || !cartItems?.data.length) && !isLoading && <Item elevation={3}>Không có bản ghi</Item>}
        {isLoading && (
          <Item elevation={3}>
            <CircularProgress />
          </Item>
        )}
      </Container>
    </>
  );
};
