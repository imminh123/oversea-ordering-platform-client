import { createTheme } from '@mui/material';
import { createPalette } from './create-palette';
import { typography } from './create-typography';
import { components } from './create-components';
import { shadows } from './create-shadows';
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
