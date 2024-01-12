import { Box, CssBaseline, Typography } from '@mui/material';

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
            background: 'url("/warehouse.webp")',
            backgroundRepeat: 'none',
            position: 'relative',
            backgroundSize: 'cover',
            color: 'white',
            display: 'flex',
            justifyContent: 'center',
            paddingTop: 20,
            '& img': {
              maxWidth: '100%',
            },
            ':before': {
              content: "''",
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0, 0, 0, 0.6)',
            },
          }}
        >
          <Box
            sx={{
              p: 3,
              position: 'absolute',
              top: '50%',
              left: '50%',
              width: '100%',
              transform: 'translate(-50%, -50%)',
              color: '#fff',
              textAlign: 'center',
              zIndex: 1,
            }}
          >
            <Typography
              align='center'
              color='inherit'
              sx={{
                fontSize: '28px',
                lineHeight: '36px',
                mb: 1,
              }}
              variant='h1'
            >
              Chào mừng đến với{' '}
              <Box component='a' sx={{ color: '#ff5000' }} target='_blank'>
                MBY Logistics
              </Box>
            </Typography>
            <Typography align='center' sx={{ mb: 3 }} variant='subtitle1'>
              Nhập Hàng Trung Quốc Tận Gốc, Tối Ưu Chi Phí, Vận Chuyển Nhanh Chóng.
            </Typography>
          </Box>
        </Box>
      </Box>
    </>
  );
};
