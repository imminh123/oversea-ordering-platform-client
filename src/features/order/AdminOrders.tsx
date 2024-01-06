import { LocalizationProvider, DateRangePicker, LoadingButton } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import {
  Box,
  Card,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { LoadingCard, NoItemFound } from 'app/components/Item';
import { OrderStatus, IOrderDetailRes } from 'features/cart/api/useGetOrderDetail';
import React, { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { OrderStatusOptions } from './order.const';
import { useHistory } from 'react-router-dom';
import { mappingOrderStatus } from './components';
import { formatMoneyToVND } from 'app/utils/helper';
import { useIndexOrdersAdmin } from './api/useOrderListingAdmin';
import { Download } from '@mui/icons-material';
import { useDownloadOrdersAdmin } from './api/useOrderDownloadCSVAdmin';

export const AdminOrders = () => {
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<OrderStatus>();
  const [value, setValue] = useState<any>([null, null]);
  const [userFilter, setUserFilter] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [itemFilter, setItemFilter] = useState<string>('');
  const [itemName, setItemName] = useState<string>('');
  const [taobaoDeliveryId, setTaobaoDeliveryId] = useState<string>('');
  const [taobaoDeliveryIdFilter, setTaobaoDeliveryIdFilter] = useState<string>('');
  const { data: orderItems, isLoading } = useIndexOrdersAdmin({
    page,
    status,
    userName,
    itemName,
    taobaoDeliveryId,
    ...(value[0] && { timeFrom: new Date(value[0]).toISOString() }),
    ...(value[1] && { timeTo: new Date(value[1]).toISOString() }),
  });

  const { refetch: download, isLoading: downloading } = useDownloadOrdersAdmin(
    {
      page,
      status,
      userName,
      itemName,
      taobaoDeliveryId,
      ...(value[0] && { timeFrom: new Date(value[0]).toISOString() }),
      ...(value[1] && { timeTo: new Date(value[1]).toISOString() }),
    },
    {
      enabled: false,
    },
  );
  const count = parseInt(orderItems?.headers['x-pages-count'].toString() || '0');

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleInputChange = (event: any, type: string) => {
    switch (type) {
      case 'status':
        setStatus(event.target.value);
        break;
      case 'userName':
        setUserFilter(event.target.value);
        break;
      case 'itemName':
        setItemFilter(event.target.value);
        break;
      case 'taobaoDeliveryId':
        setTaobaoDeliveryIdFilter(event.target.value);
        break;
    }
  };
  const handleKeyPress = (e: any, type: string) => {
    if (e.keyCode == 13) {
      switch (type) {
        case 'userName':
          setUserName(e.target.value);
          break;
        case 'itemName':
          setItemName(e.target.value);
          break;
        case 'taobaoDeliveryId':
          setTaobaoDeliveryId(e.target.value);
          break;
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Đơn hàng</title>
      </Helmet>
      <Container className='mt-5 mb-10'>
        <Box className='flex justify-between items-center mb-3 px-3'>
          <Typography variant={'h6'} sx={{ gridColumn: 'span 2' }}>
            Quản lý đơn hàng
          </Typography>
          <LoadingButton
            startIcon={<Download />}
            variant='contained'
            color='primary'
            loading={downloading}
            onClick={() => download()}
          >
            Tải CSV
          </LoadingButton>
        </Box>
        <Card sx={{ p: 2, marginBottom: '10px' }}>
          <Box className='grid grid-cols-1 sm:grid-cols-3 gap-2 my-3'>
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
                  {OrderStatusOptions.map((status, index) => {
                    return (
                      <MenuItem key={index} value={status.value}>
                        {status.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box className='flex justify-end col-span-2' sx={{ '& div': { width: '100%' } }}>
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
                      <TextField fullWidth size='small' {...startProps} />
                      <Box sx={{ mx: 2, width: '50px !important' }}> tới </Box>
                      <TextField fullWidth size='small' {...endProps} />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box className='grid grid-cols-1 sm:grid-cols-3 gap-2 my-3'>
            <Box>
              <TextField
                fullWidth
                label='Tên người dùng'
                size='small'
                value={userFilter}
                onChange={(e) => handleInputChange(e, 'userName')}
                onKeyDown={(e) => handleKeyPress(e, 'userName')}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label='Tên mặt hàng'
                size='small'
                value={itemFilter}
                onChange={(e) => handleInputChange(e, 'itemName')}
                onKeyDown={(e) => handleKeyPress(e, 'itemName')}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label='Mã vận đơn'
                size='small'
                value={taobaoDeliveryIdFilter}
                onChange={(e) => handleInputChange(e, 'taobaoDeliveryId')}
                onKeyDown={(e) => handleKeyPress(e, 'taobaoDeliveryId')}
              />
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
                    <AdminOrderRow key={row.id} item={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination className='flex justify-center my-4' count={count} page={page} onChange={handleChange} />
          </Card>
        )}
        {(!orderItems || !orderItems?.data.length) && !isLoading && <NoItemFound />}
        {isLoading && <LoadingCard />}
      </Container>
    </>
  );
};

export const AdminOrderRow = ({ item }: { item: IOrderDetailRes }) => {
  const history = useHistory();
  return (
    <TableRow
      onClick={() => {
        history.push(`/admin/orders/${item.id}`);
      }}
      className='cursor-pointer'
      hover
    >
      <TableCell component='th' scope='row' className='sm:text-xs'>
        {item.listItem[0].itemName}
      </TableCell>
      <TableCell align='right'>{mappingOrderStatus(item.status)}</TableCell>
      <TableCell className='break-words text-ellipsis'>{`${item.address.name} - ${item.address.phone}`}</TableCell>
      <TableCell align='right'>{formatMoneyToVND(item?.total)}</TableCell>
    </TableRow>
  );
};
