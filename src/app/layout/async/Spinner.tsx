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
      <CircularProgress
        variant='determinate'
        sx={{
          color: (theme) => theme.palette.grey[theme.palette.mode === 'light' ? 200 : 700],
        }}
        size={size}
        thickness={thickness}
        {...rest}
        value={100}
      />
      <CircularProgress
        variant='indeterminate'
        disableShrink
        sx={{
          color: (theme) => (color ? color : theme.palette.primary.dark),
          animationDuration: '550ms',
          position: 'absolute',
          left: 0,
          [`& .${circularProgressClasses.circle}`]: {
            strokeLinecap: 'round',
          },
        }}
        size={size}
        thickness={thickness}
        {...rest}
      />
    </Box>
  );
};

export default Spinner;
