import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { Radio } from '@mui/material';

export const ChoosePaymentMethod = ({ open, setOpen, pay }: { open: boolean; setOpen: (e: any) => void; pay: any }) => {
  const [selectedValue, setSelectedValue] = React.useState('');
  const handleInputChange = (event: any) => {
    setSelectedValue(event.target.value);
  };
  const handleClose = () => {
    setOpen(false);
    setSelectedValue('');
  };

  return (
    <React.Fragment>
      <Dialog fullWidth open={open} onClose={handleClose}>
        <DialogTitle>Chọn phương thức thanh toán</DialogTitle>
        <DialogContent>
          <div className='flex flex-col items-center gap-3'>
            <input
              type='radio'
              id='vn-pay'
              name='payment-method'
              value='vnpay'
              checked={selectedValue === 'vnpay'}
              onChange={handleInputChange}
              className='hidden peer/vnpay'
            />
            <label
              htmlFor='vn-pay'
              className='cursor-pointer w-full rounded-lg p-2 border border-slate-500 peer-checked/vnpay:border-sky-500'
            >
              <div className='flex justify-between items-center'>
                <div className='flex gap-1'>
                  <Radio value='vnpay' checked={selectedValue === 'vnpay'} onChange={handleInputChange} />
                  <img
                    src='https://www.ppro.com/wp-content/uploads/2021/06/VNPAYQR-logo.png'
                    alt='vn-pay'
                    className='w-auto h-10 bg-cover object-cover'
                  />
                </div>
                <span>Ví điện tử VNPAY/ VNPAY QR</span>
              </div>
            </label>

            <input
              type='radio'
              id='momo'
              disabled
              name='payment-method'
              value='momo'
              checked={selectedValue === 'momo'}
              onChange={handleInputChange}
              className='hidden peer/momo'
            />
            <label
              htmlFor='momo'
              className='cursor-pointer w-full rounded-lg p-2 border border-slate-500 peer-checked/momo:border-sky-500 peer-disabled/momo:border-slate-200 peer-disabled/momo:bg-slate-200 peer-disabled/momo:cursor-not-allowed'
            >
              <div className='flex justify-between items-center'>
                <div className='flex gap-1'>
                  <Radio disabled value='momo' checked={selectedValue === 'momo'} onChange={handleInputChange} />
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
              checked={selectedValue === 'zalopay'}
              onChange={handleInputChange}
              className='hidden peer/zalopay'
            />
            <label
              htmlFor='zalopay'
              className='cursor-pointer w-full rounded-lg p-2 border border-slate-500 peer-checked/zalopay:border-sky-500 peer-disabled/zalopay:border-slate-200 peer-disabled/zalopay:bg-slate-200 peer-disabled/zalopay:cursor-not-allowed'
            >
              <div className='flex justify-between items-center'>
                <div className='flex gap-1'>
                  <Radio disabled value='zalopay' checked={selectedValue === 'zalopay'} onChange={handleInputChange} />
                  <img
                    src='https://imgs.search.brave.com/G-JsBGx4puWGhlIeBlbKHYFSHWpPAJjS3nKOaKDgPnw/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9jZG4u/aGFpdHJpZXUuY29t/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDIy/LzEwL0xvZ28tWmFs/b1BheS5wbmc'
                    alt='Zalopay'
                    className='w-auto h-10 bg-cover object-cover'
                  />
                </div>
                <span>Ví điện tử ZaloPay</span>
              </div>
            </label>
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              pay(selectedValue);
              handleClose();
            }}
          >
            THANH TOÁN
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
};
