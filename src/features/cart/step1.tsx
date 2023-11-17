import {
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  IconButton,
  Input,
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
import { Delete, Save } from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useHistory } from 'react-router-dom';
import { useDeleteCartItem } from './api/useDeleteCategory';
import useConfirmAlert from 'app/hooks/useConfirmAlert';

const calculateTatalPrice = (data?: CartResponse[]) => {
  if (!data || !data?.length) {
    return '0.00';
  } else {
    const totalPrice = data?.reduce((acc, item) => acc + parseFloat(item.price) * parseFloat(item.quantity), 0);
    return totalPrice;
  }
};

const CartRow = ({ row }: { row: CartResponse }) => {
  const [quantity, setQuantity] = useState<number>(parseInt(row.quantity));
  const { mutateAsync: deleteItem } = useDeleteCartItem();
  const { confirm } = useConfirmAlert();
  const handleDelete = () => {
    confirm({
      onConfirm: () => {
        deleteItem(row.id);
      },
      options: {
        title: 'Bạn có chắc muốn xóa sản phẩm này?',
        confirmationText: 'Có',
        cancellationText: 'Hủy',
        description: 'Khi xác nhận sẽ không thể hoàn tác',
      },
    });
  };
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
      <TableCell sx={{ maxWidth: '150px' }} size='small' align='right'>
        <Input
          disableUnderline
          sx={{ border: 'solid .5px #d2d6de', borderRadius: '5px', '& input': { textAlign: 'center' } }}
          type='number'
          value={quantity}
          onChange={(e) => {
            if (parseInt(e.target.value) > 0) {
              setQuantity(parseInt(e.target.value));
            }
          }}
        />
      </TableCell>
      <TableCell align='right'>{row.price}</TableCell>
      <TableCell align='center'>
        <IconButton title='Lưu thay đổi' color='primary' aria-label='delete'>
          <Save color='primary' />
        </IconButton>
        <IconButton title='Xóa sản phẩm' color='error' aria-label='delete' onClick={handleDelete}>
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

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

export const Step1 = () => {
  const history = useHistory();

  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { data: cartItems, isLoading } = useListCartCategories(page);
  const count = parseInt(cartItems?.headers['x-pages-count'].toString() || '0');
  const totalPrice = useMemo(() => calculateTatalPrice(cartItems?.data), [cartItems?.data]);
  const onSubmit = () => {
    history.push('cart/pickup');
  };
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        {!!cartItems && !!cartItems?.data.length && !isLoading && (
          <TableContainer component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label='simple table'>
              <TableHead>
                <TableRow>
                  <TableCell>Sản phẩm</TableCell>
                  <TableCell sx={{ maxWidth: '150px' }} size='small' align='right'>
                    Số lượng
                  </TableCell>
                  <TableCell align='right'>Tiền hàng</TableCell>
                  <TableCell align='center'>Thao tác</TableCell>
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
        )}
        {(!cartItems || !cartItems?.data.length) && <Item elevation={3}>No item</Item>}
        {isLoading && (
          <Item elevation={3}>
            <CircularProgress />
          </Item>
        )}
      </Grid>
      <Grid item xs={12} md={4}>
        <SumaryInfo variant='elevation'>
          <Box display={'flex'} className=' justify-between'>
            <span>Tiền hàng:</span>
            <span>{totalPrice}</span>
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
              {totalPrice}
            </Typography>
          </Box>
          <Box display={'flex'} className='justify-end'>
            <Button variant='contained' disabled={isLoading} onClick={onSubmit}>
              ĐẶT HÀNG
            </Button>
          </Box>
        </SumaryInfo>
      </Grid>
    </Grid>
  );
};
