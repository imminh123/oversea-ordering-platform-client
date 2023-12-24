import { Box, Card, CardContent } from '@mui/material';
import Spinner from 'app/layout/async/Spinner';

export const LoadingCard = ({ text }: { text?: string }) => {
  return (
    <Card variant='elevation'>
      <CardContent>
        <Box>
          <Spinner />
          {text}
        </Box>
      </CardContent>
    </Card>
  );
};

export const NoItemFound = ({ text }: { text?: string }) => {
  return (
    <Card sx={{ p: 2 }}>
      <Box className='flex justify-center'>
        <span>{text || 'Không có bản ghi'}</span>
      </Box>
    </Card>
  );
};
