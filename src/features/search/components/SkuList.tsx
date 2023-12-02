import { Box, Grid } from '@mui/material';
import React, { useState } from 'react';
import { SkuProps } from '../api/useGetSearchDetail';

interface Props {
  props: { vid: string; name: string; imageUrl: string };
  selectedVid: string;
  setVid: any;
}

const PropItem = ({ props, selectedVid: id, setVid: setId }: Props) => {
  const [selected, setSelected] = useState<any>();
  const handleSelected = () => {
    setSelected(props.vid);
    setId(props.vid);
  };
  if (!!props.imageUrl) {
    return (
      <img
        src={props.imageUrl}
        alt={props.name}
        className={`border-2 border-solid h-10 w-10 bg-cover hover:bg-slate-100 cursor-pointer ${
          selected === id ? 'border-sky-500' : ''
        }`}
        onClick={handleSelected}
      />
    );
  } else {
    return (
      <div
        className={`h-10 w-10 border-2 border-solid hover:bg-slate-100 justify-center items-center flex text-slate-500 cursor-pointer ${
          selected === id ? 'border-sky-500' : ''
        }`}
        onClick={handleSelected}
      >
        {props.name}
      </div>
    );
  }
};

export const SkuList = ({ sku_props: sku, emitVid }: { sku_props: SkuProps; emitVid: any }) => {
  const [vid, setVid] = useState('');
  const [myMap, setMyMap] = useState(new Map());

  const handleChangeId = (id: string) => {
    setVid(id);
    // emitVid(`${sku.pid}:${id}`);
    handleMapChange(sku.pid, id);
  };

  const handleMapChange = (key: string, value: string) => {
    const updatedMap = new Map(myMap);
    updatedMap.set(key, value);
    emitVid(updatedMap);
    setMyMap(updatedMap);
  };

  return (
    <React.Fragment>
      <Grid item xs={12} sm={2}>
        {sku.prop_name}:
      </Grid>
      <Grid item xs={12} sm={10}>
        <Box className='flex gap-1 w-full'>
          {sku.values.map((p) => (
            <PropItem selectedVid={vid} setVid={handleChangeId} key={p.vid} props={p} />
          ))}
        </Box>
      </Grid>
    </React.Fragment>
  );
};
