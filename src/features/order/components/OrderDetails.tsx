import { Box, Container, Divider, Paper, Typography, styled } from '@mui/material';
import { formatMoneyToVND } from 'app/utils/helper';
import { useParams } from 'react-router-dom';
import { useGetOrder } from '../api/useOrderDetail';
import { mappingStatus } from '..';
import moment from 'moment';

const Card = styled(Paper)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  gap: '10px',
  flexDirection: 'column',
  padding: theme.spacing(5),
  margin: theme.spacing(5),
  ...theme.typography.body2,
  textAlign: 'center',
  backgroundColor: '#f2f2f2',
}));

export const OrderDetail = () => {
  const param: { id: string } = useParams();
  const { data } = useGetOrder(param.id);
  return (
    <Container className='mt-5'>
      <Card variant='elevation'>
        <Typography variant='h5' textAlign={'left'} sx={{ mb: 2 }}>
          Chi tiết đơn hàng
        </Typography>
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
        <Box display={'flex'} className=' justify-between'>
          <span>Sản phẩm:</span>
          <span>
            {data?.data.listItem.map((e) => {
              return (
                <a key={e.id} href={e.itemUrl} target='_blank' rel='noopener noreferrer'>
                  <img className='max-w-16 max-h-16 overflow-clip mb-2' src={e.itemImage} alt={e.itemName} />
                </a>
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
    </Container>
  );
};
