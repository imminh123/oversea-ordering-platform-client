import * as React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useParams } from 'react-router-dom';
import { useActiveAccount } from './useActiveAccount';
import { LoadingButton } from '@mui/lab';

interface Props {}
export const ActivePage: React.FC<Props> = () => {
  const param: { token: string } = useParams();
  const { mutateAsync: active, isLoading } = useActiveAccount();
  return (
    <Box
      sx={{
        width: '100%',
      }}
    >
      <Box
        sx={{
          maxWidth: 500,
          m: 'auto',
          px: 2,
          py: 4,
          mt: 10,
          boxShadow: (theme) => theme.shadows[3],
        }}
      >
        <Typography variant='h5' color='primary' sx={{ mb: 4 }} align='center'>
          MBY Logistics
        </Typography>
        <Box display={'flex'} justifyContent={'center'} className='mt-5'>
          <LoadingButton
            loadingIndicator='Đang chờ...'
            variant='text'
            onClick={() => {
              active(param.token);
            }}
            loading={isLoading}
          >
            Xác thực
          </LoadingButton>
        </Box>
      </Box>
    </Box>
  );
};
