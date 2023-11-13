import { Box, Button, Stack } from '@mui/material';
import useAlert from 'app/hooks/useAlert';

export const Feature2_2 = () => {
  const { alertSuccess, alertError, alertInfo, alertWarning } = useAlert();

  const testAlertSuccess = () => {
    alertSuccess('Success');
  };

  const testAlertError = () => {
    alertError('Error');
  };

  const testAlertInfo = () => {
    alertInfo('Info');
  };

  const testAlertWarning = () => {
    alertWarning('Warning');
  };

  return (
    <Box sx={{ p: 2 }}>
      <Stack spacing={2} direction='row'>
        <Button variant='contained' color='success' onClick={testAlertSuccess}>
          Alert success
        </Button>
        <Button variant='contained' color='error' onClick={testAlertError}>
          Alert error
        </Button>
        <Button variant='contained' color='info' onClick={testAlertInfo}>
          Alert info
        </Button>
        <Button variant='contained' color='warning' onClick={testAlertWarning}>
          Alert warning
        </Button>
      </Stack>
    </Box>
  );
};
