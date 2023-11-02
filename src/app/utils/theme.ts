import { createTheme } from '@mui/material';
import { envConfig } from 'configs/env.config';

const theme = createTheme({
  palette: {
    primary: {
      main: envConfig.primaryColor,
      contrastText: '#fff',
    },
    secondary: {
      main: envConfig.secondaryColor,
      contrastText: '#fff',
    },
  },
});

export default theme;
