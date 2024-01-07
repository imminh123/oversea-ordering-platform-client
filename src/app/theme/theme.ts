import { createTheme } from '@mui/material';
import { createPalette } from './create-palette';
import { typography } from './create-typography';
import { components } from './create-components';
import { shadows } from './create-shadows';

export const novuBellStyle = {
  bellButton: {
    root: {
      svg: {
        color: 'rgba(0, 0, 0, 0.87)',
        fill: 'white',
      },
    },
  },
  notifications: {
    listItem: {
      title: {
        fontSize: '12px',
      },
    },
  },
};
const palette = createPalette();

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 900,
      lg: 1200,
      xl: 1440,
    },
  },
  components,
  palette,
  shadows,
  shape: {
    borderRadius: 8,
  },
  typography,
});

export default theme;
