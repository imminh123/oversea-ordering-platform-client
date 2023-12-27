import {
  Card,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Container } from '@mui/system';
import { Helmet } from 'react-helmet-async';
import { useHistory, useParams } from 'react-router-dom';
import { useGetPaymentDetail } from '../apis/usePaymentDetail';
import { LoadingCard, NoItemFound } from 'app/components/Item';
import { formatMoneyToVND } from 'app/utils/helper';
import { mappingPaymentStatus } from '.';
import { useGetOrderByAdmin } from 'features/order/api/useOrderDetailAdmin';
import { mappingOrderStatus } from 'features/order/components';
import { useAdminGetUserDetail } from 'features/users/apis/useAdminGetInfo';
import { mappingBlock, mappingRole } from 'features/users/components';

export const TransactionDetailAdmin = () => {
  const param: { id: string } = useParams();
  const history = useHistory();

  const { data, isLoading } = useGetPaymentDetail(param.id);
  const { data: OrderDetail } = useGetOrderByAdmin(data?.data.referenceId || '', { enabled: !!data?.data.referenceId });
  const { data: UserDetail } = useAdminGetUserDetail(data?.data.userId || '', { enabled: !!data?.data.userId });

  return (
    <>
      <Helmet>
        <title>Chi tiết thanh toán</title>
      </Helmet>
      <Container className='mt-5'>
        {!!data?.data && !isLoading && (
          <>
            <Card sx={{ p: 3, mb: 3 }}>
              <Typography variant={'h6'} sx={{ mb: 3 }}>
                Chi tiết thanh toán
              </Typography>

              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant='subtitle2'>Người thanh toán:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2'>{data.data.userName}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant='subtitle2'>Số tiền:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2'>{formatMoneyToVND(data.data.amount)}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant='subtitle2'>Trạng thái:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2'>{mappingPaymentStatus(data.data.status)}</Typography>
                </Grid>

                <Grid item xs={6}>
                  <Typography variant='subtitle2'>Mô tả:</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant='subtitle2'>{data.data.orderInfo}</Typography>
                </Grid>
              </Grid>
            </Card>
          </>
        )}
        {!!OrderDetail && (
          <>
            <Typography variant={'h6'} sx={{ mb: 3 }}>
              Chi tiết đơn hàng
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }} aria-label='đơn hàng'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Sản phẩm</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} align='right'>
                      Trạng thái
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }} className=' min-w-[150px]'>
                      Người nhận
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Tiền hàng</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    onClick={() => {
                      history.push(`/admin/orders/${OrderDetail?.data.id}`);
                    }}
                    className=' cursor-pointer'
                    hover
                  >
                    <TableCell component='th' scope='row' className='sm:text-xs'>
                      {OrderDetail?.data.listItem[0].itemName}
                    </TableCell>
                    <TableCell align='right'>{mappingOrderStatus(OrderDetail?.data.status)}</TableCell>
                    <TableCell className='break-words text-ellipsis'>{`${OrderDetail?.data.address.name} - ${OrderDetail?.data.address.phone}`}</TableCell>
                    <TableCell align='right'>{formatMoneyToVND(OrderDetail?.data?.total || 0)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {!!UserDetail && (
          <>
            <Typography variant={'h6'} sx={{ my: 3 }}>
              Chi tiết người dùng
            </Typography>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }} aria-label='đơn hàng'>
                <TableHead>
                  <TableRow>
                    <TableCell>Họ tên</TableCell>
                    <TableCell sx={{ maxWidth: '150px' }} size='small' align='right'>
                      Vai trò
                    </TableCell>
                    <TableCell className=' min-w-[150px]'>Email</TableCell>
                    <TableCell align='right'>Chặn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow
                    hover
                    onClick={() => {
                      history.push(`/admin/users/${UserDetail?.id}`);
                    }}
                    className=' cursor-pointer'
                    title='Xem chi tiết'
                  >
                    <TableCell>{UserDetail?.fullname || '_'}</TableCell>
                    <TableCell width={'100px'} size='small' align='right'>
                      {mappingRole(UserDetail?.role)}
                    </TableCell>
                    <TableCell className='break-words text-ellipsis'>{UserDetail?.mail}</TableCell>
                    <TableCell align='right'>{mappingBlock(UserDetail?.isBlock)}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
        {isLoading && <LoadingCard />}
        {!isLoading && !data?.data && <NoItemFound text='Không thể tìm thấy thông tin thanh toán' />}
      </Container>
    </>
  );
};
