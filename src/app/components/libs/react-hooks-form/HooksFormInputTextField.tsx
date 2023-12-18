import * as React from 'react';

import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';

import { BaseHooksFormInputProps } from 'app/components/libs/react-hooks-form/index';

export type HooksFormInputTextFieldProps = BaseHooksFormInputProps & TextFieldProps;

export const HooksFormInputTextField: React.FC<HooksFormInputTextFieldProps> = ({ fieldName, ...rest }) => {
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

        return <TextField {...rest} {...field} error={isError} helperText={helperText} disabled={disabled} />;
      }}
      name={fieldName}
      control={control}
    />
  );
};
