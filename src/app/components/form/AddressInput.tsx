import * as React from 'react';
import { InputBaseProps, Stack, StackProps, Typography } from '@mui/material';
import { InputSingleSelect, OptionData } from 'app/components/form/InputSingleSelect';
import { useAddressDataQuery } from 'data-query/useAddressDataQuery';

export type AddressData = {
  province?: string;
  district?: string;
  ward?: string;
};

export interface AddressInputProps {
  value?: AddressData;
  onChange?: (newData: AddressData) => void;
  helperText?: string;
  error?: boolean;
  size?: InputBaseProps['size'];
  sx?: StackProps['sx'];
  spacing?: StackProps['spacing'];
}

export const AddressInput: React.FC<AddressInputProps> = ({
  value,
  onChange,
  helperText,
  error,
  size,
  sx,
  spacing,
}) => {
  const { provinces, districts, wards, loading } = useAddressDataQuery(value);
  const [provinceOpts, setProvinceOpts] = React.useState<OptionData[]>([]);
  const [districtOpts, setDistrictOpts] = React.useState<OptionData[]>([]);
  const [wardOpts, setWardOpts] = React.useState<OptionData[]>([]);

  React.useEffect(() => {
    if (provinces && provinces.length > 0) {
      setProvinceOpts(provinces.map((p) => ({ label: p.name, value: p.name })));
    }
  }, [provinces]);

  React.useEffect(() => {
    if (districts && districts.length > 0) {
      setDistrictOpts(districts.map((d) => ({ label: d.name, value: d.name })));
    }
  }, [districts]);

  React.useEffect(() => {
    if (wards && wards.length > 0) {
      setWardOpts(wards.map((w) => ({ label: w.name, value: w.name })));
    }
  }, [wards]);

  return (
    <Stack sx={sx} spacing={spacing}>
      <InputSingleSelect
        label={'Tỉnh/TP'}
        options={provinceOpts}
        value={value?.province || ''}
        onChange={(e) => {
          if (onChange) {
            onChange(Object.assign({}, value, { province: e.target.value }));
          }
          if (e.target.value !== value?.province) {
            setDistrictOpts([]);
            setWardOpts([]);
          }
        }}
        error={error}
        size={size}
      />
      {districtOpts.length > 0 && (
        <InputSingleSelect
          label={'Quận/Huyện'}
          options={districtOpts}
          value={value?.district || ''}
          onChange={(e) => {
            if (onChange) {
              onChange(Object.assign({}, value, { district: e.target.value }));
            }
            if (e.target.value !== value?.district) {
              setWardOpts([]);
            }
          }}
          error={error}
          size={size}
        />
      )}
      {wardOpts.length > 0 && (
        <InputSingleSelect
          label={'Xã/Phường'}
          options={wardOpts}
          value={value?.ward || ''}
          onChange={(e) => {
            if (onChange) {
              onChange(Object.assign({}, value, { ward: e.target.value }));
            }
          }}
          error={error}
          size={size}
        />
      )}
      {loading && <Typography variant={'body2'}>Loading</Typography>}
    </Stack>
  );
};
