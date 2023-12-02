import { Box, Container, FormControl, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SortOption, useSearchItem } from './api/useSearchItem';
import { Search as SearchIcon, SearchOff } from '@mui/icons-material';
import { TaobaoItem } from './components/TaobaoItem';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { SelectSort } from './components/SelectSort';
import Spinner from 'app/layout/async/Spinner';

export const Search = () => {
  const history = useHistory();
  const locationSearch = history.location.search;
  const queryObject: any = queryString.parse(locationSearch);
  const [page, setPage] = useState<number>(parseInt(queryObject.page) || 1);
  const [q, setQ] = useState(queryObject.q || '');
  const [sort, setSort] = useState(queryObject.sort || '');
  const [search, setSearch] = useState(queryObject.q || '');
  const handleInputChange = (event: any) => {
    setSearch(event.target.value);
  };
  const handleKeyPress = (e: any) => {
    if (e.keyCode == 13) {
      setQ(e.target.value);
    }
  };
  const handleChangePage = (p: number) => {
    setPage((prev) => {
      const newVal = p + prev;
      if (!newVal) {
        return 1;
      }
      return newVal;
    });
  };
  const { data, isLoading } = useSearchItem({ q, page, sort }, { enabled: !!q });
  useEffect(() => {
    const queryObject = { page, q, sort };
    history.push({ search: queryString.stringify(queryObject) });
  }, [page, q, sort]);

  return (
    <>
      <Helmet>
        <title>Tìm kiếm</title>
      </Helmet>
      <Container className='mt-5'>
        <Box className='mb-5'>
          <FormControl fullWidth>
            <TextField
              value={search}
              fullWidth
              variant='filled'
              onKeyDown={handleKeyPress}
              label='Tìm kiếm sản phẩm Taobao'
              onChange={handleInputChange}
              InputProps={{
                endAdornment: (
                  <>
                    <IconButton aria-label='search icon' edge='end' onClick={handleKeyPress}>
                      <SearchIcon color='primary' />
                    </IconButton>
                    <SelectSort
                      onSort={(e: SortOption) => {
                        setSort(e);
                      }}
                    />
                  </>
                ),
              }}
            />
          </FormControl>
        </Box>
        {!!data && !isLoading && !!data?.data.length && (
          <>
            <div className='grid grid-cols-4 gap-4 auto-rows-max'>
              {data?.data.map((item) => (
                <TaobaoItem key={item.num_iid} item={item} />
              ))}
            </div>
            <Box className='flex justify-center my-5'>
              <nav aria-label='Taobao search item'>
                <ul className='flex items-center -space-x-px h-8 text-sm'>
                  <li>
                    <div
                      onClick={() => handleChangePage(-1)}
                      className='cursor-pointer flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      <span className='sr-only'>Previous</span>
                      <svg
                        className='w-2.5 h-2.5 rtl:rotate-180'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 6 10'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='M5 1 1 5l4 4'
                        />
                      </svg>
                    </div>
                  </li>
                  <li>
                    <span className='flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'>
                      {page}
                    </span>
                  </li>
                  <li>
                    <div
                      onClick={() => handleChangePage(1)}
                      className='cursor-pointer flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white'
                    >
                      <span className='sr-only'>Next</span>
                      <svg
                        className='w-2.5 h-2.5 rtl:rotate-180'
                        aria-hidden='true'
                        xmlns='http://www.w3.org/2000/svg'
                        fill='none'
                        viewBox='0 0 6 10'
                      >
                        <path
                          stroke='currentColor'
                          strokeLinecap='round'
                          strokeLinejoin='round'
                          strokeWidth='2'
                          d='m1 9 4-4-4-4'
                        />
                      </svg>
                    </div>
                  </li>
                </ul>
              </nav>
            </Box>
          </>
        )}
        {isLoading && (
          <div className='h-full text-center flex justify-center items-center'>
            <span>
              <Spinner />
              Đang tải...
            </span>
          </div>
        )}
        {!isLoading && !data?.data.length && (
          <div className='h-full text-center flex justify-center items-center'>
            <span>
              <SearchOff />
              Không có sản phẩm
            </span>
          </div>
        )}
      </Container>
    </>
  );
};
