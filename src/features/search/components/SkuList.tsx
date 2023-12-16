import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { SkuProps } from '../api/useGetSearchDetail';

interface Props {
  props: { value: string; name: string; imageUrl: string };
  selectedValue: string;
  setValue: any;
  IsImg: boolean;
}

const PropItem = ({ props, selectedValue, setValue, IsImg }: Props) => {
  const [selected, setSelected] = useState<any>();
  const handleSelected = () => {
    setSelected(props.value);
    setValue(props.value);
  };
  if (IsImg) {
    return (
      <img
        src={props.imageUrl}
        alt={props.name}
        className={`border-2 border-solid h-10 w-10 bg-cover hover:bg-slate-100 cursor-pointer mb-1 mx-1 ${
          selected === selectedValue ? 'border-sky-500' : ''
        }`}
        onClick={handleSelected}
      />
    );
  } else {
    return (
      <div
        className={`h-10 w-auto border-2 border-solid hover:bg-slate-100 justify-center items-center flex text-slate-500 cursor-pointer mb-1 mx-1 ${
          selected === selectedValue ? 'border-sky-500' : ''
        }`}
        onClick={handleSelected}
      >
        <span title={props.name} className='mx-2 inline-block overflow-hidden whitespace-nowrap'>
          {props.name}
        </span>
      </div>
    );
  }
};

export const SkuList = ({ sku_props, emitValue }: { sku_props: SkuProps; emitValue: any }) => {
  const [vid, setVid] = useState('');
  const [myMap, setMyMap] = useState(new Map());

  const handleChangeId = (id: string) => {
    setVid(id);
    handleMapChange(sku_props.Prop, id);
  };

  const handleMapChange = (key: string, value: string) => {
    const updatedMap = new Map(myMap);
    updatedMap.set(key, value);
    emitValue(updatedMap);
    setMyMap(updatedMap);
  };

  return (
    <React.Fragment>
      <Grid item xs={12} sm={2}>
        {sku_props.Prop}:
      </Grid>
      <Grid item xs={12} sm={10}>
        <Grid container className='w-full'>
          {sku_props.Value.map((p) => (
            <Grid item gap={1} key={p.value}>
              <PropItem IsImg={sku_props.IsImg} selectedValue={vid} setValue={handleChangeId} props={p} />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </React.Fragment>
  );
};
