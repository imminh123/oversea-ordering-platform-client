import { Box, Button, Card, CardMedia, Container, Grid, Tab, Tabs, TextField, Typography } from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useGetSearchItemDetail } from '../api/useGetSearchDetail';
import { useLocation, useParams } from 'react-router-dom';
import queryString from 'query-string';
import { useState } from 'react';
import { formatMoneyToCN } from 'app/utils/helper';
import { SkuList } from './SkuList';
import { IAddCartParams, useAddToCart } from '../api/useAddToCart';
import useAlert from 'app/hooks/useAlert';
import { LoadingCard, NoItemFound } from 'app/components/Item';
import { LoadingButton } from '@mui/lab';

export const ItemDetail = () => {
  const param: { id: string } = useParams();
  const [mapPVid, setMapPVid] = useState(new Map());
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState<number>(1);
  const [tabValue, setTabValue] = useState('one');
  const { search } = useLocation();
  const values = queryString.parse(search);
  const url: string = values.url && typeof values.url === 'string' ? values.url : '';

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
  console.log('🚀 ~ file: ItemDetail.tsx:36 ~ ItemDetail ~ data:', data);
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

  const handleChangeTab = (event: React.SyntheticEvent, newValue: string) => {
    setTabValue(newValue);
  };

  return (
    <>
      <Helmet>
        <title>Chi tiết sản phẩm</title>
      </Helmet>
      <Container maxWidth='lg' className='mt-5'>
        {isLoading && <LoadingCard />}
        {!isLoading && !!data?.data && (
          <>
            <Grid container spacing={2}>
              <Grid item sm={12} md={4} width={'100%'}>
                {!!data?.data.ImageUrls.length && (
                  <>
                    {currentImg === 0 && !!data?.data.MainImageVideo ? (
                      <CardMedia
                        component='video'
                        src={data?.data.MainImageVideo}
                        className='mb-3'
                        autoPlay
                        sx={{
                          border: 'solid 1px gray',
                          borderRadius: '5px',
                          maxWidth: 300,
                          maxHeight: 400,
                        }}
                      />
                    ) : (
                      <CardMedia
                        component='img'
                        src={data?.data.ImageUrls[currentImg - 1]}
                        className='mb-3'
                        id='myimage'
                        sx={{
                          border: 'solid 1px gray',
                          borderRadius: '5px',
                          maxWidth: 300,
                          maxHeight: 400,
                        }}
                      />
                    )}
                    <Grid gap={1} container>
                      {!!data?.data.MainImageVideo && (
                        <Grid item>
                          <CardMedia
                            component='video'
                            sx={{
                              height: 60,
                              width: 60,
                              maxHeight: { xs: 60, md: 45 },
                              maxWidth: { xs: 60, md: 45 },
                              border: currentImg === 0 ? 'solid 1px red' : 'solid 1px gray',
                              cursor: 'pointer',
                              '&:hover': {
                                border: currentImg === 0 ? 'solid 2px red' : 'solid 2px gray',
                                borderRadius: '5px',
                              },
                            }}
                            onClick={() => {
                              setCurrentImg(0);
                            }}
                            src={data.data.MainImageVideo}
                          />
                        </Grid>
                      )}
                      {data?.data.ImageUrls.map((img, index) => (
                        <Grid key={index} item>
                          <CardMedia
                            component='img'
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
                              setCurrentImg(index + 1);
                            }}
                            src={img}
                          />
                        </Grid>
                      ))}
                    </Grid>
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

                      <Box sx={{ display: 'flex', alignItems: 'center', marginTop: 3 }}>
                        <LoadingButton
                          loadingIndicator='Đang chờ...'
                          onClick={handleSubmit}
                          variant={'contained'}
                          loading={adding}
                          disabled={!quantity || mapPVid.size === 0}
                        >
                          Thêm vào giỏ hàng
                        </LoadingButton>
                        <a href={`${url}`} target='_blank' rel='noopener noreferrer'>
                          <Button variant='text' size='small'>
                            Mở trên Taobao
                          </Button>
                        </a>
                      </Box>
                    </Grid>
                  </Grid>
                </Box>
              </Grid>
            </Grid>
            <Box sx={{ width: '100%', marginTop: 5 }}>
              <Tabs
                value={tabValue}
                onChange={handleChangeTab}
                textColor='primary'
                indicatorColor='primary'
                aria-label='primary tabs example'
              >
                <Tab value='one' label='Thông tin sản phẩm' />
                <Tab value='two' label='Thông tin vận chuyển' />
                <Tab value='three' label='Thông tin shop' />
              </Tabs>

              {tabValue === 'one' && (
                <Card sx={{ p: 3, mt: 2 }}>
                  <ul>
                    {Object.entries(data.data.ProductFeatures).map(([key, value]) => (
                      <li key={key}>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {tabValue === 'two' && (
                <Card sx={{ p: 3, mt: 2 }}>
                  <ul>
                    {Object.entries(data.data.Delivery).map(([key, value]) => (
                      <li key={key}>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}

              {tabValue === 'three' && (
                <Card sx={{ p: 3, mt: 2 }}>
                  <ul>
                    {Object.entries(data.data.ShopInfo).map(([key, value]) => (
                      <li key={key}>
                        {key}: {value}
                      </li>
                    ))}
                  </ul>
                </Card>
              )}
            </Box>
          </>
        )}
        {!isLoading && !data?.data && <NoItemFound text='Không thể tìm thấy hàng hóa trên taobao' />}
      </Container>
    </>
  );
};
