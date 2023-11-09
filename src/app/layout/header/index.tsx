import * as React from 'react';

import { Menu as MenuIcon } from '@mui/icons-material';
import {
  AppBar as MUIAppBar,
  AppBarProps as MUIAppBarProps,
  CssBaseline,
  IconButton,
  Stack,
  styled,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import queryString from 'query-string';
import { useHistory } from 'react-router-dom';

import { EDrawerType, ESidebarExpandVariant } from 'app/context/ui/enum';
import { sidebarWidth } from 'configs/sidebar.config';
import { useUI } from 'app/hooks';
import { CurrentAccountBadge } from 'app/layout/header/CurrentAccountBadge';
// import { LanguageSwitcher } from 'app/layout/header/LanguageSwitcher';
import { ShoppingCart, Notifications } from '@mui/icons-material';
import { useToggleSidebar } from 'app/hooks/toggleSidebar';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

interface AppBarProps extends MUIAppBarProps {
  open?: boolean;
}

const AppBar = styled(MUIAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(['margin', 'width'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${sidebarWidth}px)`,
    marginLeft: `${sidebarWidth}px`,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export const Header: React.FC<Props> = ({ open, setOpen }) => {
  const theme = useTheme();
  const history = useHistory();
  const matchSM = useMediaQuery(theme.breakpoints.down('sm'));
  const { openDrawer, setSidebarExpandVariant } = useUI();
  const {updateToggle} = useToggleSidebar()
  const handleDrawerToggle = () => {
    if (!matchSM) {
      setOpen(!open);
    } else {
      openDrawer(EDrawerType.SIDEBAR_DRAWER, 'left');
    }

    let expandVariant: ESidebarExpandVariant;
    if (open) {
      expandVariant = ESidebarExpandVariant.EXPAND_LESS;
    } else {
      expandVariant = ESidebarExpandVariant.EXPAND_MORE;
    }
    setSidebarExpandVariant(expandVariant);
    updateToggle(expandVariant)
  };

  return (
    <>
      <CssBaseline />
      <AppBar position='fixed' color='default' open={open}>
        <Toolbar>
          <IconButton
            size='large'
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerToggle}
            edge='start'
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>

          <Stack direction={'row'} alignItems={'center'} spacing={2} sx={{ ml: 'auto' }}>
            <ShoppingCart/>
            <Notifications/>
            <CurrentAccountBadge loading={false} />
            {/* <LanguageSwitcher /> */}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};
