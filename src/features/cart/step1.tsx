import {
  Box,
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { CartResponse, useListCartCategories } from './api/useCartCategoriesListing';
import { useState } from 'react';
import { Favorite, Delete } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
const CartRow = ({ row }: { row: CartResponse }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='row'>
        <Box display={'flex'} gap={'10px'}>
          <img className='max-w-16 max-h-16 overflow-clip' src={row.image[0]} alt='cart-item-image' />
          <a
            className=' text-cyan-700 max-w-xs break-words'
            href={row.itemUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            {row.itemName}
          </a>
        </Box>
      </TableCell>
      <TableCell align='right'>{row.quantity}</TableCell>
      <TableCell align='right'>{row.price}</TableCell>
      <TableCell align='right'>
        <Favorite color='primary' />
        <Delete color='error' />
      </TableCell>
    </TableRow>
  );
};

const SumaryInfo = styled(Paper)(({ theme }) => ({
  height: '100%',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  backgroundColor: '#f2f2f2'
}));

export const Step1 = () => {
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { data: cartItems } = useListCartCategories(page);
  const count = parseInt(cartItems?.headers['x-pages-count'].toString() || '0');
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <TableContainer component={Paper} elevation={3}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Categories</TableCell>
                <TableCell align='right'>Quantity</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems?.data.map((row: CartResponse) => (
                <CartRow key={row.id} row={row} />
              ))}
            </TableBody>
          </Table>
          <Pagination className='flex justify-center my-2' count={count} page={page} onChange={handleChange} />
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={4}>
        <SumaryInfo variant='elevation'>
          <Box display={'flex'} className=' justify-between'>
            <span>Price:</span>
            <span>50.000</span>
          </Box>
        </SumaryInfo>
      </Grid>
    </Grid>
  );
};
