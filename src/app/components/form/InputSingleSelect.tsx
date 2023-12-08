import * as React from 'react';

import { v4 as uuidV4 } from 'uuid';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectProps } from '@mui/material';

export interface OptionData {
  label: string;
  value: string;
}

export type InputSingleSelectProps = {
  options: OptionData[];
  helperText?: string;
} & SelectProps;

export const InputSingleSelect: React.FC<InputSingleSelectProps> = ({ options, helperText, ...rest }) => {
  return (
    <FormControl error={rest.error} size={rest.size}>
      <InputLabel>{rest.label}</InputLabel>
      <Select {...rest}>
        {options.map((opt) => (
          <MenuItem key={uuidV4()} value={opt.value}>
            {opt.label}
          </MenuItem>
        ))}
      </Select>
      <FormHelperText>{helperText}</FormHelperText>
    </FormControl>
  );
};
