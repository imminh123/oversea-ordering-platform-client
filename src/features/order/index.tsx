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
} from '@mui/material';
import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import { useIndexOrders } from './api/useOrderListing';
import { IOrderStatusRes } from 'features/cart/api/useGetOrderDetail';
import { formatMoneyToVND } from 'app/utils/helper';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const CartRow = ({ item }: { item: IOrderStatusRes }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='row'>
        {item.listItem[0].itemName}
      </TableCell>
      <TableCell width={'100px'} size='small' align='right'>
        {item.status}
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
    <React.Fragment>
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
                <CartRow key={row.id} item={row} />
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
    </React.Fragment>
  );
};
