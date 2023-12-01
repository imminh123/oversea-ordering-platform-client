import { Box, Container, Input, Paper, TextField, styled } from '@mui/material';
import { useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SortOption, useSearchItem } from './api/useSearchItem';
import { debounce } from 'lodash';

const Card = styled(Paper)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  gap: '10px',
  flexDirection: 'column',
  padding: theme.spacing(2),
  ...theme.typography.body2,
  textAlign: 'center',
  backgroundColor: '#f2f2f2',
}));

export const Search = () => {
  const [q, setQ] = useState('');
  const { data } = useSearchItem({ q, page: 1, sort: SortOption.default });
  const handleInputChange = (event: any) => {
    // debounceSearch();
    setQ(event.target.value);
  };
  // const handleSearch = () => {
  //   console.log('Performing search:', q);
  // };
  // const debounceSearch = debounce(handleSearch, 1000);
  return (
    <>
      <Helmet>
        <title>Tìm kiếm</title>
      </Helmet>
      <Container className='mt-5'>
        <Box className='mb-5'>
          <TextField
            value={q}
            onChange={handleInputChange}
            fullWidth
            variant='filled'
            label='Tìm kiếm sản phẩm Taobao'
            placeholder='Áo, quần,...'
          />
        </Box>
        <Card variant='elevation'>search</Card>
      </Container>
    </>
  );
};
