import * as React from 'react';

import { Controller, useFormContext } from 'react-hook-form';
import dayjs from 'dayjs';

import { BaseHooksFormInputProps } from 'app/components/libs/react-hooks-form/index';
import { InputSingleDatePicker, InputSingleDatePickerProps } from 'app/components/form/InputSingleDatePicker';

export type HooksFormInputSingleDatePickerProps = BaseHooksFormInputProps &
  Omit<InputSingleDatePickerProps, 'value' | 'onChange'>;

export const HooksFormInputSingleDatePicker: React.FC<HooksFormInputSingleDatePickerProps> = ({
  fieldName,
  ...rest
}) => {
  const {
    control,
    getFieldState,
    formState: { errors },
  } = useFormContext();

  return (
    <Controller
      render={({ field: { ref, ...field } }) => {
        const fieldState = getFieldState(fieldName);

        let helperText = rest.helperText;
        let isError = rest.error;
        let disabled = rest.disabled;

        if (fieldState.invalid) {
          isError = true;
          helperText = fieldState.error?.message?.toString();
        }

        return (
          <InputSingleDatePicker
            {...rest}
            {...field}
            value={dayjs(field.value)}
            error={isError}
            helperText={helperText}
            disabled={disabled}
            format={'DD/MM/YYYY'}
            sx={{ '& .MuiInputBase-root': { '& .MuiInputBase-input': { padding: '8.5px 0 8.5px 14px' } } }}
          />
        );
      }}
      name={fieldName}
      control={control}
    />
  );
};
