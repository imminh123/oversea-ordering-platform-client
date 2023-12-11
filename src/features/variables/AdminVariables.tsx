import {
  Chip,
  CircularProgress,
  Container,
  IconButton,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  styled,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Variable, useListVariables } from './api/useGetVariables';
import { useState } from 'react';
import { EditVariableModal } from './components/EditVariableModal';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  padding: '10px',
}));

const VariableRow = ({ item }: { item: Variable }) => {
  return (
    <TableRow
      className='cursor-pointer transition hover:transition-all delay-150'
      title={`Sửa giá trị cho ${item.name}`}
      sx={{ '&:hover': { backgroundColor: '#e6e6e6' } }}
    >
      <TableCell>{item.name}</TableCell>
      <TableCell align='right'>
        <Chip label={item.value} />
      </TableCell>
      <TableCell align='right'>{item.description}</TableCell>
      <TableCell align='right'>
        <EditVariableModal item={item} />
      </TableCell>
    </TableRow>
  );
};

export const AdminVariables = () => {
  const [page, setPage] = useState<number>(1);

  const { data: cartItems, isLoading } = useListVariables({ page: 1 });
  const count = parseInt(cartItems?.headers['x-pages-count'].toString() || '0');

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  return (
    <>
      <Helmet>
        <title>Tỉ giá</title>
      </Helmet>
      <Container className='mt-5'>
        <Typography variant={'h4'} sx={{ gridColumn: 'span 2' }}>
          Quản lý tỉ giá
        </Typography>
        {!!cartItems && !!cartItems?.data.length && !isLoading && (
          <TableContainer className='mt-2' component={Paper} elevation={3}>
            <Table sx={{ minWidth: 650 }} aria-label='variable table'>
              <TableHead>
                <TableRow>
                  <TableCell align='left'>Tên</TableCell>
                  <TableCell align='right'>Giá trị</TableCell>
                  <TableCell align='right'>Mô tả</TableCell>
                  <TableCell align='right'></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartItems?.data.map((row: Variable) => (
                  <VariableRow key={row.id} item={row} />
                ))}
              </TableBody>
            </Table>
            <Pagination className='flex justify-center my-2' count={count} page={page} onChange={handleChange} />
          </TableContainer>
        )}
        {(!cartItems || !cartItems?.data.length) && !isLoading && <Item elevation={3}>Không có bản ghi</Item>}
        {isLoading && (
          <Item elevation={3}>
            <CircularProgress />
          </Item>
        )}
      </Container>
    </>
  );
};
