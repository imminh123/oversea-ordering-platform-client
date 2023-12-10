import { styled } from '@mui/material';
import { unstable_extendSxProp as extendSxProp } from '@mui/system';

export const StyledDiv = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export const HeaderPlaceHolder = (inProps: any) => {
  const { sx } = extendSxProp(inProps);
  return <StyledDiv sx={sx} />;
};
