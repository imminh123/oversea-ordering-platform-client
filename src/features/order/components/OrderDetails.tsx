import { Box, CardContent, Container, Divider, Paper, Typography, styled, useMediaQuery } from '@mui/material';
import { formatMoneyToVND } from 'app/utils/helper';
import { useParams } from 'react-router-dom';
import { useGetOrder } from '../api/useOrderDetail';
import moment from 'moment';
import { Helmet } from 'react-helmet-async';
import { Payments } from '@mui/icons-material';
import { OrderStatus } from 'features/cart/api/useGetOrderDetail';
import Spinner from 'app/layout/async/Spinner';
import { useRePay } from '../api/useRePay';
import { usePayOrder } from 'features/cart/api/usePay';
import { LoadingButton } from '@mui/lab';
import { mappingOrderStatus } from '.';
import { LeftAlignedTimeline } from 'app/components/Timeline';

const CustomCard = styled(Paper)(({ theme }) => {
  const matchesSM = useMediaQuery(theme.breakpoints.down('sm'));
  return {
    ...theme.components?.MuiCard,
    minHeight: '100%',
    display: 'flex',
    gap: '10px',
    flexDirection: 'column',
    padding: theme.spacing(5),
    margin: theme.spacing(5),
    ...theme.typography.body2,
    textAlign: 'center',
    boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px',
    ...(matchesSM && {
      padding: theme.spacing(1),
      margin: theme.spacing(1),
      marginBottom: '35px',
    }),
  };
});

export const OrderDetail = () => {
  const param: { id: string } = useParams();
  const { data, isLoading } = useGetOrder(param.id);
  const { mutateAsync: rePay, isLoading: repaying } = useRePay();
  const { mutateAsync: pay, isLoading: paying } = usePayOrder();

  const handlePay = () => {
    if (
      !!data?.data.status &&
      (data?.data.status === OrderStatus.CREATED || data?.data.status === OrderStatus.PENDING_PAYMENT)
    ) {
      pay({ referenceId: param.id });
    } else {
      rePay({ orderId: param.id });
    }
  };
  const payAgain =
    !!data?.data.status && data?.data.status !== OrderStatus.SUCCEEDED && data?.data.status !== OrderStatus.DELIVERED;
  return (
    <>
      <Helmet>
        <title>Chi tiết Đơn hàng</title>
      </Helmet>
      <Container className='mt-5'>
        {!!data?.data && !isLoading && (
          <>
            <CustomCard variant='elevation'>
              <Box className='flex justify-between flex-col sm:flex-row'>
                <Typography variant='h5' textAlign={'left'} sx={{ mb: 2 }}>
                  Chi tiết đơn hàng
                </Typography>
                <LoadingButton
                  loadingIndicator='Đang chờ...'
                  variant='outlined'
                  startIcon={<Payments />}
                  onClick={handlePay}
                  loading={paying || repaying}
                  size='small'
                >
                  {payAgain ? 'Thanh toán lại' : 'Đặt lại đơn hàng'}
                </LoadingButton>
              </Box>
              <Box display={'flex'} className='justify-between'>
                <span>Trạng thái:</span>
                <span>{mappingOrderStatus(data?.data.status)}</span>
              </Box>
              <Box display={'flex'} className='justify-between'>
                <span>Tiền hàng:</span>
                <span>{formatMoneyToVND(data?.data.total || 0)}</span>
              </Box>

              <Box display={'flex'} className='justify-between'>
                <span>Mã đơn hàng:</span>
                <span>{data?.data.id}</span>
              </Box>
              <Box display={'flex'} className='justify-between'>
                <span>Ngày thanh toán:</span>
                <span>{moment(data?.data.createdAt).calendar()}</span>
              </Box>
              <Box display={'flex'} className='justify-between'>
                <span>Kho hàng:</span>
                <span>{data?.data.wareHouseAddress || '-'}</span>
              </Box>
              <Box display={'flex'} className='sm:justify-between flex-col sm:flex-row items-start'>
                <span>Sản phẩm:</span>
                <span>
                  {data?.data.listItem.map((e) => {
                    return (
                      <div
                        key={e.id}
                        className='flex flex-col sm:flex-row items-center mb-2 pb-1 border-b-[1px] border-b-slate-400'
                      >
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
            </CustomCard>
            <CustomCard variant='elevation'>
              <Typography variant='h5' textAlign={'left'} sx={{ mb: 2 }}>
                Địa chỉ nhận hàng
              </Typography>
              <Box display={'flex'} className='justify-between'>
                <span className='whitespace-nowrap'>Người nhận:</span>
                <span className='text-right'>{data?.data.address.name}</span>
              </Box>
              <Box display={'flex'} className='justify-between'>
                <span className='whitespace-nowrap'>Số điện thoại:</span>
                <span className='text-right'>{data?.data.address.phone}</span>
              </Box>
              <Box display={'flex'} className='justify-between'>
                <span>Email:</span>
                <span className='text-right'>{data?.data.address.mail}</span>
              </Box>
              <Box display={'flex'} className='justify-between'>
                <span className='whitespace-nowrap'>Địa chỉ:</span>
                <span className='text-right'>{`${data?.data.address.address}, ${data?.data.address.ward}, ${data?.data.address.city}, ${data?.data.address.province}`}</span>
              </Box>
              <Box display={'flex'} className='justify-between'>
                <span className='whitespace-nowrap'>Ghi chú:</span>
                <span className='text-right'>{data?.data.address.note}</span>
              </Box>
            </CustomCard>
            {data?.data?.orderHistories && (
              <CustomCard variant='elevation'>
                <Typography variant='h5' textAlign={'left'} sx={{ mb: 2 }}>
                  Lịch sử chỉnh sửa
                </Typography>
                <LeftAlignedTimeline data={data.data.orderHistories} />
              </CustomCard>
            )}
          </>
        )}
        {isLoading && (
          <CustomCard variant='elevation'>
            <CardContent>
              <Box>
                <Spinner />
              </Box>
            </CardContent>
          </CustomCard>
        )}
      </Container>
    </>
  );
};
