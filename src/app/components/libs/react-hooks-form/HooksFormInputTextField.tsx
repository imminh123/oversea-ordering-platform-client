import * as React from 'react';

import { TextField, TextFieldProps } from '@mui/material';
import { Controller, useFormContext } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

import { BaseHooksFormInputProps } from 'app/components/libs/react-hooks-form/index';

export type HooksFormInputTextFieldProps = BaseHooksFormInputProps & TextFieldProps;

export const HooksFormInputTextField: React.FC<HooksFormInputTextFieldProps> = ({ fieldName, ...rest }) => {
  const { t } = useTranslation();

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

        if (fieldState.invalid) {
          isError = true;
          helperText = fieldState.error?.message?.toString();
        }

        return (
          <TextField
            {...rest}
            {...field}
            error={isError}
            helperText={helperText ? (typeof helperText === 'string' ? t(helperText) : helperText) : undefined}
          />
        );
      }}
      name={fieldName}
      control={control}
    />
  );
};
