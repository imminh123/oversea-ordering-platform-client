import { AttachMoney, FormatListBulleted } from '@mui/icons-material';
import { Avatar, Card, CardContent, Stack, SvgIcon, Typography } from '@mui/material';
interface Props {
  type: string;
  sx?: object;
  value: number;
}

const mappingTitle = (type: string) => {
  switch (type) {
    case 'countOrderFromBeginOfDay':
    case 'countOrderFromBeginOfMonth':
      return 'Tổng đơn hàng';

    case 'totalMoneyEarnedFromBeginOfDay':
    case 'totalMoneyEarnedFromBeginOfMonth':
    default:
      return 'Tổng tiền hàng';
  }
};

const mappingSince = (type: string) => {
  switch (type) {
    case 'countOrderFromBeginOfDay':
    case 'totalMoneyEarnedFromBeginOfDay':
      return 'trên ngày';

    case 'countOrderFromBeginOfMonth':
    case 'totalMoneyEarnedFromBeginOfMonth':
    default:
      return 'trên tháng';
  }
};

const mappingIcon = (type: string) => {
  switch (type) {
    case 'countOrderFromBeginOfDay':
    case 'countOrderFromBeginOfMonth':
      return <FormatListBulleted />;

    case 'totalMoneyEarnedFromBeginOfDay':
    case 'totalMoneyEarnedFromBeginOfMonth':
    default:
      return <AttachMoney />;
  }
};

const mappingColor = (type: string) => {
  switch (type) {
    case 'countOrderFromBeginOfDay':
      return '#F04438';
    case 'countOrderFromBeginOfMonth':
      return '#10B981';

    case 'totalMoneyEarnedFromBeginOfDay':
      return '#F79009';

    case 'totalMoneyEarnedFromBeginOfMonth':
      return '#6366F1';

    default:
      return 'primary.main';
  }
};

export const AdminCard: React.FC<Props> = (props: Props) => {
  const { type, sx, value } = props;

  return (
    <Card sx={sx}>
      <CardContent>
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
              height: 56,
              width: 56,
            }}
          >
            <SvgIcon>{mappingIcon(type)}</SvgIcon>
          </Avatar>
        </Stack>
        <Stack alignItems='center' direction='row' spacing={2} sx={{ mt: 2 }}>
          <Typography color='text.secondary' variant='caption'>
            {mappingSince(type)}
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  );
};
