import {
  Box,
  Card,
  Chip,
  Container,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { Variable, useListVariables } from './api/useGetVariables';
import { useState } from 'react';
import { EditVariableModal } from './components/EditVariableModal';
import { LoadingCard, NoItemFound } from 'app/components/Item';

const VariableRow = ({ item }: { item: Variable }) => {
  return (
    <TableRow
      className='cursor-pointer transition hover:transition-all delay-150'
      title={`Sửa giá trị cho ${item.name}`}
      hover
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
        <Box className='flex justify-between items-center mb-3 px-3'>
          <Typography variant={'h6'} sx={{ gridColumn: 'span 2' }}>
            Quản lý tỉ giá
          </Typography>
        </Box>
        {!!cartItems && !!cartItems?.data.length && !isLoading && (
          <Card>
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
            </TableContainer>
            <Pagination className='flex justify-center my-4' count={count} page={page} onChange={handleChange} />
          </Card>
        )}
        {(!cartItems || !cartItems?.data.length) && !isLoading && <NoItemFound />}
        {isLoading && <LoadingCard />}
      </Container>
    </>
  );
};
