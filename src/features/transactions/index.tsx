import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  CircularProgress,
  Paper,
  Pagination,
  TableCell,
  Chip,
  Typography,
} from '@mui/material';
import { Item, TD } from 'app/utils/Item';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { IPaymentTransaction, PaymentStatus, useIndexTransactions } from './apis/useIndexPayment';
import { formatMoneyToVND } from 'app/utils/helper';
import moment from 'moment';

export const mappingPaymentStatus = (status?: PaymentStatus) => {
  switch (status) {
    case PaymentStatus.SUCCEEDED:
      return <Chip label='Thành công' color='success' variant='outlined' />;
    case PaymentStatus.PENDING:
      return <Chip label='Đang chờ' color='warning' variant='outlined' />;
    case PaymentStatus.FAILED:
      return <Chip label='Lỗi' color='error' variant='outlined' />;
    default:
      return <Chip label={status} color='error' variant='outlined' />;
  }
};

const TransactionRow = ({ item }: { item: IPaymentTransaction }) => {
  return (
    <TableRow className=' cursor-pointer' sx={{ '&:hover': { backgroundColor: '#e6e6e6' } }}>
      <TD component='th' scope='row' className='sm:text-xs'>
        {item.orderInfo}
      </TD>
      <TableCell width={'100px'} size='small' align='right'>
        {mappingPaymentStatus(item.status)}
      </TableCell>
      <TD align='right'>{formatMoneyToVND(item.amount)}</TD>
      <TableCell width={'100px'} size='small' align='right'>
        {moment(item.createdAt).format('DD/MM/YYYY')}
      </TableCell>
    </TableRow>
  );
};

export const TransactionListing = () => {
  const [page, setPage] = useState<number>(1);
  const { data: listTransactions, isLoading } = useIndexTransactions({ page });
  const count = parseInt(listTransactions?.headers['x-pages-count'].toString() || '0');

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <Container className='mt-5'>
        <Typography variant={'h6'} sx={{ gridColumn: 'span 2' }}>
          Quản lý thanh toán
        </Typography>
        {!!listTransactions && !!listTransactions?.data.length && !isLoading && (
          <>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }} aria-label='đơn hàng'>
                <TableHead>
                  <TableRow>
                    <TD sx={{ fontWeight: 'bold' }}>Thông tin</TD>
                    <TD sx={{ maxWidth: '150px', fontWeight: 'bold' }} align='right'>
                      Trạng thái
                    </TD>
                    <TD sx={{ fontWeight: 'bold', textAlign: 'right' }}>Tiền hàng</TD>
                    <TD sx={{ fontWeight: 'bold' }} className=' min-w-[150px]'>
                      Ngày thanh toán
                    </TD>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listTransactions?.data.map((row: IPaymentTransaction) => (
                    <TransactionRow key={row.id} item={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination className='flex justify-center my-2' count={count} page={page} onChange={handleChange} />
          </>
        )}
        {(!listTransactions || !listTransactions?.data.length) && !isLoading && (
          <Item elevation={3}>Không có bản ghi</Item>
        )}
        {isLoading && (
          <Item elevation={3}>
            <CircularProgress />
          </Item>
        )}
      </Container>
    </>
  );
};
