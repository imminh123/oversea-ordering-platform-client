import { TableCell, Checkbox, Box, TableRow } from '@mui/material';
import { CartResponse } from '../api/useCartCategoriesListing';
import { useEffect, useState } from 'react';
import { formatMoneyToVND } from 'app/utils/helper';

export const CartRow = ({
  row,
  onChecked,
  isChecked,
}: {
  row: CartResponse;
  onChecked: (id: string, value: boolean) => void;
  isChecked?: boolean;
}) => {
  const [checked, setChecked] = useState(isChecked);
  const handleChecked = (value: boolean, id: string) => {
    setChecked(value);
    onChecked(id, value);
  };

  useEffect(() => {
    if (typeof isChecked == 'boolean') {
      setChecked(isChecked);
    }
  }, [isChecked]);
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell width={'30px'} size='small' align='left'>
        <Checkbox checked={checked} onChange={(e) => handleChecked(e.target.checked, row.id)} />
      </TableCell>
      <TableCell component='th' scope='row'>
        <Box display={'flex'} gap={'10px'}>
          <a href={row.itemUrl} target='_blank' rel='noopener noreferrer'>
            <img className='max-w-16 max-h-16 overflow-clip' src={row.image[0]} alt='cart-item-image' />
          </a>
        </Box>
      </TableCell>
      <TableCell width={'100px'} size='small' align='right'>
        {row.shopName}
      </TableCell>
      <TableCell width={'100px'} size='small' align='right'>
        {row.quantity}
      </TableCell>
      <TableCell align='right' sx={{ '&::after': { content: '"đ"' } }}>
        {formatMoneyToVND(parseFloat(row.vnPrice) * row.quantity)}
      </TableCell>
    </TableRow>
  );
};
