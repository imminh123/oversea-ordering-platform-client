import * as React from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { CssBaseline, IconButton, Stack, Toolbar, useMediaQuery, useTheme, Typography } from '@mui/material';
import { EDrawerType, ESidebarExpandVariant } from 'app/context/ui/enum';
import { useUI } from 'app/hooks';
import { CurrentAccountBadge } from 'app/layout/header/CurrentAccountBadge';
import { useToggleSidebar } from 'app/hooks/toggleSidebar';
import { REFETCH_INTERVAL } from 'app/utils/constants';
import { formatMoneyToVND } from 'app/utils/helper';
import { useListVariables } from 'features/variables/api/useGetVariables';
import { VariableType } from 'features/variables/variables.const';
import { AppBar } from './AppBar';
interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const AdminHeader: React.FC<Props> = ({ open, setOpen }) => {
  const theme = useTheme();
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
            <CurrentAccountBadge loading={false} isAdmin={true} />
          </Stack>
        </Toolbar>
      </AppBar>
    </>
  );
};
