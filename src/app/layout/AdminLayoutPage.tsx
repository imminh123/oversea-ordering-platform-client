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

interface Props {}
interface TokenEntity {
  userId: string;
  role: UserRole;
}
export const AdminLayoutPage: React.FC<Props> = ({ children }) => {
  const theme = useTheme();
  const history = useHistory();
  const token = storage.getAccessTokenClient();
  const user: TokenEntity = jwtDecode(token);
  const context = React.useContext(AuthContext);

  const { sidebarExpandVariant } = useUI();

  if (user?.role !== UserRole.Admin) {
    history.push(RoutePathsEnum.LoginPage);
    storage.clearTokensClient();
    context.setAuthenticated(false);
    context.setUser(null);
  }

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
    <Box sx={{ display: 'flex' }}>
      <AdminHeader open={open} setOpen={setOpen} />
      <Sidebar loading={false} open={open} type='admin' />
      <Main open={open}>
        <HeaderPlaceHolder />
        {children}
      </Main>
    </Box>
  );
};
