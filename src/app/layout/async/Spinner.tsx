import { Box, CircularProgress, circularProgressClasses } from '@mui/material';

interface Props {
  size: number;
  thickness: number;
  color: string;
}

const Spinner: React.FC<Partial<Props>> = ({ size = 24, thickness = 4, color = '#F2C94C', ...rest }) => {
  return (
    <Box
      sx={{
        position: 'relative',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <CircularProgress color='primary' />
    </Box>
  );
};

export default Spinner;
