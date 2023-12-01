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
} from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useIndexOrders } from './api/useOrderListing';
import { IOrderStatusRes, OrderStatus } from 'features/cart/api/useGetOrderDetail';
import { formatMoneyToVND } from 'app/utils/helper';
import { Chip } from '@mui/material';
import { useHistory } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
      return <Chip label='CREATED' color='primary' variant='outlined' />;
    case OrderStatus.PENDING_PAYMENT:
      return <Chip label='PENDING' color='warning' variant='outlined' />;
    case OrderStatus.DELIVERED:
      return <Chip label='DELIVERED' color='success' variant='outlined' />;
    case OrderStatus.SUCCEEDED:
      return <Chip label='SUCCEEDED' color='success' variant='outlined' />;
    default:
      return <Chip label='ERROR' color='error' variant='outlined' />;
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
  const { data: cartItems, isLoading } = useIndexOrders(page);
  const count = parseInt(cartItems?.headers['x-pages-count'].toString() || '0');

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <>
      <Helmet>
        <title>Đơn hàng</title>
      </Helmet>
      <Container className='mt-5'>
        {!!cartItems && !!cartItems?.data.length && !isLoading && (
          <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
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
        {(!cartItems || !cartItems?.data.length) && <Item elevation={3}>No item</Item>}
        {isLoading && (
          <Item elevation={3}>
            <CircularProgress />
          </Item>
        )}
      </Container>
    </>
  );
};
