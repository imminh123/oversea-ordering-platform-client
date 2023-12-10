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
  Badge,
} from '@mui/material';
import { EDrawerType, ESidebarExpandVariant } from 'app/context/ui/enum';
import { sidebarWidth } from 'configs/sidebar.config';
import { useUI } from 'app/hooks';
import { CurrentAccountBadge } from 'app/layout/header/CurrentAccountBadge';
import { ShoppingCart, Notifications } from '@mui/icons-material';
import { useToggleSidebar } from 'app/hooks/toggleSidebar';
import { useHistory } from 'react-router-dom';
import { REFETCH_INTERVAL } from 'app/utils/constants';
import { formatMoneyToVND } from 'app/utils/helper';
import { useCountCart } from 'features/cart/api/useCountCart';
import { useListVariables } from 'features/variables/api/useGetVariables';
import { VariableType } from 'features/variables/variables.const';
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

export const ClientHeader: React.FC<Props> = ({ open, setOpen }) => {
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

  const { data: exchangeRes } = useListVariables(
    { page: 1, name: VariableType.EXCHANGE_KEY },
    { refetchInterval: REFETCH_INTERVAL },
  );
  const exchange = exchangeRes?.data[0].value;
  const { data: numberInCart } = useCountCart({ refetchInterval: 10000 });
  const number = React.useMemo(() => {
    return numberInCart?.data || 0;
  }, [numberInCart?.data]);
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
            <Typography variant='subtitle2' color='primary' sx={{ mb: 4 }} align='center'>
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
              <Badge invisible={!number} badgeContent={number} color='error'>
                <ShoppingCart />
              </Badge>
            </IconButton>
            <Notifications />
            <CurrentAccountBadge loading={false} />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};
