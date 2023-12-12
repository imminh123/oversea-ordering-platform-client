import { Paper, TableCell, styled, useMediaQuery, useTheme } from '@mui/material';

export const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
  padding: '10px',
}));

export const TD = styled(TableCell)(({ theme, ...props }) => {
  const thisTheme = useTheme();
  const matchesSM = useMediaQuery(thisTheme.breakpoints.down('sm'));
  return {
    ...theme.typography.body2,
    ...props,
    ...(matchesSM && { fontSize: '12px' }),
  };
});
