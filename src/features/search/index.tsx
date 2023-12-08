import { Box, Container, FormControl, Grid, IconButton, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { SortOption, useSearchItem } from './api/useSearchItem';
import { Search as SearchIcon, SearchOff } from '@mui/icons-material';
import { TaobaoItem } from './components/TaobaoItem';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import Spinner from 'app/layout/async/Spinner';
import { Language, QueryLangOptions, SortOptions, TargetLangOptions } from './search.const';

export const Search = () => {
  const history = useHistory();
  const locationSearch = history.location.search;
  const queryObject: any = queryString.parse(locationSearch);
  const [page, setPage] = useState<number>(parseInt(queryObject.page) || 1);
  const [q, setQ] = useState(queryObject.q || '');
  const [minPrice, setMinPrice] = useState<number | undefined>(queryObject.minPrice || '');
  const [maxPrice, setMaxPrice] = useState<number | undefined>(queryObject.maxPrice || '');
  const [search, setSearch] = useState(queryObject.q || '');
  const [sort, setSort] = useState(queryObject.sort || SortOption.default);
  const [min, setMin] = useState<number | undefined>(queryObject.minPrice || '');
  const [max, setMax] = useState<number | undefined>(queryObject.maxPrice || '');
  const [target_language, setTarget_language] = useState<Language>(queryObject.target_language || Language.VI);
  const [query_language, setQuerylanguage] = useState<Language>(queryObject.query_language || Language.VI);

  const handleInputChange = (event: any, type: string) => {
    switch (type) {
      case 'q':
        setSearch(event.target.value);
        break;
      case 'min':
        setMin(event.target.value);
        break;
      case 'max':
        setMax(event.target.value);
        break;
      case 'target_language':
        setTarget_language(event.target.value);
        break;
      case 'query_language':
        setQuerylanguage(event.target.value);
        break;
      case 'sort':
        setSort(event.target.value);
        break;
    }
  };
  const handleKeyPress = (e: any, type: string) => {
    if (e.keyCode == 13) {
      switch (type) {
        case 'q':
          setQ(e.target.value);
          break;
        case 'min':
          setMinPrice(e.target.value);
          break;
        case 'max':
          setMaxPrice(e.target.value);
          break;
      }
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
  const { data, isLoading } = useSearchItem(
    { q, page, sort, target_language, query_language, minPrice, maxPrice },
    { enabled: !!q || !!minPrice || !!maxPrice, refetchOnWindowFocus: false },
  );
  useEffect(() => {
    const queryObject = { page, q, sort, target_language, query_language, minPrice, maxPrice };
    history.push({ search: queryString.stringify(queryObject) });
  }, [page, q, sort, target_language, query_language, minPrice, maxPrice]);

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
              onKeyDown={(e) => handleKeyPress(e, 'q')}
              label='Tìm kiếm sản phẩm Taobao'
              onChange={(e) => handleInputChange(e, 'q')}
              InputProps={{
                endAdornment: (
                  <>
                    <IconButton aria-label='search icon' edge='end' onClick={() => setQ(search)}>
                      <SearchIcon color='primary' />
                    </IconButton>
                  </>
                ),
              }}
            />
          </FormControl>
          <Grid container className='mt-3'>
            <Grid item xs={6} sm={2}>
              <FormControl fullWidth>
                <InputLabel id='target-lang-label'>Ngôn ngữ trả về</InputLabel>
                <Select
                  labelId='target-lang-label'
                  id='target-lang'
                  variant='filled'
                  value={target_language}
                  label='Ngôn ngữ trả về'
                  onChange={(e) => handleInputChange(e, 'target_language')}
                  className='mx-2 mb-1'
                >
                  {TargetLangOptions.map((lang, index) => {
                    return (
                      <MenuItem key={index} value={lang.value}>
                        {lang.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={2}>
              <FormControl fullWidth>
                <InputLabel id='query-lang-label'>Ngôn ngữ tìm kiếm</InputLabel>
                <Select
                  labelId='query-lang-label'
                  id='query-lang'
                  variant='filled'
                  value={query_language}
                  label='Ngôn ngữ tìm kiếm'
                  onChange={(e) => handleInputChange(e, 'query_language')}
                  className='mx-2 mb-1'
                >
                  {QueryLangOptions.map((lang, index) => {
                    return (
                      <MenuItem key={index} value={lang.value}>
                        {lang.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={2}>
              <FormControl fullWidth>
                <InputLabel id='sort-label'>Sắp xếp</InputLabel>
                <Select
                  labelId='sort-label'
                  id='sort'
                  variant='filled'
                  value={sort}
                  label='Sắp xếp'
                  onChange={(e) => handleInputChange(e, 'sort')}
                  className='mx-2 mb-1'
                >
                  {SortOptions.map((lang, index) => {
                    return (
                      <MenuItem key={index} value={lang.value}>
                        {lang.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <TextField
                  value={min}
                  variant='filled'
                  type='number'
                  onKeyDown={(e) => handleKeyPress(e, 'min')}
                  label='Tối thiểu'
                  onChange={(e) => handleInputChange(e, 'min')}
                  sx={{ '& .MuiInputBase-formControl': { margin: '0 8px' } }}
                />
              </FormControl>
            </Grid>
            <Grid item xs={6} sm={3}>
              <FormControl fullWidth>
                <TextField
                  value={max}
                  type='number'
                  variant='filled'
                  onKeyDown={(e) => handleKeyPress(e, 'max')}
                  label='Tối đa'
                  onChange={(e) => handleInputChange(e, 'max')}
                  sx={{ '& .MuiInputBase-formControl': { margin: '0 8px' } }}
                />
              </FormControl>
            </Grid>
          </Grid>
        </Box>
        {!!data && !isLoading && !!data?.data.length && (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 auto-rows-max'>
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
