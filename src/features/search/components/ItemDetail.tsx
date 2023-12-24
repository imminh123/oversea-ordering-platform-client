import { Box, Button, CardMedia, Container, Grid, TextField, Typography, styled } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useGetSearchItemDetail } from '../api/useGetSearchDetail';
import { useParams } from 'react-router-dom';
import { useState } from 'react';
import { formatMoneyToCN } from 'app/utils/helper';
import { SkuList } from './SkuList';
import { IAddCartParams, useAddToCart } from '../api/useAddToCart';
import useAlert from 'app/hooks/useAlert';
import Spinner from 'app/layout/async/Spinner';
import { Item } from 'app/utils/Item';
import { LoadingButton } from '@mui/lab';

export const ItemDetail = () => {
  const param: { id: string } = useParams();
  const [mapPVid, setMapPVid] = useState(new Map());
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const handleMapChange = (newMap: any) => {
    const updatedMap = new Map([...mapPVid, ...newMap]);
    setMapPVid(updatedMap);
  };
  const { alertError } = useAlert();

  const { data, isLoading } = useGetSearchItemDetail(param.id, {
    retry: false,
    onError(err) {
      alertError('Không thể tìm thấy hàng hóa trên taobao');
    },
  });
  const { mutateAsync: addToCart, isLoading: adding } = useAddToCart();
  const [currentImg, setCurrentImg] = useState(0);
  const handleSubmit = () => {
    if (!quantity || mapPVid.size !== data?.data.SkuProps.length) {
      alertError('Vui lòng chọn đủ thuộc tính');
      return;
    }
    if (data?.data) {
      const body: IAddCartParams = {
        id: data?.data.OfferId.toString(),
        pvid: [...mapPVid.values()],
        volume: quantity,
      };
      addToCart(body);
    }
  };
  return (
    <>
      <Helmet>
        <title>Chi tiết sản phẩm</title>
      </Helmet>
      <Container maxWidth='lg' className='mt-5'>
        {isLoading && (
          <div className='h-screen text-center flex justify-center items-center'>
            <span>
              <Spinner />
              Đang chờ...
            </span>
          </div>
        )}
        {!isLoading && !!data?.data && (
          <Grid container spacing={2}>
            <Grid item sm={12} md={4} width={'100%'}>
              {!!data?.data.ImageUrls.length && (
                <>
                  <CardMedia
                    component='img'
                    src={data?.data.ImageUrls[currentImg]}
                    className='mb-3'
                    sx={{
                      border: 'solid 1px gray',
                      borderRadius: '5px',
                    }}
                  />
                  <Box className='flex justify-around'>
                    {data?.data.ImageUrls.map((img, index) => (
                      <CardMedia
                        component='img'
                        key={index}
                        sx={{
                          height: 60,
                          width: 60,
                          maxHeight: { xs: 60, md: 45 },
                          maxWidth: { xs: 60, md: 45 },
                          border: index === currentImg ? 'solid 1px red' : 'solid 1px gray',
                          cursor: 'pointer',
                          '&:hover': {
                            border: index === currentImg ? 'solid 2px red' : 'solid 2px gray',
                            borderRadius: '5px',
                          },
                        }}
                        onClick={() => {
                          setCurrentImg(index);
                        }}
                        src={img}
                      />
                    ))}
                  </Box>
                </>
              )}
            </Grid>
            <Grid item sm={12} md={8} width={'100%'}>
              <Box className='flex flex-col gap-2'>
                <Typography variant='h6' color='primary' sx={{ mb: 4, '&:hover': { color: 'red' } }} align='left'>
                  {data?.data.Subject}
                </Typography>
                <Grid container spacing={1} width={'100%'}>
                  <Grid item xs={12} sm={2}>
                    Shop:
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <a href={data?.data.ShopUrl} target='_blank' rel='noopener noreferrer'>
                      {data?.data.ShopName}
                    </a>
                  </Grid>
                </Grid>
                <Grid container spacing={1} width={'100%'}>
                  <Grid item xs={12} sm={2}>
                    Giá:
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    {formatMoneyToCN(data?.data.PriceRangeInfos[0].Price)}
                  </Grid>
                </Grid>
                {data?.data.SkuProps.map((sku, index) => (
                  <Grid key={index} container spacing={1}>
                    <SkuList
                      sku_props={sku}
                      emitValue={(value: any) => {
                        handleMapChange(value);
                      }}
                    />
                  </Grid>
                ))}
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={2}>
                    Số lượng:
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      type='number'
                      value={quantity}
                      onChange={(e) => {
                        parseInt(e.target.value) > 0 && setQuantity(parseInt(e.target.value));
                      }}
                    />
                  </Grid>
                </Grid>
                <Grid container spacing={1}>
                  <Grid item xs={12} sm={2}>
                    Ghi chú:
                  </Grid>
                  <Grid item xs={12} sm={10}>
                    <TextField
                      fullWidth
                      placeholder='Ghi chú'
                      multiline={true}
                      rows={3}
                      autoComplete='off'
                      variant='outlined'
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                    />
                    <LoadingButton
                      loadingIndicator='Đang chờ...'
                      className=' !mt-4'
                      onClick={handleSubmit}
                      variant={'contained'}
                      loading={adding || !quantity || mapPVid.size === 0}
                    >
                      Thêm vào giỏ hàng
                    </LoadingButton>
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>
        )}
        {!isLoading && !data?.data && <Item elevation={3}>Không thể tìm thấy hàng hóa trên taobao</Item>}
      </Container>
    </>
  );
};
