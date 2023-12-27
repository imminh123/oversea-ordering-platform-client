import { Box, CssBaseline, Grid, Link, Typography } from '@mui/material';

interface Props {}
export const AuthLayout: React.FC<Props> = ({ children }) => {
  return (
    <>
      <CssBaseline />
      <Box component='main' className='grid grid-cols-1 sm:grid-cols-2 h-screen'>
        <Box
          sx={{
            backgroundColor: 'background.paper',
            display: 'flex',
            flexDirection: 'column',
            position: 'relative',
          }}
        >
          {children}
        </Box>
        <Box
          sx={{
            alignItems: 'center',
            background: 'radial-gradient(50% 50% at 50% 50%, #122647 0%, #090E23 100%)',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            '& img': {
              maxWidth: '100%',
            },
          }}
        >
          <Box sx={{ p: 3 }}>
            <Typography
              align='center'
              color='inherit'
              sx={{
                fontSize: '24px',
                lineHeight: '32px',
                mb: 1,
              }}
              variant='h1'
            >
              Chào mừng đến với{' '}
              <Box component='a' sx={{ color: '#15B79E' }} target='_blank'>
                MBY Logistics
              </Box>
            </Typography>
            <Typography align='center' sx={{ mb: 3 }} variant='subtitle1'>
              Nhập Hàng Trung Quốc Tận Gốc, Tối Ưu Chi Phí, Vận Chuyển Nhanh Chóng.
            </Typography>
            <img alt='' src='/auth-illustration.svg' />
          </Box>
        </Box>
      </Box>
    </>
  );
};
