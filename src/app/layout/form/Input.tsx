import { TextField, TextFieldProps } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

type Props = {
  control: Control | any;
  name: string;
  label?: string;
  type?: 'text' | 'password' | 'number';
  fullWidth?: boolean;
  variant?: TextFieldProps['variant'];
  isError: boolean;
  errorMessage?: string;
  startIcon?: React.ReactNode;
  size?: TextFieldProps['size'];
  endIcon?: React.ReactNode;
  multipleSelect?: boolean;
  customRenderSelect?: (selected: any) => string | JSX.Element;
};

const Input: React.FC<Props & TextFieldProps> = ({
  control,
  name,
  label,
  fullWidth = true,
  type = 'text',
  variant = 'outlined',
  isError,
  errorMessage,
  startIcon,
  size = 'medium',
  endIcon,
  multipleSelect,
  defaultValue,
  customRenderSelect,
  ...rest
}) => {
  const { t } = useTranslation();
  return (
    <Controller
      render={({ field }) => {
        return (
          <TextField
            SelectProps={
              multipleSelect
                ? {
                    multiple: true,
                    renderValue: (selected) => {
                      if (customRenderSelect) {
                        return customRenderSelect(selected);
                      }

                      return (selected as string[]).join(', ');
                    },
                    ...field,
                  }
                : undefined
            }
            type={type}
            label={label && t(label as string)}
            fullWidth={fullWidth}
            variant={variant}
            autoComplete='off'
            error={isError}
            helperText={Boolean(errorMessage) && t(errorMessage!)}
            size={size}
            InputProps={{
              endAdornment: endIcon,
              startAdornment: startIcon,
            }}
            {...field}
            {...rest}
          />
        );
      }}
      control={control}
      name={name}
    />
  );
};

export default Input;
