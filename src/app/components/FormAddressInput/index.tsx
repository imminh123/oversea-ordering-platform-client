import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { District, DistrictShema, Province, ProvinceSchema, Ward } from './AddressStruct';
import { array, mask } from 'superstruct';
import axios from 'axios';

const PROVINCE_OPENAI_URL = 'https://provinces.open-api.vn/api';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};
export const FormAddressInput = ({
  onChangeAdress,
  defaultVal,
}: {
  onChangeAdress: any;
  defaultVal: { province?: string; district?: string; ward?: string };
}) => {
  const [province, setProvince] = React.useState<Province | null>(null);
  const [district, setDistrict] = React.useState<District | null>(null);
  const [ward, setWard] = React.useState<Ward | null>(null);
  const [filteredProvinces, setFilteredProvinces] = React.useState<Province[]>([]);
  const [filteredDistricts, setFilteredDistricts] = React.useState<District[]>([]);
  const [filteredWards, setFilteredWards] = React.useState<Ward[]>([]);

  const handleChangeprovince = (p: Province) => {
    setProvince(p);
    resetDistrict();
    resetWard();
    onChangeAdress({ province: p?.name, district: district?.name, ward: ward?.name });
  };

  const handleChangeDistrict = (d: District) => {
    setDistrict(d);
    resetWard();
    onChangeAdress({ province: province?.name, district: d?.name, ward: ward?.name });
  };

  const handleChangeWard = (w: Ward) => {
    setWard(w);
    onChangeAdress({ province: province?.name, district: district?.name, ward: w?.name });
  };

  async function fetchProvinces() {
    const rdata = await axios.get(`${PROVINCE_OPENAI_URL}/p/`).then((res) => {
      return res.data;
    });
    setFilteredProvinces(mask(rdata, array(ProvinceSchema)));
  }

  async function fetchDistricts(provinceCode: number) {
    const rdata = await axios.get(`${PROVINCE_OPENAI_URL}/p/${provinceCode}`, { params: { depth: 2 } }).then((res) => {
      return res.data;
    });
    const province = mask(rdata, ProvinceSchema);
    setFilteredDistricts(province.districts);
  }

  async function fetchWards(districtCode: number) {
    const rdata = await axios.get(`${PROVINCE_OPENAI_URL}/d/${districtCode}`, { params: { depth: 2 } }).then((res) => {
      return res.data;
    });
    const district = mask(rdata, DistrictShema);
    setFilteredWards(district.wards);
  }

  async function startSearchingProvince() {
    if (!filteredProvinces.length) {
      await fetchProvinces();
    }
  }

  async function startSearchingDistrict() {
    if (filteredDistricts.length || !province) {
      return;
    }
    await fetchDistricts(province.code);
  }

  async function startSearchingWard() {
    if (filteredWards.length || !district) {
      return;
    }
    await fetchWards(district.code);
  }

  function resetDistrict() {
    setDistrict(null);
    setFilteredDistricts([]);
  }

  function resetWard() {
    setWard(null);
    setFilteredWards([]);
  }

  return (
    <Box display={'flex'} flexDirection={'column'} gap={'12px'} sx={{ minWidth: 120 }}>
      <FormControl fullWidth className='relative'>
        <InputLabel id='select-province' sx={{ '&[data-shrink=false]': { marginTop: '-8.5px' } }}>
          Province
        </InputLabel>
        <Select
          labelId='select-province'
          id='select-province-input'
          label='Province'
          value={province?.name || defaultVal?.province || ''}
          onFocus={startSearchingProvince}
          MenuProps={MenuProps}
          sx={{ '& .MuiInputBase-input': { padding: '8.5px 0 8.5px 14px' } }}
        >
          {!filteredProvinces.length && <MenuItem value={defaultVal?.province}>{defaultVal?.province}</MenuItem>}
          {filteredProvinces.length &&
            filteredProvinces.map((item) => {
              return (
                <MenuItem key={item.code} value={item.name} onClick={() => handleChangeprovince(item)}>
                  {item.name}
                </MenuItem>
              );
            })}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='select-district' sx={{ '&[data-shrink=false]': { marginTop: '-8.5px' } }}>
          District
        </InputLabel>
        <Select
          labelId='select-district'
          id='select-district-input'
          label='District'
          value={district?.name || defaultVal?.district || ''}
          onFocus={startSearchingDistrict}
          MenuProps={MenuProps}
          sx={{ '& .MuiInputBase-input': { padding: '8.5px 0 8.5px 14px' } }}
        >
          {!filteredDistricts.length && <MenuItem value={defaultVal?.district}>{defaultVal?.district}</MenuItem>}
          {filteredDistricts.length > 0 ? (
            filteredDistricts.map((item) => {
              return (
                <MenuItem key={item.code} value={item.name} onClick={() => handleChangeDistrict(item)}>
                  {item.name}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value={''}>Choose Province first</MenuItem>
          )}
        </Select>
      </FormControl>
      <FormControl fullWidth>
        <InputLabel id='select-ward' sx={{ '&[data-shrink=false]': { marginTop: '-8.5px' } }}>
          Ward
        </InputLabel>
        <Select
          labelId='select-ward'
          id='select-ward-input'
          label='Ward'
          value={ward?.name || defaultVal?.ward || ''}
          onFocus={startSearchingWard}
          MenuProps={MenuProps}
          sx={{ '& .MuiInputBase-input': { padding: '8.5px 0 8.5px 14px' } }}
        >
          {!filteredWards.length && <MenuItem value={defaultVal?.ward}>{defaultVal?.ward}</MenuItem>}

          {filteredWards.length > 0 ? (
            filteredWards.map((item) => {
              return (
                <MenuItem key={item.code} value={item.name} onClick={() => handleChangeWard(item)}>
                  {item.name}
                </MenuItem>
              );
            })
          ) : (
            <MenuItem value={''}>Choose District first</MenuItem>
          )}
        </Select>
      </FormControl>
    </Box>
  );
};
