import {
  TableRow,
  TableHead,
  Paper,
  TableContainer,
  Table,
  TableCell,
  TableBody,
  Pagination,
  Box,
  Container,
  FormControl,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Card,
} from '@mui/material';
import React, { useState } from 'react';
import DateRangePicker from '@mui/lab/DateRangePicker';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { useIndexOrders } from './api/useOrderListing';
import { IOrderDetailRes, OrderStatus } from 'features/cart/api/useGetOrderDetail';
import { formatMoneyToVND } from 'app/utils/helper';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { OrderStatusOptions } from './order.const';
import { LoadingCard, NoItemFound } from 'app/components/Item';
import { mappingOrderStatus } from './components';

export const ClientOrderRow = ({ item }: { item: IOrderDetailRes }) => {
  const history = useHistory();
  return (
    <TableRow
      hover
      onClick={() => {
        history.push(`/orders/${item.id}`);
      }}
      className='cursor-pointer'
    >
      <TableCell component='th' scope='row' className='sm:text-xs'>
        {item.listItem[0].itemName}
      </TableCell>
      <TableCell width={'100px'} size='small' align='right'>
        {mappingOrderStatus(item.status)}
      </TableCell>
      <TableCell className='break-words text-ellipsis'>{`${item.address.name} - ${item.address.phone}`}</TableCell>
      <TableCell align='right'>{formatMoneyToVND(item?.total)}</TableCell>
    </TableRow>
  );
};

export const OrderListing = () => {
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<OrderStatus>();
  const [value, setValue] = useState<any>([null, null]);
  const { data: orderItems, isLoading } = useIndexOrders({
    page,
    status,
    ...(value[0] && { timeFrom: new Date(value[0]).toISOString() }),
    ...(value[1] && { timeTo: new Date(value[1]).toISOString() }),
  });
  const count = parseInt(orderItems?.headers['x-pages-count'].toString() || '0');

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
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
      <Container className='mt-5 mb-10'>
        <Card sx={{ p: 2, marginBottom: '10px' }}>
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
                      <TextField
                        size='small'
                        {...startProps}
                        sx={{
                          height: '100%',
                          '& .MuiOutlinedInput-root': {
                            height: '100%',
                          },
                        }}
                      />
                      <Box sx={{ mx: 2 }}> tới </Box>
                      <TextField
                        size='small'
                        {...endProps}
                        sx={{
                          height: '100%',
                          '& .MuiOutlinedInput-root': {
                            height: '100%',
                          },
                        }}
                      />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>
        </Card>
        {!!orderItems && !!orderItems?.data.length && !isLoading && (
          <Card>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }} aria-label='đơn hàng'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Sản phẩm</TableCell>
                    <TableCell sx={{ maxWidth: '150px', fontWeight: 'bold' }} align='right'>
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
            <Pagination className='flex justify-center my-4' count={count} page={page} onChange={handleChangePage} />
          </Card>
        )}
        {(!orderItems || !orderItems?.data.length) && !isLoading && <NoItemFound />}
        {isLoading && <LoadingCard />}
      </Container>
    </>
  );
};
