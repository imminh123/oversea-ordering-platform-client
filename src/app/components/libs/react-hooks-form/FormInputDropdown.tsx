import React from 'react';
import { FormControl, InputLabel, MenuItem, Select } from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './FormInputProps';

interface FormInputDropsownProps extends FormInputProps {
  options: { label: string; value: string }[];
}

export const FormInputDropdown: React.FC<FormInputDropsownProps> = ({ name, control, label, options }) => {

  return (
    <FormControl fullWidth size={'small'}>
      <InputLabel>{label}</InputLabel>
      <Controller
        render={({ field: { onChange, value } }) => {
          return (
            <Select onChange={onChange} value={value} label={label}>
            {options.map((option: any) => {
              return (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              );
            })}
          </Select>
          )
        }}
        control={control}
        name={name}
      />
    </FormControl>
  );
};
