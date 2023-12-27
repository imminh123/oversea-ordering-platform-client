import * as React from 'react';

import { Notifications } from '@mui/icons-material';
import { Box, IconButton, Menu, MenuItem, Typography } from '@mui/material';

interface Props {
  isAdmin?: boolean;
}

export const NotificationBox: React.FC<Props> = ({ isAdmin }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <IconButton onClick={handleClick} size='large' color='inherit' aria-label='Notifications' edge='start'>
        {/* <Badge invisible={!number} badgeContent={number} color='error'> */}
        <Notifications />
        {/* </Badge> */}
      </IconButton>

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
        <Box sx={{ width: 500, p: 2 }}>
          <Typography variant='h6' className=' text-slate-900'>
            Thông báo
          </Typography>
          <MenuItem>Khách hàng A vừa thanh toán thành công 1.000.000 vnđ</MenuItem>
        </Box>
      </Menu>
    </Box>
  );
};
