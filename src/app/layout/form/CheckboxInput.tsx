import { Checkbox, CheckboxProps, FormControlLabel } from '@mui/material';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';

interface Props {
  control: Control | any;
  name: string;
  label: string;
}

const CheckboxInput: React.FC<Props & CheckboxProps> = ({ control, name, label, ...rest }) => {
  const { t } = useTranslation();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        return (
          <FormControlLabel
            label={t(label)}
            control={
              <Checkbox
                color='primary'
                {...rest}
                {...field}
                checked={field.value}
                onChange={(e) => field.onChange(e.target.checked)}
              />
            }
            // {...field}
          />
        );
      }}
    />
  );
};

export default CheckboxInput;
