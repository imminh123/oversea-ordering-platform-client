import * as React from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import { Close, Edit, MoreVert } from '@mui/icons-material';
import { Button, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { ItemDetail, OrderStatus } from 'features/cart/api/useGetOrderDetail';
import { OrderStatusOptions } from '../order.const';
import { useState } from 'react';
import { formatMoneyToVND } from 'app/utils/helper';
import { useUpdateOrderAdmin } from '../api/useUpdateOrderAdmin';

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
};

export const AdminEditOrder = ({
  status: oldStatus,
  id,
  listItem,
}: {
  status: OrderStatus;
  id: string;
  listItem: ItemDetail[];
}) => {
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
            {listItem.map((e) => {
              return (
                <div key={e.id} className='flex justify-between border-b-[1px] border-b-slate-500 pb-3'>
                  <div className='flex flex-col justify-start items-start'>
                    <span>
                      Tên: <span className='text-cyan-500'>{e.itemName}</span>
                    </span>
                    <span>
                      Thuộc tính: <span className='text-cyan-500'>{e.propName}</span>
                    </span>
                    <span className='flex items-center gap-2'>
                      <span>Số lượng:</span>
                      <span className='text-cyan-500'>
                        <TextField
                          defaultValue={e.quantity}
                          type='number'
                          size='small'
                          onChange={(event) => handleQuantityChange(e.id, parseInt(event.target.value))}
                        />
                      </span>
                    </span>
                    <span>
                      Đơn giá: <span className='text-cyan-500'>{formatMoneyToVND(e.vnCost)}</span>
                    </span>
                  </div>
                  <a key={e.id} href={e.itemUrl} target='_blank' rel='noopener noreferrer'>
                    <img className='max-w-16 max-h-16 overflow-clip mb-2 ml-2' src={e.image} alt={e.itemName} />
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
