import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ISearchRes } from '../api/useSearchItem';
import { formatMoneyToCN } from 'app/utils/helper';
import { useHistory } from 'react-router-dom';

export const TaobaoItem = ({ item }: { item: ISearchRes }) => {
  const history = useHistory();
  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardMedia sx={{ height: 140 }} image={`https:${item.pic}`} title={item.title} />
      <CardContent>
        <a href={`http:${item.detail_url}`} target='_blank' rel='noopener noreferrer'>
          <Typography variant='body2' color='text.secondary'>
            {item.title}
          </Typography>
        </a>
        <Typography gutterBottom variant='body2' component='div' className='mt-2 line-through'>
          Giá cũ: {formatMoneyToCN(parseFloat(item.price))}
        </Typography>
        <Typography gutterBottom variant='body2' component='div' className='text-red-500'>
          Giá mới: {formatMoneyToCN(parseFloat(item.promotion_price))}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size='small'
          onClick={() => {
            history.push(`/search/${item.num_iid}`);
          }}
        >
          Xem thêm
        </Button>
        <Button size='small'>Thêm vào giỏ hàng</Button>
      </CardActions>
    </Card>
  );
};
