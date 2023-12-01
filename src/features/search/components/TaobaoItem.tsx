import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ISearchRes } from '../api/useSearchItem';
import { formatMoneyToCN } from 'app/utils/helper';

export const TaobaoItem = ({ item }: { item: ISearchRes }) => {
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={`https:${item.pic}`} title={item.title} />
      <CardContent>
        <Typography variant='body2' color='text.secondary'>
          {item.title}
        </Typography>
        <Typography gutterBottom variant='body2' component='div' className='mt-2 line-through'>
          Giá cũ: {formatMoneyToCN(parseFloat(item.price))}
        </Typography>
        <Typography gutterBottom variant='body2' component='div' className='text-red-500'>
          Giá mới: {formatMoneyToCN(parseFloat(item.promotion_price))}
        </Typography>
      </CardContent>
      <CardActions>
        <a href={`http:${item.detail_url}`} target='_blank' rel='noopener noreferrer'>
          <Button size='small'>Xem trên Taobao</Button>
        </a>
      </CardActions>
    </Card>
  );
};
