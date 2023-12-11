import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Paper,
  Radio,
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
import { Item } from 'app/utils/Item';

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
  const [selectedPayMethod, setSelectedPayMethod] = useState('vnpay');
  const handleInputChange = (event: any) => {
    setSelectedPayMethod(event.target.value);
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

  const handleSelectMethod = () => {
    if (selectedPayMethod === 'vnpay') {
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
          <Table aria-label='Kết đơn'>
            <TableHead>
              <TableRow>
                <TableCell padding='none' width={'30px'} size='small' align='left'>
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

            <Box className='w-full flex flex-col items-center gap-3'>
              <input
                type='radio'
                id='vn-pay'
                name='payment-method'
                value='vnpay'
                checked={selectedPayMethod === 'vnpay'}
                onChange={handleInputChange}
                className='hidden peer/vnpay'
              />
              <label
                htmlFor='vn-pay'
                className='cursor-pointer w-full rounded-lg p-2 border border-slate-500 peer-checked/vnpay:border-sky-500 hover:bg-slate-200 hover:shadow-lg'
              >
                <div className='flex justify-between items-center'>
                  <div className='flex gap-1'>
                    <Radio value='vnpay' checked={selectedPayMethod === 'vnpay'} onChange={handleInputChange} />
                    <img
                      src='https://www.ppro.com/wp-content/uploads/2021/06/VNPAYQR-logo.png'
                      alt='vn-pay'
                      className='w-auto h-10 bg-cover object-cover'
                    />
                  </div>
                  <span className=' text-right'>Ví điện tử VNPAY</span>
                </div>
              </label>

              <input
                type='radio'
                id='momo'
                disabled
                name='payment-method'
                value='momo'
                checked={selectedPayMethod === 'momo'}
                onChange={handleInputChange}
                className='hidden peer/momo'
              />
              <label
                htmlFor='momo'
                className='cursor-pointer w-full rounded-lg p-2 border border-slate-500 peer-checked/momo:border-sky-500 peer-disabled/momo:border-slate-200 peer-disabled/momo:bg-slate-200 peer-disabled/momo:cursor-not-allowed hover:bg-slate-200 hover:shadow-lg'
              >
                <div className='flex justify-between items-center'>
                  <div className='flex gap-1'>
                    <Radio disabled value='momo' checked={selectedPayMethod === 'momo'} onChange={handleInputChange} />
                    <img
                      src='https://upload.wikimedia.org/wikipedia/vi/f/fe/MoMo_Logo.png'
                      alt='Momo'
                      className='w-auto h-10 bg-cover object-cover'
                    />
                  </div>
                  <span>Thanh toán MoMo</span>
                </div>
              </label>

              <input
                type='radio'
                id='zalopay'
                disabled
                name='payment-method'
                value='zalopay'
                checked={selectedPayMethod === 'zalopay'}
                onChange={handleInputChange}
                className='hidden peer/zalopay'
              />
              <label
                htmlFor='zalopay'
                className='cursor-pointer w-full rounded-lg p-2 border border-slate-500 peer-checked/zalopay:border-sky-500 peer-disabled/zalopay:border-slate-200 peer-disabled/zalopay:bg-slate-200 peer-disabled/zalopay:cursor-not-allowed hover:bg-slate-200 hover:shadow-lg'
              >
                <div className='flex justify-between items-center'>
                  <div className='flex gap-1'>
                    <Radio
                      disabled
                      value='zalopay'
                      checked={selectedPayMethod === 'zalopay'}
                      onChange={handleInputChange}
                    />
                    <img
                      src='https://imgs.search.brave.com/G-JsBGx4puWGhlIeBlbKHYFSHWpPAJjS3nKOaKDgPnw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aGFpdHJpZXUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIy/LzEwL0xvZ28tWmFs/b1BheS5wbmc'
                      alt='Zalopay'
                      className='w-auto h-10 bg-cover object-cover'
                    />
                  </div>
                  <span>Ví điện tử ZaloPay</span>
                </div>
              </label>
            </Box>
            <Button color='warning' variant='contained' onClick={handleSelectMethod}>
              THANH TOÁN
            </Button>
          </Box>
        </TableContainer>
      )}
      {(!cartItems || !cartItems?.data.length) && !loadingCart && <Item elevation={3}>Không có bản ghi</Item>}
      {loadingCart && (
        <Item elevation={3}>
          <CircularProgress />
        </Item>
      )}
    </>
  );
};
