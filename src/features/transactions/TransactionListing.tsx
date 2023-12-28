import {
  Container,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableBody,
  Paper,
  Pagination,
  TableCell,
  Typography,
  Card,
  Box,
} from '@mui/material';
import { LoadingCard, NoItemFound } from 'app/components/Item';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { useIndexTransactions } from './apis/useIndexPayment';
import { formatMoneyToVND } from 'app/utils/helper';
import moment from 'moment';
import { mappingPaymentStatus } from './components';
import { IPaymentTransaction } from './Transaction.interface';
import { useHistory } from 'react-router-dom';

const TransactionRow = ({ item }: { item: IPaymentTransaction }) => {
  const history = useHistory();

  return (
    <TableRow
      hover
      className='cursor-pointer'
      onClick={() => {
        history.push(`/transactions/${item.id}`);
      }}
    >
      <TableCell component='th' scope='row' className='sm:text-xs'>
        {item.orderInfo}
      </TableCell>
      <TableCell width={'100px'} size='small' align='right'>
        {mappingPaymentStatus(item.status)}
      </TableCell>
      <TableCell align='right'>{formatMoneyToVND(item.amount)}</TableCell>
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
        <Box className='flex justify-between items-center mb-3 px-3'>
          <Typography variant={'h6'} sx={{ gridColumn: 'span 2' }}>
            Quản lý thanh toán
          </Typography>
        </Box>
        {!!listTransactions && !!listTransactions?.data.length && !isLoading && (
          <Card>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }} aria-label='đơn hàng'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Thông tin</TableCell>
                    <TableCell sx={{ maxWidth: '150px', fontWeight: 'bold' }} align='right'>
                      Trạng thái
                    </TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }}>Tiền hàng</TableCell>
                    <TableCell sx={{ fontWeight: 'bold', textAlign: 'right' }} className='min-w-[150px]'>
                      Ngày thanh toán
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {listTransactions?.data.map((row: IPaymentTransaction) => (
                    <TransactionRow key={row.id} item={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination className='flex justify-center my-4' count={count} page={page} onChange={handleChange} />
          </Card>
        )}
        {(!listTransactions || !listTransactions?.data.length) && !isLoading && <NoItemFound />}
        {isLoading && <LoadingCard />}
      </Container>
    </>
  );
};
