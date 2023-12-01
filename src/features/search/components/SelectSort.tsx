import * as React from 'react';
import { Logout, MoreVert, Person } from '@mui/icons-material';
import { Box, IconButton, ListItemIcon, Menu, MenuItem } from '@mui/material';
import { SortOption } from '../api/useSearchItem';

export const SelectSort = ({ onSort }: { onSort: (sort: SortOption) => void }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleSelectSort = (e: SortOption) => {
    onSort(e);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
      }}
    >
      <IconButton onClick={handleClick} size='small' sx={{ ml: 2 }}>
        <MoreVert />
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
        <MenuItem onClick={() => handleSelectSort(SortOption.default)}>Mặc định</MenuItem>
        <MenuItem onClick={() => handleSelectSort(SortOption.priceAsc)}>Giá tăng dần</MenuItem>
        <MenuItem onClick={() => handleSelectSort(SortOption.priceDesc)}>Giá giảm dần</MenuItem>
        <MenuItem onClick={() => handleSelectSort(SortOption.salesAsc)}>Khuyến mại tăng dần</MenuItem>
        <MenuItem onClick={() => handleSelectSort(SortOption.salesDesc)}>Khuyến mại tăng dần</MenuItem>
      </Menu>
    </Box>
  );
};
