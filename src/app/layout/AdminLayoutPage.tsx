import * as React from 'react';
import { Box, useMediaQuery, useTheme } from '@mui/material';
import { jwtDecode } from 'jwt-decode';
import { ESidebarExpandVariant } from 'app/context/ui/enum';
import { HeaderPlaceHolder } from './header-placeholder';
import { Main } from './main';
import { Sidebar } from './sidebar';
import { useUI } from 'app/hooks';
import { AdminHeader } from './header/AdminHeader';
import AuthContext from 'app/context/auth';
import { UserRole } from 'app/types/user';
import storage from 'app/utils/storage';
import { useHistory } from 'react-router-dom';
import { RoutePathsEnum } from 'configs/route.config';
import { NovuProvider } from '@novu/notification-center';
import useAuth from 'app/hooks/useAuth';
import { novuBellStyle } from 'app/theme/theme';
import { envConfig } from 'configs/env.config';

interface Props {}
interface TokenEntity {
  userId: string;
  role: UserRole;
}
export const AdminLayoutPage: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const history = useHistory();
  const token = storage.getAccessTokenClient();
  const context = React.useContext(AuthContext);
  const { sidebarExpandVariant } = useUI();

  if (token) {
    const user: TokenEntity = jwtDecode(token);
    if (user?.role !== UserRole.Admin) {
      history.push(RoutePathsEnum.AdminLoginPage);
      storage.clearTokensClient();
      context.setAuthenticated(false);
      context.setUser(null);
    }
  }
  const { user } = useAuth();

  const matchMD = useMediaQuery(theme.breakpoints.down('md'));
  const [open, setOpen] = React.useState(() => {
    return !(matchMD || sidebarExpandVariant === ESidebarExpandVariant.EXPAND_LESS);
  });

  React.useEffect(() => {
    if (matchMD) {
      setOpen(false);
    } else {
      setOpen(true);
    }
  }, [matchMD]);

  return (
    <NovuProvider styles={novuBellStyle} subscriberId={user?.id || ''} applicationIdentifier={envConfig.VITE_NOVU_KEY}>
      <Box sx={{ display: 'flex' }}>
        <AdminHeader open={open} setOpen={setOpen} />
        <Sidebar loading={false} open={open} type='admin' />
        <Main open={open}>
          <HeaderPlaceHolder />
          {children}
        </Main>
      </Box>
    </NovuProvider>
  );
};
