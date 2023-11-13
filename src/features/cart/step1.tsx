import {
  Box,
  Button,
  Divider,
  Grid,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { CartResponse, useListCartCategories } from './api/useCartCategoriesListing';
import { useMemo, useState } from 'react';
import { Favorite, Delete } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';

const calculateTatalPrice = (data?: CartResponse[]) => {
  if (!data || !data?.length) {
    return '0.00';
  } else {
    const totalPrice = data?.reduce((acc, item) => acc + parseFloat(item.price) * parseFloat(item.quantity), 0);
    return totalPrice;
  }
};

const CartRow = ({ row }: { row: CartResponse }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='row'>
        <Box display={'flex'} gap={'10px'}>
          <img className='max-w-16 max-h-16 overflow-clip' src={row.image[0]} alt='cart-item-image' />
          <a
            className='text-cyan-700 max-w-xs break-words hover:text-cyan-500'
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
      <TableCell align='center'>
        <IconButton color='primary' aria-label='add favourite'>
          <Favorite />
        </IconButton>
        <IconButton color='error' aria-label='delete'>
          <Delete color='error' />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};

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

export const Step1 = () => {
  const history = useHistory();

  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { data: cartItems } = useListCartCategories(page);
  const count = parseInt(cartItems?.headers['x-pages-count'].toString() || '0');
  const totalPrice = useMemo(() => calculateTatalPrice(cartItems?.data), [cartItems?.data]);
  const onSubmit = () =>{
    history.push('cart/pickup')
  }
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
                <TableCell align='center'>Action</TableCell>
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
            <span>{totalPrice}</span>
          </Box>
          <Box display={'flex'} className=' justify-between'>
            <span>Purchase fee:</span>
            <span>_</span>
          </Box>
          <Box display={'flex'} className=' justify-between'>
            <span>Free counting:</span>
            <span>_</span>
          </Box>
          <Box display={'flex'} className=' justify-between'>
            <span>Domestic shipping fee in CN:</span>
            <span>_</span>
          </Box>
          <Box display={'flex'} className=' justify-between'>
            <span>Shipping fee CN - VN:</span>
            <span>_</span>
          </Box>
          <Box display={'flex'} className=' justify-between'>
            <span>Domestic shipping fee in VN:</span>
            <span>_</span>
          </Box>
          <Divider />
          <Box display={'flex'} className=' justify-between'>
            <Typography variant='h6' sx={{ mb: 4 }}>
              TOTAL:
            </Typography>
            <Typography variant='h5' color='error' sx={{ mb: 4 }}>
              {totalPrice}
            </Typography>
          </Box>
          <Box display={'flex'} className='justify-end'>
            <Button variant='contained' onClick={onSubmit}>CONFIRM</Button>
          </Box>
        </SumaryInfo>
      </Grid>
    </Grid>
  );
};
