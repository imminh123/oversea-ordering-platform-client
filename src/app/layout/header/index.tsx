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
  Typography,
} from '@mui/material';
import { EDrawerType, ESidebarExpandVariant } from 'app/context/ui/enum';
import { sidebarWidth } from 'configs/sidebar.config';
import { useUI } from 'app/hooks';
import { CurrentAccountBadge } from 'app/layout/header/CurrentAccountBadge';
import { ShoppingCart, Notifications } from '@mui/icons-material';
import { useToggleSidebar } from 'app/hooks/toggleSidebar';
import { useHistory } from 'react-router-dom';
import { useListVariables } from 'app/api/useGetVariables';
import { EXCHANGE_KEY, REFETCH_INTERVAL } from 'app/utils/constants';
import { formatMoneyToVND } from 'app/utils/helper';
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
  const { updateToggle } = useToggleSidebar();
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
    updateToggle(expandVariant);
  };

  const { data: cartItems } = useListVariables({ page: 1, name: EXCHANGE_KEY }, { refetchInterval: REFETCH_INTERVAL });
  const exchange = cartItems?.data[0].value;
  return (
    <>
      <CssBaseline />
      <AppBar position='fixed' color='default' open={open}>
        <Toolbar>
          <Stack direction={'row'} alignItems={'center'} spacing={2}>
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
            <Typography
              variant='subtitle2'
              color='primary'
              sx={{ mb: 4, '&::after': { content: '" đ"' } }}
              align='center'
            >
              Tỉ giá: {formatMoneyToVND(parseFloat(exchange || '0'))}
            </Typography>
          </Stack>

          <Stack direction={'row'} alignItems={'center'} spacing={1} sx={{ ml: 'auto' }}>
            <IconButton
              size='large'
              color='inherit'
              aria-label='open drawer'
              onClick={() => {
                history.push('/cart');
              }}
              edge='start'
            >
              <ShoppingCart />
            </IconButton>

            <Notifications />
            <CurrentAccountBadge loading={false} />
            {/* <LanguageSwitcher /> */}
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};
