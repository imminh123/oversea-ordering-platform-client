import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Close, Edit, MoreVert } from '@mui/icons-material';
import {
  Button,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ItemDetail, OrderStatus } from 'features/cart/api/useGetOrderDetail';
import { OrderStatusOptions } from '../order.const';
import { useState } from 'react';
import { formatMoneyToVND } from 'app/utils/helper';
import { useUpdateOrderAdmin } from '../api/useUpdateOrderAdmin';

export const AdminEditOrder = ({
  status: oldStatus,
  id,
  listItem,
}: {
  status: OrderStatus;
  id: string;
  listItem: ItemDetail[];
}) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    boxShadow: 24,
    minWidth: '375px',
    width: '50%',
    p: 4,
    pt: 1,
    overflow: 'auto',
    ...(matchesSM && {
      overflow: 'scroll',
      height: '100%',
      display: 'block',
    }),
  };
  const defaultMap = new Map(listItem.map((i) => [i.id, i.quantity]));
  const [open, setOpen] = React.useState(false);
  const [status, setStatus] = useState<OrderStatus>(oldStatus);
  const [itemProps, setItemProps] = useState(defaultMap);
  const { mutateAsync: updateOrder, isLoading } = useUpdateOrderAdmin();
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setItemProps(defaultMap);
  };
  const handleInputChange = (event: any, type: string) => {
    switch (type) {
      case 'status':
        setStatus(event.target.value);
        break;
    }
  };
  const handleQuantityChange = (key: string, value: number) => {
    const newMap = new Map(itemProps);
    newMap.set(key, value);
    const updatedMap = new Map([...itemProps, ...newMap]);
    setItemProps(updatedMap);
  };
  const onSubmit = async () => {
    const updatedItems = Array.from(itemProps, ([key, value]) => {
      return { id: key, quantity: value };
    });
    updateOrder({ id, body: { status, listItem: updatedItems } });
    handleClose();
  };
  return (
    <React.Fragment>
      <Button aria-label='edit-order' variant={'outlined'} onClick={handleOpen} size='small' startIcon={<Edit />}>
        Cập nhật đơn hàng
      </Button>
      <Modal open={open} onClose={handleClose} aria-labelledby='edit variable modal'>
        <Box sx={style}>
          <Box className='flex justify-end'>
            <IconButton onClick={handleClose} aria-label='close' title='close'>
              <Close />
            </IconButton>
          </Box>
          <Typography id='keep-mounted-modal-title' variant='h6' component='h2'>
            Cập nhật đơn hàng
          </Typography>
          <Box className='flex flex-col gap-3 mt-3'>
            <Box display={'flex'} className=' justify-between'>
              <span className='flex-1'>Trạng thái:</span>
              <span className='flex-1'>
                <FormControl fullWidth>
                  <InputLabel size='small' id='status-select-label'>
                    Trạng thái đơn hàng
                  </InputLabel>
                  <Select
                    labelId='status-select-label'
                    id='status-select'
                    size='small'
                    variant='outlined'
                    value={status || ''}
                    label='Trạng thái đơn hàng'
                    onChange={(e) => handleInputChange(e, 'status')}
                  >
                    {OrderStatusOptions.map((status, index) => {
                      return (
                        <MenuItem key={index} value={status.value}>
                          {status.label}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </span>
            </Box>

            {listItem.map((e) => {
              return (
                <div
                  key={e.id}
                  className='w-full flex flex-col sm:flex-row items-center justify-between border-b-[1px] border-b-slate-500 pb-3'
                >
                  <div className='flex flex-col justify-start items-start gap-1'>
                    <span className='w-full flex justify-between'>
                      <span>Tên:</span> <span className='text-amber-500 text-right'>{e.itemName}</span>
                    </span>
                    <span className='w-full flex justify-between'>
                      <span>Thuộc tính:</span> <span className='text-amber-500 text-right'>{e.propName}</span>
                    </span>
                    <span className='flex items-center justify-between gap-2 w-full'>
                      <span>Số lượng:</span>
                      <span className='text-amber-500'>
                        <TextField
                          defaultValue={e.quantity}
                          type='number'
                          size='small'
                          sx={{ width: '100px' }}
                          onChange={(event) => handleQuantityChange(e.id, parseInt(event.target.value))}
                          InputProps={{ inputProps: { min: 0, max: e.quantity } }}
                        />
                      </span>
                    </span>
                    <span className='w-full flex justify-between'>
                      <span>Đơn giá:</span> <span className='text-amber-500'>{formatMoneyToVND(e.vnCost)}</span>
                    </span>
                  </div>
                  <a key={e.id} href={e.itemUrl} target='_blank' rel='noopener noreferrer'>
                    <img className='sm:max-w-40 sm:max-h-40 overflow-clip my-2 ml-2' src={e.image} alt={e.itemName} />
                  </a>
                </div>
              );
            })}
            <Box className='flex justify-end'>
              <Button sx={{ width: 'fit-content' }} variant={'contained'} onClick={onSubmit} disabled={isLoading}>
                Lưu
              </Button>
            </Box>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
};
