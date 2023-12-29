import moment from 'moment';
import ReactJson from 'react-json-view';
import { Box } from '@mui/material';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import TimelineOppositeContent, { timelineOppositeContentClasses } from '@mui/lab/TimelineOppositeContent';
import { IOrderHistories } from 'features/cart/api/useGetOrderDetail';
import { mappingOrderStatus } from 'features/order/components';

export const LeftAlignedTimeline = ({ data }: { data: IOrderHistories[] }) => {
  return (
    <Timeline
      sx={{
        [`& .${timelineOppositeContentClasses.root}`]: {
          flex: 0.2,
        },
      }}
    >
      {data.map((item) => (
        <TimelineItem key={item.id}>
          <TimelineOppositeContent color='textSecondary'>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>{moment(item.createdAt).format('DD/MM/YYYY')}</Box>
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent>
            <Box>{mappingOrderStatus(item.status)}</Box>
            {item?.meta?.description && <Box>Mô tả: {item.meta.description}</Box>}
          </TimelineContent>
        </TimelineItem>
      ))}
    </Timeline>
  );
};
