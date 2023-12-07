import * as React from 'react';

import { Logout, Person } from '@mui/icons-material';
import { Avatar, Box, IconButton, ListItemIcon, Menu, MenuItem, Skeleton } from '@mui/material';

import useAuth from 'app/hooks/useAuth';
import AuthContext from 'app/context/auth';
import { useHistory } from 'react-router-dom';

interface Props {
  loading: boolean;
}

export const CurrentAccountBadge: React.FC<Props> = ({ loading }) => {
  const { logout } = useAuth();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const context = React.useContext(AuthContext);

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      {loading ? (
        <Skeleton variant='text' width={100} />
      ) : (
        <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
          {context.user?.avatar ? (
            <Avatar sx={{ width: 32, height: 32 }} src={context.user?.avatar}></Avatar>
          ) : (
            <Avatar sx={{ width: 32, height: 32 }}>
              {context.user?.fullname ? context.user?.fullname.charAt(0) : 'A'}
            </Avatar>
          )}
        </IconButton>
      )}

      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
            mt: 1.5,
            '& .MuiAvatar-root': {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={() => history.push('/info')}>
          <ListItemIcon>
            <Person fontSize='small' />
          </ListItemIcon>
          Thông tin cá nhân
        </MenuItem>
        <MenuItem onClick={logout}>
          <ListItemIcon>
            <Logout fontSize='small' />
          </ListItemIcon>
          Đăng xuất
        </MenuItem>
      </Menu>
    </Box>
  );
};
