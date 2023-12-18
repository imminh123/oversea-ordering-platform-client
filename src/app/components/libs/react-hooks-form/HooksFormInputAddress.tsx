import * as React from 'react';
import { BaseHooksFormInputProps } from 'app/components/libs/react-hooks-form/index';
import { AddressInput, AddressInputProps } from 'app/components/form/AddressInput';
import { Controller, useFormContext } from 'react-hook-form';

export type HooksFormInputAddressProps = BaseHooksFormInputProps & Omit<AddressInputProps, 'value' | 'onChange'>;

export const HooksFormInputAddress: React.FC<HooksFormInputAddressProps> = ({ fieldName, ...rest }) => {
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

        return <AddressInput {...rest} {...field} error={isError} helperText={helperText} disabled={disabled} />;
      }}
      name={fieldName}
      control={control}
    />
  );
};
