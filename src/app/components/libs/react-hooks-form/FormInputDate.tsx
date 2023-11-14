import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './FormInputProps';

export const FormInputDate = ({ name, control, label }: FormInputProps) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value } }) => {
          return (
            <DatePicker
              value={new Date(value)}
              onChange={onChange}
              format='dd/MM/yyyy'
              className='w-full'
              sx={{ '& .MuiInputBase-root': { '& .MuiInputBase-input': { padding: '8.5px 0 8.5px 14px' } } }}
            />
          )
        }}
      />
    </LocalizationProvider>
  );
};
