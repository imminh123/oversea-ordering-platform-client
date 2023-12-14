import * as React from 'react';
import { BaseHooksFormInputProps } from 'app/components/libs/react-hooks-form/index';
import { InputSingleSelect, InputSingleSelectProps } from 'app/components/form/InputSingleSelect';
import { Controller, useFormContext } from 'react-hook-form';

export type HooksFormInputSingleSelectProps = BaseHooksFormInputProps &
  Omit<InputSingleSelectProps, 'value' | 'onChange'>;

export const HooksFormInputSingleSelect: React.FC<HooksFormInputSingleSelectProps> = ({ fieldName, ...rest }) => {
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

        return <InputSingleSelect {...rest} {...field} error={isError} helperText={helperText} disabled={disabled} />;
      }}
      name={fieldName}
      control={control}
    />
  );
};
