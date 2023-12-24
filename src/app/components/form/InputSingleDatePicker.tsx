import * as React from 'react';

import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers';
import { FormControl, FormHelperText } from '@mui/material';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

export type InputSingleDatePickerProps = DatePickerProps<any> & {
  error?: boolean;
  helperText?: string;
};

export const InputSingleDatePicker: React.FC<InputSingleDatePickerProps> = ({ ...rest }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <FormControl error={rest.error}>
        <DatePicker {...rest} />
        <FormHelperText>{rest.helperText}</FormHelperText>
      </FormControl>
    </LocalizationProvider>
  );
};
