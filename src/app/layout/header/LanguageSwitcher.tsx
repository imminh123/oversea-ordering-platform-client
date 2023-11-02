import * as React from 'react';

import { useUI } from 'app/hooks';
import { Menu, MenuItem, Typography } from '@mui/material';

export interface LanguageSwitcherProps {}

export const LanguageSwitcher: React.FC<LanguageSwitcherProps> = () => {
  const { activeLanguage, setActiveLanguage } = useUI();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = React.useCallback((event: React.MouseEvent<HTMLElement>) => setAnchorEl(event.currentTarget), []);
  const handleClose = React.useCallback(() => setAnchorEl(null), []);

  const open = React.useMemo(() => Boolean(anchorEl), [anchorEl]);

  return (
    <>
      <Typography sx={{ cursor: 'pointer' }} onClick={handleClick}>
        {activeLanguage}
      </Typography>
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
        <MenuItem onClick={() => setActiveLanguage('en')}>English</MenuItem>
        <MenuItem onClick={() => setActiveLanguage('vi')}>Tiếng Việt</MenuItem>
      </Menu>
    </>
  );
};
