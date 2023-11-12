import {
  Grid,
  Pagination,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useListCartCategories } from './api/useCartCategoriesListing';
import { useState } from 'react';

function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const CartRow = ({ row }: { row: any }) => {
  return (
    <TableRow sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
      <TableCell component='th' scope='row'>
        {row.name}
      </TableCell>
      <TableCell align='right'>{row.calories}</TableCell>
      <TableCell align='right'>{row.fat}</TableCell>
      <TableCell align='right'>{row.carbs}</TableCell>
      <TableCell align='right'>{row.protein}</TableCell>
    </TableRow>
  );
};

export const Step1 = () => {
  const [page, setPage] = useState<number>(1);
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const { data: cartItems } = useListCartCategories(page);
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={8}>
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 650 }} aria-label='simple table'>
            <TableHead>
              <TableRow>
                <TableCell>Categories</TableCell>
                <TableCell align='right'>Quantity</TableCell>
                <TableCell align='right'>Price</TableCell>
                <TableCell align='right'>Total</TableCell>
                <TableCell align='right'>Action</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <CartRow key={row.name} row={row} />
              ))}
            </TableBody>
          </Table>
          <Pagination count={10} page={page} onChange={handleChange} />
        </TableContainer>
      </Grid>
      <Grid item xs={12} md={4}>
        test
      </Grid>
    </Grid>
  );
};
