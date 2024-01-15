import {
  Box,
  Card,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  TextField,
  useTheme,
} from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { ISearchRes, SortOption, useSearchItem } from './api/useSearchItem';
import { ImageSearch, Search as SearchIcon } from '@mui/icons-material';
import { TaobaoItem } from './components/TaobaoItem';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';
import { Language, QueryLangOptions, SortOptions, TargetLangOptions } from './search.const';
import { useSearchItemByImg } from './api/useSearchItemByImg';
import { base64ToFile, fileToDataUri, removeNullProperties } from 'app/utils/helper';
import { LoadingCard, NoItemFound } from 'app/components/Item';

export const Search = () => {
  const history = useHistory();
  const locationSearch = history.location.search;
  const queryObject: any = queryString.parse(locationSearch);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const [page, setPage] = useState<number>(parseInt(queryObject.page) || 1);
  const [count, setCount] = useState<number>(0);
  const [q, setQ] = useState(queryObject.q || 'Quần áo nữ');
  const [minPrice, setMinPrice] = useState<number | undefined>(queryObject.minPrice || '');
  const [maxPrice, setMaxPrice] = useState<number | undefined>(queryObject.maxPrice || '');
  const [search, setSearch] = useState(queryObject.q || 'Quần áo nữ');
  const [sort, setSort] = useState(queryObject.sort || SortOption.default);
  const [min, setMin] = useState<number | undefined>(queryObject.minPrice || '');
  const [max, setMax] = useState<number | undefined>(queryObject.maxPrice || '');
  const [target_language, setTarget_language] = useState<Language>(queryObject.target_language || Language.VI);
  const [query_language, setQuerylanguage] = useState<Language>(queryObject.query_language || Language.VI);
  const [selectedImage, setSelectedImage] = useState<any>(queryObject.selectedImage || null);
  const [dataShow, setDataShow] = useState<ISearchRes[]>([]);
  const { data: dataText, isLoading: loadingDataText } = useSearchItem(
    { q, page, sort, target_language, query_language, minPrice, maxPrice },
    { enabled: !!q || !!minPrice || !!maxPrice, refetchOnWindowFocus: false },
  );
  const { mutateAsync: searchByImg, data: dataImg, isLoading: loadingDataImg } = useSearchItemByImg();
  const theme = useTheme();

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
          setSelectedImage(null);
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

  const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleSearchByImage = ({ target }: { target: any }) => {
    const file = target.files[0];
    fileToDataUri(file).then((data: any) => {
      setQ('');
      setSelectedImage(file.name);
      sessionStorage.clear();
      sessionStorage.setItem(file.name, data);
    });
  };

  useEffect(() => {
    if (selectedImage && !q) {
      const cachedDataUrl = sessionStorage.getItem(selectedImage);
      if (cachedDataUrl) {
        const file = base64ToFile(cachedDataUrl, selectedImage);
        const formData = new FormData();
        formData.append('file', file);
        const param = {
          page,
          sort,
          target_language,
          query_language,
          minPrice,
          maxPrice,
        };
        searchByImg({ param, body: formData });
      }
    }
  }, [selectedImage, page, sort, target_language, query_language, minPrice, maxPrice]);

  useEffect(() => {
    const queryObject = removeNullProperties({ page, q, sort, target_language, query_language, selectedImage });

    history.push({ search: queryString.stringify(queryObject) });
  }, [page, q, sort, target_language, query_language, selectedImage]);

  useEffect(() => {
    if (!!dataText && !loadingDataText && !!dataText?.data.length) {
      setDataShow(dataText.data);
      setCount(parseInt(dataText?.headers['x-pages-count'].toString() || '0'));
    } else if (!!dataImg && !loadingDataImg && !!dataImg?.items?.length) {
      setDataShow(dataImg.items);
      setCount(parseInt(dataText?.headers['x-pages-count'].toString() || '0'));
    } else {
      setDataShow([]);
      setCount(0);
    }
  }, [dataImg, dataText]);

  useEffect(() => {
    if (searchBoxRef?.current) searchBoxRef.current.focus();
  }, []);

  return (
    <>
      <Helmet>
        <title>Tìm kiếm</title>
      </Helmet>
      <Container className='mt-5 mb-10'>
        <Card sx={{ p: 2, marginBottom: '10px' }}>
          <Box>
            <FormControl fullWidth>
              <TextField
                value={search}
                fullWidth
                inputRef={searchBoxRef}
                onKeyDown={(e) => handleKeyPress(e, 'q')}
                label='Tìm kiếm sản phẩm Taobao'
                onChange={(e) => handleInputChange(e, 'q')}
                InputProps={{
                  endAdornment: (
                    <>
                      <IconButton title='Tìm kiếm' aria-label='search by text' edge='end' onClick={() => setQ(search)}>
                        <SearchIcon color='primary' />
                      </IconButton>
                      <IconButton title='Tìm kiếm bằng hình ảnh' aria-label='search by image' edge='end'>
                        <input
                          accept='image/*'
                          id='search-by-img'
                          className='hidden'
                          type='file'
                          onChange={handleSearchByImage}
                        />
                        <label htmlFor='search-by-img' style={{ cursor: 'pointer' }}>
                          <ImageSearch color='primary' />
                        </label>
                      </IconButton>
                    </>
                  ),
                }}
              />
            </FormControl>
          </Box>
          <Box className='grid grid-cols-2 sm:grid-cols-5 gap-2 mt-3'>
            <Box>
              <FormControl fullWidth>
                <InputLabel size='small' id='target-lang-label' sx={{ left: '5px' }}>
                  Ngôn ngữ trả về
                </InputLabel>
                <Select
                  labelId='target-lang-label'
                  id='target-lang'
                  size='small'
                  value={target_language}
                  label='Ngôn ngữ trả về'
                  onChange={(e) => handleInputChange(e, 'target_language')}
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
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel size='small' id='query-lang-label' sx={{ left: '5px' }}>
                  Ngôn ngữ tìm kiếm
                </InputLabel>
                <Select
                  labelId='query-lang-label'
                  size='small'
                  id='query-lang'
                  value={query_language}
                  label='Ngôn ngữ tìm kiếm'
                  onChange={(e) => handleInputChange(e, 'query_language')}
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
            </Box>
            <Box>
              <FormControl fullWidth>
                <InputLabel size='small' id='sort-label' sx={{ left: '5px' }}>
                  Sắp xếp
                </InputLabel>
                <Select
                  labelId='sort-label'
                  id='sort'
                  size='small'
                  value={sort}
                  label='Sắp xếp'
                  onChange={(e) => handleInputChange(e, 'sort')}
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
            </Box>
            <Box>
              <FormControl fullWidth>
                <TextField
                  value={min}
                  size='small'
                  type='number'
                  onKeyDown={(e) => handleKeyPress(e, 'min')}
                  label='Tối thiểu'
                  onChange={(e) => handleInputChange(e, 'min')}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl fullWidth>
                <TextField
                  value={max}
                  type='number'
                  size='small'
                  onKeyDown={(e) => handleKeyPress(e, 'max')}
                  label='Tối đa'
                  onChange={(e) => handleInputChange(e, 'max')}
                />
              </FormControl>
            </Box>
          </Box>
        </Card>
        {!!dataShow.length && !(loadingDataText || loadingDataImg) && (
          <>
            <div className='grid grid-cols-1 sm:grid-cols-4 gap-4 auto-rows-max'>
              {dataShow.map((item) => (
                <TaobaoItem key={item.num_iid} item={item} />
              ))}
            </div>
            <Box className='flex justify-center my-5'>
              <Pagination className='flex justify-center my-2' count={count} page={page} onChange={handleChangePage} />
            </Box>
          </>
        )}
        {(loadingDataText || loadingDataImg) && <LoadingCard />}
        {!loadingDataText && !loadingDataImg && !dataShow.length && <NoItemFound />}
      </Container>
    </>
  );
};
