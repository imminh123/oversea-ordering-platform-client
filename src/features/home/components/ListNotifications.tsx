import {
  Card,
  CardHeader,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
} from '@mui/material';
import { IStoreQuery, useFetchNotifications } from '@novu/notification-center';
import { useEffect } from 'react';
const query: IStoreQuery = {
  limit: 5,
};
export const ListNotifications = () => {
  const onSuccess = (data: any) => {
    console.log(data);
  };
  const onError = (error: Error) => {
    console.log(error);
  };
  const { data: notificationsPages, refetch } = useFetchNotifications({ query }, { onSuccess, onError });

  useEffect(() => {
    if (!notificationsPages) {
      refetch();
    }
  });
  return (
    <Card sx={{ marginTop: '20px' }}>
      <CardHeader title={<Typography variant={'h6'}>Thông báo</Typography>} />
      <TableContainer component={Paper} elevation={3}>
        <Table aria-label='thong bao'>
          <TableBody>
            {notificationsPages?.pages[0].data.map((row: any) => (
              <NotiRow key={row.id} data={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Card>
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
