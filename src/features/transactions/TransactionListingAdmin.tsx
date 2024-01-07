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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { LoadingCard, NoItemFound } from 'app/components/Item';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { formatMoneyToVND } from 'app/utils/helper';
import moment from 'moment';
import { mappingPaymentStatus } from './components';
import { IPaymentTransaction } from './Transaction.interface';
import { useIndexTransactionsAdmin } from './apis/useIndexPaymentAdmin';
import { DateRangePicker, LoadingButton, LocalizationProvider } from '@mui/lab';
import React from 'react';
import { PaymentStatus, PaymentsStatusOptions } from './Transactions.const';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import { useHistory } from 'react-router-dom';
import { Download } from '@mui/icons-material';
import { useDownloadPaymentTransactionsAdmin } from './apis/usePaymentDownloadCSV';

const TransactionRow = ({ item }: { item: IPaymentTransaction }) => {
  const history = useHistory();
  return (
    <TableRow
      hover
      className='cursor-pointer'
      onClick={() => {
        history.push(`/admin/transactions/${item.id}`);
      }}
    >
      <TableCell component='th' scope='row' className='sm:text-xs'>
        {item.userName}
      </TableCell>
      <TableCell component='th' scope='row' className='sm:text-xs'>
        {item.referenceId}
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

export const TransactionListingAdmin = () => {
  const [page, setPage] = useState<number>(1);
  const [status, setStatus] = useState<PaymentStatus>();
  const [timeRange, setTimeRange] = useState<any>([null, null]);
  const [userFilter, setUserFilter] = useState<string>('');
  const [userName, setUserName] = useState<string>('');
  const [itemFilter, setItemFilter] = useState<string>('');
  const [userId, setUserId] = useState<string>('');
  const { data: listTransactions, isLoading } = useIndexTransactionsAdmin({
    page,
    status,
    userName,
    userId,
    ...(timeRange[0] && { timeFrom: new Date(timeRange[0]).toISOString() }),
    ...(timeRange[1] && { timeTo: new Date(timeRange[1]).toISOString() }),
  });
  const count = parseInt(listTransactions?.headers['x-pages-count'].toString() || '0');

  const { refetch: download, isLoading: downloading } = useDownloadPaymentTransactionsAdmin(
    {
      page,
      status,
      userName,
      userId,
      ...(timeRange[0] && { timeFrom: new Date(timeRange[0]).toISOString() }),
      ...(timeRange[1] && { timeTo: new Date(timeRange[1]).toISOString() }),
    },
    {
      enabled: false,
    },
  );

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleInputChange = (event: any, type: string) => {
    switch (type) {
      case 'status':
        setStatus(event.target.value);
        break;
      case 'userName':
        setUserFilter(event.target.value);
        break;
      case 'userId':
        setItemFilter(event.target.value);
        break;
    }
  };
  const handleKeyPress = (e: any, type: string) => {
    if (e.keyCode == 13) {
      switch (type) {
        case 'userName':
          setUserName(e.target.value);
          break;
        case 'userId':
          setUserId(e.target.value);
          break;
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Thanh toán</title>
      </Helmet>
      <Container className='mt-5 mb-10'>
        <Box className='flex justify-between items-center mb-3 px-3'>
          <Typography variant={'h6'} sx={{ gridColumn: 'span 2' }}>
            Quản lý thanh toán
          </Typography>
          <LoadingButton
            startIcon={<Download />}
            variant='contained'
            color='primary'
            loading={downloading}
            onClick={() => download()}
          >
            Tải CSV
          </LoadingButton>
        </Box>
        <Card sx={{ p: 2, marginBottom: '10px' }}>
          <Box className='grid grid-cols-1 sm:grid-cols-2 gap-2 my-3'>
            <Box>
              <FormControl fullWidth>
                <InputLabel size='small' id='status-select-label'>
                  Trạng thái thanh toán
                </InputLabel>
                <Select
                  labelId='status-select-label'
                  id='status-select'
                  size='small'
                  variant='outlined'
                  value={status || ''}
                  label='Trạng thái thanh toán'
                  onChange={(e) => handleInputChange(e, 'status')}
                >
                  {PaymentsStatusOptions.map((status, index) => {
                    return (
                      <MenuItem key={index} value={status.value}>
                        {status.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box className='flex justify-end' sx={{ '& div': { width: '100%' } }}>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DateRangePicker
                  startText='Bắt đầu'
                  endText='Kết thúc'
                  value={timeRange}
                  disableFuture
                  inputFormat='dd/MM/yyyy'
                  onChange={(newValue) => {
                    setTimeRange(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField fullWidth size='small' {...startProps} />
                      <Box sx={{ mx: 2, width: '50px !important' }}> tới </Box>
                      <TextField fullWidth size='small' {...endProps} />
                    </React.Fragment>
                  )}
                />
              </LocalizationProvider>
            </Box>
          </Box>
          <Box className='grid grid-cols-1 sm:grid-cols-2 gap-2 my-3'>
            <Box>
              <TextField
                fullWidth
                label='Tên người dùng'
                size='small'
                value={userFilter}
                onChange={(e) => handleInputChange(e, 'userName')}
                onKeyDown={(e) => handleKeyPress(e, 'userName')}
              />
            </Box>
            <Box>
              <TextField
                fullWidth
                label='ID người dùng'
                size='small'
                value={itemFilter}
                onChange={(e) => handleInputChange(e, 'userId')}
                onKeyDown={(e) => handleKeyPress(e, 'userId')}
              />
            </Box>
          </Box>
        </Card>
        {!!listTransactions && !!listTransactions?.data.length && !isLoading && (
          <Card>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }} aria-label='đơn hàng'>
                <TableHead>
                  <TableRow>
                    <TableCell sx={{ fontWeight: 'bold' }}>Người dùng</TableCell>
                    <TableCell sx={{ fontWeight: 'bold' }}>Mã đơn hàng</TableCell>
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
