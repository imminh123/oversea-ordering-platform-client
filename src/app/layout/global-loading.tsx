import { Backdrop, Box, useTheme } from '@mui/material';
import HashLoader from 'react-spinners/HashLoader';

interface Props {
  loading: boolean;
}

export const GlobalLoading: React.FC<Props> = ({ loading }) => {
  const theme = useTheme();

  if (!loading) {
    return null;
  }

  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
      }}
    >
      <Backdrop sx={{ zIndex: (theme) => theme.zIndex.drawer + 1, backgroundColor: '#fff' }} open={loading}>
        <HashLoader color={theme.palette.primary.main} loading={loading} size={50} />
      </Backdrop>
    </Box>
  );
};
