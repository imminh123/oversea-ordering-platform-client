import {
  Box,
  Chip,
  CircularProgress,
  Container,
  FormControl,
  Grid,
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
import { Item, TD } from 'app/utils/Item';
import { useAdminIndexUsers } from './apis/useAdminIndexUsers';
import { Search } from '@mui/icons-material';

export const UsersListing = () => {
  const [page, setPage] = useState<number>(1);
  const [role, setRole] = useState<UserRole>();
  const [status, setStatus] = useState<boolean>(true);
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
        setStatus(event.target.value === 'true');
        break;
    }
  };
  const { data: ListUser, isLoading } = useAdminIndexUsers({
    page,
    role,
    isActive: status,
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
      <Container className='mt-5'>
        <Typography variant={'h6'} sx={{ gridColumn: 'span 2' }}>
          Quản lý người dùng
        </Typography>
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
            <FormControl fullWidth>
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
            <FormControl fullWidth>
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
        {!!ListUser && !!ListUser?.data.items.length && !isLoading && (
          <>
            <TableContainer component={Paper} elevation={3}>
              <Table sx={{ minWidth: 650 }} aria-label='đơn hàng'>
                <TableHead>
                  <TableRow>
                    <TD>Họ tên</TD>
                    <TD sx={{ maxWidth: '150px' }} size='small' align='right'>
                      Vai trò
                    </TD>
                    <TD className=' min-w-[150px]'>Email</TD>
                    <TD align='right'>Trạng thái</TD>
                    <TD align='right'>Chặn</TD>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {ListUser?.data.items.map((row: IUserServerResponse) => (
                    <UserItem key={row.id} item={row} />
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Pagination className='flex justify-center my-2' count={count} page={page} onChange={handleChange} />
          </>
        )}
        {(!ListUser || !ListUser?.data.items.length) && !isLoading && <Item elevation={3}>Không có bản ghi</Item>}
        {isLoading && (
          <Item elevation={3}>
            <CircularProgress />
          </Item>
        )}
      </Container>
    </>
  );
};

const UserItem = ({ item }: { item: IUserServerResponse }) => {
  const history = useHistory();
  return (
    <TableRow
      onClick={() => {
        history.push(`/admin/users/${item.id}`);
      }}
      className=' cursor-pointer'
      sx={{ '&:hover': { backgroundColor: '#e6e6e6' } }}
      title='Xem chi tiết'
    >
      <TD>{item.fullname || '_'}</TD>
      <TableCell width={'100px'} size='small' align='right'>
        {mappingRole(item.role)}
      </TableCell>
      <TD className='break-words text-ellipsis'>{item.mail}</TD>
      <TableCell align='right'>{mappingStatus(item.isActive)}</TableCell>
      <TableCell align='right'>{mappingBlock(item.isBlock)}</TableCell>
    </TableRow>
  );
};

export const mappingStatus = (isActive: boolean) => {
  switch (isActive) {
    case true:
      return <Chip label='Hoạt động' color='primary' variant='outlined' />;
    case false:
      return <Chip label='Ngưng hoạt động' color='error' variant='outlined' />;
  }
};

export const mappingBlock = (isBlock: boolean) => {
  switch (isBlock) {
    case false:
      return <Chip label='Hoạt động' color='primary' variant='outlined' />;
    case true:
      return <Chip label='Đã chặn ' color='error' variant='outlined' />;
  }
};

export const mappingRole = (role: UserRole) => {
  switch (role) {
    case UserRole.Root:
      return <Chip label='Root' color='primary' variant='outlined' />;
    case UserRole.Admin:
      return <Chip label='Admin' color='warning' variant='outlined' />;
    case UserRole.Client:
      return <Chip label='Client' color='success' variant='outlined' />;
  }
};
