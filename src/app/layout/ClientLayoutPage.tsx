import * as React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { ESidebarExpandVariant } from 'app/context/ui/enum';
import { ClientHeader } from './header/ClientHeader';
import { HeaderPlaceHolder } from './header-placeholder';
import { Main } from './main';
import { Sidebar } from './sidebar';
import { useUI } from 'app/hooks';
import { NovuProvider } from '@novu/notification-center';
import { novuBellStyle } from 'app/theme/theme';
import { envConfig } from 'configs/env.config';
import useAuth from 'app/hooks/useAuth';

interface Props {}

export const ClientLayoutPage: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const { sidebarExpandVariant } = useUI();
  const matchMD = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(() => {
    return !(matchMD || sidebarExpandVariant === ESidebarExpandVariant.EXPAND_LESS);
  });
  const { user } = useAuth();

  React.useEffect(() => {
    if (matchMD) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [matchMD]);

  return (
    <>
      <NovuProvider
        styles={novuBellStyle}
        subscriberId={user?.id || ''}
        applicationIdentifier={envConfig.VITE_NOVU_KEY}
      >
        <Box sx={{ display: 'flex' }}>
          <ClientHeader open={open} setOpen={setOpen} />
          <Sidebar loading={false} open={open} />
          <Main open={open}>
            <HeaderPlaceHolder />
            {children}
          </Main>
        </Box>
      </NovuProvider>
    </>
  );
};
