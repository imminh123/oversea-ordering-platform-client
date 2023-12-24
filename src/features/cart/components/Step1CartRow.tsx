import { TableRow, TableCell, Box, Input } from '@mui/material';
import useConfirmAlert from 'app/hooks/useConfirmAlert';
import { formatMoneyToCN, formatMoneyToVND } from 'app/utils/helper';
import { useState } from 'react';
import { CartItemV2 } from '../api/useCartCategoriesListingV2';
import { useDeleteCartItem } from '../api/useDeleteCategory';
import { useUpdateQuantity } from '../api/useUpdateQuantity';
import { LoadingButton } from '@mui/lab';

export const Step1CartRow = ({ row }: { row: CartItemV2 }) => {
  const [quantity, setQuantity] = useState<number>(row.quantity);
  const { mutateAsync: deleteItem, isLoading: deleting } = useDeleteCartItem();
  const { mutateAsync: updateQuantity, isLoading: saving } = useUpdateQuantity();
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
    <TableRow
      sx={{
        '&:hover': { backgroundColor: '#e6e6e6' },
        ...(!row.isActive && { backgroundColor: '#e3e3e3' }),
      }}
      title={row.isActive ? row.itemName : 'Sản phẩm này đã ngưng bán'}
    >
      <TableCell>
        <Box display={'flex'} gap={'10px'}>
          <img
            className={`w-16 h-auto max-h-16 overflow-clip ${!row.isActive && 'blur-[2px]'}`}
            src={row.itemImage}
            alt='cart-item-image'
          />
          <a
            className={`${
              row.isActive ? 'text-amber-700 hover:text-amber-500' : 'text-slate-500'
            } w-[300px] break-words  text-ellipsis text-xs sm:text-sm`}
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
          disabled={!row.isActive}
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
      <TableCell>
        <Box className='flex flex-col w-[250px]'>
          {row.propName.split(';').map((e) => (
            <span key={e}>{e}</span>
          ))}
        </Box>
      </TableCell>
      <TableCell align='right'>
        <Box className='flex flex-col'>
          <span>{formatMoneyToVND(parseFloat(row.vnPrice) * Number(row.quantity))}</span>{' '}
          <span>{formatMoneyToCN(row.price)}</span>
        </Box>
      </TableCell>
      <TableCell align='center' width={'120px'}>
        {row.isActive && (
          <LoadingButton loadingIndicator='Đang chờ...' variant='text' loading={saving} onClick={handleSave}>
            Lưu
          </LoadingButton>
        )}
        <LoadingButton loadingIndicator='Đang chờ...' variant='text' loading={deleting} onClick={handleDelete}>
          Xóa
        </LoadingButton>
      </TableCell>
    </TableRow>
  );
};
