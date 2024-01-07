import {
  Box,
  Card,
  Chip,
  Container,
  FormControl,
  IconButton,
  InputLabel,
  MenuItem,
  Pagination,
  Paper,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import { Helmet } from 'react-helmet-async';
import { useHistory } from 'react-router-dom';
import { UserRoleOptions, UserStatusOptions } from './Users.const';
import { useState } from 'react';
import { IUserServerResponse, UserRole } from 'app/types/user';
import { LoadingCard, NoItemFound } from 'app/components/Item';
import { useAdminIndexUsers } from './apis/useAdminIndexUsers';
import { Search } from '@mui/icons-material';
import { mappingBlock, mappingRole } from './components';

export const UsersListing = () => {
  const [page, setPage] = useState<number>(1);
  const [role, setRole] = useState<UserRole>();
  const [status, setStatus] = useState('');
  const [search, setSearch] = useState<string>('');
  const [q, setQ] = useState<string>('');

  const handleInputChange = (event: any, type: string) => {
    switch (type) {
      case 'role':
        setRole(event.target.value);
        break;
      case 'q':
        setQ(event.target.value);
        break;
      case 'status':
        setStatus(event.target.value);
        break;
    }
  };
  const { data: ListUser, isLoading } = useAdminIndexUsers({
    page,
    role,
    ...(status && { isBlock: status === 'true' }),
    search,
  });
  const count = parseInt(ListUser?.data.headers['x-pages-count'].toString() || '0');

  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };
  const handleKeyPress = (e: any, type: string) => {
    if (e.keyCode == 13) {
      switch (type) {
        case 'search':
          setSearch(e.target.value);
          break;
      }
    }
  };
  return (
    <>
      <Helmet>
        <title>Quản lý người dùng</title>
      </Helmet>
      <Container className='mt-5 mb-10'>
        <Box className='flex justify-between items-center mb-3 px-3'>
          <Typography variant={'h6'}>Quản lý người dùng</Typography>
        </Box>
        <Card sx={{ p: 2, marginBottom: '10px' }}>
          <Box className='grid grid-cols-2 sm:grid-cols-3 gap-2 my-3'>
            <Box className='col-span-2 sm:col-span-1'>
              <FormControl fullWidth>
                <TextField
                  value={q}
                  fullWidth
                  size='small'
                  onKeyDown={(e) => handleKeyPress(e, 'search')}
                  onChange={(e) => handleInputChange(e, 'q')}
                  label='Email/sđt'
                  InputProps={{
                    endAdornment: (
                      <>
                        <IconButton aria-label='search icon' edge='end' onClick={() => setSearch(q)}>
                          <Search color='primary' />
                        </IconButton>
                      </>
                    ),
                  }}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl
                fullWidth
                sx={{
                  height: '100%',
                  '& .MuiOutlinedInput-root': {
                    height: '100%',
                  },
                }}
              >
                <InputLabel size='small' id='role-select-label'>
                  Vai trò
                </InputLabel>
                <Select
                  labelId='role-select-label'
                  id='role-select'
                  variant='outlined'
                  size='small'
                  value={role || ''}
                  label='Vai trò'
                  onChange={(e) => handleInputChange(e, 'role')}
                >
                  {UserRoleOptions.map((role, index) => {
                    return (
                      <MenuItem key={index} value={role.value}>
                        {role.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
            <Box>
              <FormControl
                fullWidth
                sx={{
                  height: '100%',
                  '& .MuiOutlinedInput-root': {
                    height: '100%',
                  },
                }}
              >
                <InputLabel size='small' id='status-select-label'>
                  Trạng thái
                </InputLabel>
                <Select
                  labelId='status-select-label'
                  size='small'
                  id='status-select'
                  variant='outlined'
                  value={status?.toString()}
                  label='Trạng thái'
                  onChange={(e) => handleInputChange(e, 'status')}
                >
                  {UserStatusOptions.map((status, index) => {
                    return (
                      <MenuItem key={index} value={`${status.value}`}>
                        {status.label}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Card>
        {!!ListUser && !!ListUser?.data.items.length && !isLoading && (
          <Card>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }} aria-label='đơn hàng'>
                <TableHead>
                  <TableRow>
                    <TableCell>Họ tên</TableCell>
                    <TableCell sx={{ maxWidth: '150px' }} size='small' align='right'>
                      Vai trò
                    </TableCell>
                    <TableCell className='min-w-[150px]'>Email</TableCell>
                    <TableCell align='right'>Chặn</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ListUser?.data.items.map((row: IUserServerResponse) => (
                    <UserItem key={row.id} item={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination className='flex justify-center my-4' count={count} page={page} onChange={handleChange} />
          </Card>
        )}
        {(!ListUser || !ListUser?.data.items.length) && !isLoading && <NoItemFound />}
        {isLoading && <LoadingCard />}
      </Container>
    </>
  );
};

const UserItem = ({ item }: { item: IUserServerResponse }) => {
  const history = useHistory();
  return (
    <TableRow
      hover
      onClick={() => {
        history.push(`/admin/users/${item.id}`);
      }}
      className='cursor-pointer'
      title='Xem chi tiết'
    >
      <TableCell>{item.fullname || '_'}</TableCell>
      <TableCell width={'100px'} size='small' align='right'>
        {mappingRole(item.role)}
      </TableCell>
      <TableCell className='break-words text-ellipsis'>{item.mail}</TableCell>
      <TableCell align='right'>{mappingBlock(item.isBlock)}</TableCell>
    </TableRow>
  );
};
