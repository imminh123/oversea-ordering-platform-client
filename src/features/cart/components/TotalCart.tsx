import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  styled,
} from '@mui/material';
import { CartResponse, useListCartCategories } from '../api/useCartCategoriesListing';
import { CartRow } from './CartRow';
import { useEffect, useMemo, useState } from 'react';
import { formatMoneyToVND } from 'app/utils/helper';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

export const TotalCart = ({ order }: { order: (ids: string[]) => void }) => {
  const [page, setPage] = useState<number>(1);
  const { data: cartItems, isLoading: loadingCart } = useListCartCategories(page);
  const defaultListSelectedIds = useMemo(() => {
    const listIds = cartItems && cartItems?.data.length > 0 ? cartItems?.data.map((mem) => mem.id) : [];
    return listIds;
  }, [cartItems?.data]);

  const [selectAll, setSelectAll] = useState(true);
  const [listSelected, setListSelected] = useState<Array<string>>(defaultListSelectedIds);
  const count = parseInt(cartItems?.headers['x-pages-count'].toString() || '0');
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectAll(event.target.checked);
    if (event.target.checked) {
      setListSelected(defaultListSelectedIds);
    } else {
      setListSelected([]);
    }
  };

  const handleCheckedItem = (id: string, value: boolean) => {
    if (!!value) {
      setListSelected([...listSelected, id]);
    } else {
      let tempList = [...listSelected];
      const index = tempList.indexOf(id);
      if (index !== -1) {
        tempList.splice(index, 1);
      }
      setListSelected(tempList);
    }
  };

  const calculateToTalMoney = useMemo(() => {
    if (cartItems?.data.length) {
      return cartItems?.data
        .filter((e) => listSelected.includes(e.id))
        .reduce((acc, cur) => {
          return acc + parseFloat(cur.vnPrice) * cur.quantity;
        }, 0);
    }
  }, [cartItems?.data, listSelected]);

  useEffect(() => {
    if (cartItems && cartItems?.data.length > 0) {
      setListSelected(defaultListSelectedIds);
    }
  }, [cartItems?.data]);

  useEffect(() => {
    if (listSelected.length !== defaultListSelectedIds.length) {
      setSelectAll(false);
    } else {
      setSelectAll(true);
    }
  }, [listSelected]);
  return (
    <>
      {!!cartItems && !!cartItems?.data.length && !loadingCart && (
        <TableContainer component={Paper} elevation={3}>
          <Table aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell width={'30px'} size='small' align='left'>
                  <Checkbox checked={selectAll} onChange={handleSelectAll} />
                </TableCell>
                <TableCell>Ảnh</TableCell>
                <TableCell align='right'>Shop</TableCell>
                <TableCell sx={{ maxWidth: '150px' }} size='small' align='right'>
                  Số lượng
                </TableCell>
                <TableCell align='right'>Tiền hàng</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {cartItems?.data.map((row: CartResponse) => (
                <CartRow
                  key={row.id}
                  row={row}
                  onChecked={handleCheckedItem}
                  isChecked={listSelected.includes(row.id)}
                />
              ))}
            </TableBody>
          </Table>
          <Pagination className='flex justify-center my-2' count={count} page={page} onChange={handleChange} />
          <Box
            display={'flex'}
            flexDirection={'column'}
            alignItems={'end'}
            gap={'10px'}
            className='mt-4 p-2 bg-[#f2f2f2]'
          >
            <Box display={'flex'} className='justify-between gap-1'>
              <span>Tổng tiền hàng:</span>
              <span>{formatMoneyToVND(calculateToTalMoney || 0)}</span>
            </Box>
            <Button color='warning' variant='contained' onClick={() => order(listSelected)}>
              ĐẶT HÀNG
            </Button>
          </Box>
        </TableContainer>
      )}
      {(!cartItems || !cartItems?.data.length) && <Item elevation={3}>No item</Item>}
      {loadingCart && (
        <Item elevation={3}>
          <CircularProgress />
        </Item>
      )}
    </>
  );
};
