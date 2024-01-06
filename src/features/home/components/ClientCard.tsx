import { AttachMoney, FormatListBulleted } from '@mui/icons-material';
import { Avatar, Box, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
interface Props {
  type: string;
  sx?: object;
  value: number;
}

const mappingTitle = (type: string) => {
  switch (type) {
    case 'lenCart':
      return 'Tổng giỏ hàng';
    case 'lenOrder':
      return 'Tổng đơn hàng';
    case 'countCreated':
      return 'Đơn mới';
    case 'countPendingPayment':
      return 'Chờ thanh toán';
    case 'countDelivered':
      return 'Đơn đã thanh toán';
    case 'countPendingOrder':
      return 'Đơn đang xử lý';
    default:
      return '';
  }
};

const mappingColor = (type: string) => {
  switch (type) {
    case 'lenOrder':
      return '#F04438';
    case 'countCreated':
      return '#10B981';

    case 'countPendingPayment':
      return '#F79009';

    case 'countDelivered':
      return '#6366F1';

    default:
      return 'primary.main';
  }
};

export const ClientCard: React.FC<Props> = (props: Props) => {
  const { type, sx, value } = props;

  return (
    <Card sx={sx}>
      <Box sx={{ paddingX: 3, paddingY: 2 }}>
        <Stack alignItems='flex-start' direction='row' justifyContent='space-between' spacing={3}>
          <Stack spacing={1}>
            <Typography color='text.secondary' variant='overline'>
              {mappingTitle(type)}
            </Typography>
            <Typography variant='h4'>{value}</Typography>
          </Stack>
          <Avatar
            sx={{
              backgroundColor: mappingColor(type),
              height: 36,
              width: 36,
            }}
          >
            <SvgIcon>
              <AttachMoney />
            </SvgIcon>
          </Avatar>
        </Stack>
      </Box>
    </Card>
  );
};
