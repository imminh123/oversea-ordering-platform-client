import { Save, Delete } from '@mui/icons-material';
import { TableRow, TableCell, Box, IconButton, Input } from '@mui/material';
import useConfirmAlert from 'app/hooks/useConfirmAlert';
import { formatMoneyToVND } from 'app/utils/helper';
import { useState } from 'react';
import { CartItemV2 } from '../api/useCartCategoriesListingV2';
import { useDeleteCartItem } from '../api/useDeleteCategory';
import { useUpdateQuantity } from '../api/useUpdateQuantity';

export const Step1CartRow = ({ row }: { row: CartItemV2 }) => {
  const [quantity, setQuantity] = useState<number>(row.quantity);
  const { mutateAsync: deleteItem } = useDeleteCartItem();
  const { mutateAsync: updateQuantity } = useUpdateQuantity();
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
  const handleSave = () => {
    updateQuantity({ id: row.id, quantity });
  };
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='row'>
        <Box display={'flex'} gap={'10px'}>
          <img className='max-w-16 max-h-16 overflow-clip' src={row.itemImage} alt='cart-item-image' />
          <a
            className='text-cyan-700 max-w-xs break-words hover:text-cyan-500 text-ellipsis truncate'
            href={row.itemUrl}
            target='_blank'
            rel='noopener noreferrer'
          >
            {row.itemName}
          </a>
        </Box>
      </TableCell>
      <TableCell width={'100px'} size='small' align='right'>
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
      <TableCell align='right' sx={{ '&::before': { content: '"¥"' } }}>
        {row.price}
      </TableCell>
      <TableCell align='right'>{formatMoneyToVND(parseFloat(row.vnPrice) * Number(row.quantity))}</TableCell>
      <TableCell align='center' width={'120px'}>
        <IconButton title='Lưu thay đổi' color='primary' aria-label='save' onClick={handleSave}>
          <Save color='primary' />
        </IconButton>
        <IconButton title='Xóa sản phẩm' color='error' aria-label='delete' onClick={handleDelete}>
          <Delete color='error' />
        </IconButton>
      </TableCell>
    </TableRow>
  );
};
