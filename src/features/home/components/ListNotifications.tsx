import {
  Box,
  Card,
  CardHeader,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { IStoreQuery, useFetchNotifications } from '@novu/notification-center';
import { LoadingCard, NoItemFound } from 'app/components/Item';
import { useEffect } from 'react';
const query: IStoreQuery = {
  limit: 5,
};
export const ListNotifications = () => {
  const onSuccess = (data: any) => {};
  const onError = (error: Error) => {};
  const { data: notificationsPages, refetch, isLoading } = useFetchNotifications({ query }, { onSuccess, onError });

  useEffect(() => {
    if (!notificationsPages) {
      refetch();
    }
  });
  return (
    <Grid item xs={12} sm={6} lg={4}>
      {!!notificationsPages?.pages[0].data.length && (
        <Card sx={{ marginTop: '20px' }}>
          <CardHeader title={<Typography variant={'h6'}>Thông báo</Typography>} />
          <TableContainer component={Paper} elevation={3}>
            <Table aria-label='thong bao'>
              <TableBody>
                {notificationsPages?.pages[0].data.map((row: any, index) => (
                  <NotiRow key={index} data={row} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Card>
      )}
      {!notificationsPages?.pages[0].data.length && !isLoading && (
        <Box sx={{ marginTop: '20px' }}>
          <NoItemFound text='Không có thông báo mới' />
        </Box>
      )}
      {isLoading && (
        <Box sx={{ marginTop: '20px' }}>
          <LoadingCard />
        </Box>
      )}
    </Grid>
  );
};

const NotiRow = ({ data }: { data: any }) => {
  return (
    <TableRow
      hover
      onClick={() => {
        window.open(data?.cta?.data?.url, '_blank');
      }}
      className='cursor-pointer'
    >
      <TableCell sx={{ wordWrap: 'break-word', maxWidth: '375px' }}>
        <Typography variant='body2' component='p'>
          {data.content}
        </Typography>
      </TableCell>
    </TableRow>
  );
};
