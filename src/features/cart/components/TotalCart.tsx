import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
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
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import { ChoosePaymentMethod } from './ChoosePaymentMethod';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

export const TotalCart = ({ order }: { order: (ids: string[]) => void }) => {
  const history = useHistory();
  const locationSearch = history.location.search;
  const queryObject: any = queryString.parse(locationSearch);
  const cartIds = queryObject.ids?.split(',');
  const { data: cartItems, isLoading: loadingCart } = useListCartCategories(cartIds);
  const defaultListSelectedIds = useMemo(() => {
    const listIds = cartItems && cartItems?.data.length > 0 ? cartItems?.data.map((mem) => mem.id) : [];
    return listIds;
  }, [cartItems?.data]);

  const [selectAll, setSelectAll] = useState(true);
  const [listSelected, setListSelected] = useState<Array<string>>(defaultListSelectedIds);
  const [choosingPay, setChoosingPay] = useState(false);

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
  const handleSelectMethod = (method: string) => {
    if (method === 'vnpay') {
      order(listSelected);
    }
  };

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
        <TableContainer className='w-full' component={Paper} elevation={3}>
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
            <Button
              color='warning'
              variant='contained'
              onClick={() => {
                setChoosingPay(true);
              }}
            >
              CHỌN PHƯƠNG THỨC THANH TOÁN
            </Button>
            <ChoosePaymentMethod
              pay={(selectedValue: string) => {
                handleSelectMethod(selectedValue);
              }}
              open={choosingPay}
              setOpen={(val: any) => setChoosingPay(val)}
            />
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
