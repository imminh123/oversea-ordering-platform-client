import { Box, Button, CardContent, Container, Divider, Paper, Typography, styled, useMediaQuery } from '@mui/material';
import { formatMoneyToVND } from 'app/utils/helper';
import { useParams } from 'react-router-dom';
import { useGetOrder } from '../api/useOrderDetail';
import { mappingStatus } from '..';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import Spinner from 'app/layout/async/Spinner';
import { AdminEditOrder } from './AdminEditOrder';

const Card = styled(Paper)(({ theme }) => {
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  return {
    minHeight: '100%',
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    ...theme.typography.body2,
    textAlign: 'center',
    backgroundColor: '#f2f2f2',
    ...(matchesSM && {
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      marginBottom: '35px',
    }),
  };
});

export const OrderDetailAdmin = () => {
  const param: { id: string } = useParams();
  const { data, isLoading } = useGetOrder(param.id);

  return (
    <>
      <Helmet>
        <title>Chi tiết Đơn hàng</title>
      </Helmet>
      <Container className='mt-5'>
        {!!data?.data && !isLoading && (
          <Card variant='elevation'>
            <Box className='flex justify-between flex-col sm:flex-row'>
              <Typography variant='h5' textAlign={'left'} sx={{ mb: 2 }}>
                Chi tiết đơn hàng
              </Typography>
              <AdminEditOrder id={param.id} status={data.data.status} listItem={data.data.listItem} />
            </Box>
            <Box display={'flex'} className=' justify-between'>
              <span>Trạng thái:</span>
              <span>{mappingStatus(data?.data.status)}</span>
            </Box>
            <Box display={'flex'} className=' justify-between'>
              <span>Tiền hàng:</span>
              <span>{formatMoneyToVND(data?.data.total || 0)}</span>
            </Box>

            <Box display={'flex'} className=' justify-between'>
              <span>Mã đơn hàng:</span>
              <span>{data?.data.id}</span>
            </Box>
            <Box display={'flex'} className=' justify-between'>
              <span>Ngày thanh toán:</span>
              <span>{moment(data?.data.createdAt).calendar()}</span>
            </Box>
            <Box display={'flex'} className=' justify-between'>
              <span>Kho hàng:</span>
              <span>{data?.data.wareHouseAddress || '-'}</span>
            </Box>
            <Box display={'flex'} className='sm:justify-between flex-col sm:flex-row items-start'>
              <span>Sản phẩm:</span>
              <span>
                {data?.data.listItem.map((e) => {
                  return (
                    <div key={e.id} className='flex flex-col sm:flex-row items-center'>
                      <div className='flex flex-col justify-start items-start'>
                        <span className='w-full flex justify-between'>
                          <span>Tên:</span> <span className='text-amber-500'>{e.itemName}</span>
                        </span>
                        <span className='w-full flex justify-between'>
                          <span className='text-left'>Thuộc tính:</span>{' '}
                          <span className='text-amber-500'>{e.propName}</span>
                        </span>
                        <span className='w-full flex justify-between'>
                          <span>Số lượng:</span> <span className='text-amber-500'>{e.quantity}</span>
                        </span>
                        <span className='w-full flex justify-between'>
                          <span>Đơn giá:</span> <span className='text-amber-500'>{formatMoneyToVND(e.vnCost)}</span>
                        </span>
                      </div>
                      <a key={e.id} href={e.itemUrl} target='_blank' rel='noopener noreferrer'>
                        <img
                          className='sm:max-w-16 sm:max-h-16 overflow-clip mb-2 ml-2'
                          src={e.image}
                          alt={e.itemName}
                        />
                      </a>
                    </div>
                  );
                })}
              </span>
            </Box>
            <Divider />
            <Typography variant='h5' textAlign={'left'} sx={{ mb: 2 }}>
              Địa chỉ nhận hàng
            </Typography>
            <Box display={'flex'} className=' justify-between'>
              <span>Người nhận:</span>
              <span>{data?.data.address.name}</span>
            </Box>
            <Box display={'flex'} className=' justify-between'>
              <span>Số điện thoại:</span>
              <span>{data?.data.address.phone}</span>
            </Box>
            <Box display={'flex'} className=' justify-between'>
              <span>Email:</span>
              <span>{data?.data.address.mail}</span>
            </Box>
            <Box display={'flex'} className=' justify-between'>
              <span>Địa chỉ:</span>
              <span>{`${data?.data.address.address}, ${data?.data.address.ward}, ${data?.data.address.city}, ${data?.data.address.province}`}</span>
            </Box>
            <Box display={'flex'} className=' justify-between'>
              <span>Ghi chú:</span>
              <span>{data?.data.address.note}</span>
            </Box>
          </Card>
        )}
        {isLoading && (
          <Card variant='elevation'>
            <CardContent>
              <Box>
                <Spinner />
              </Box>
            </CardContent>
          </Card>
        )}
      </Container>
    </>
  );
};
