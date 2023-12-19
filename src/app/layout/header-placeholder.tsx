import { styled } from '@mui/material';
import { unstable_extendSxProp as extendSxProp } from '@mui/system';

type DivProps = {
  bg?: string;
};

export const HeaderPlaceHolder = styled('div')<DivProps>(({ theme, bg }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
  ...(bg && {
    backgroundImage: `url(${bg})`,
    backgroundSize: '75%',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundColor: '#ffffff',
  }),
}));
