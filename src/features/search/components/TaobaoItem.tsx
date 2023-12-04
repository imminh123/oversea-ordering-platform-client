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
    <Card sx={{ maxWidth: 345 }} className='flex flex-col justify-between'>
      <CardMedia
        sx={{
          height: 140,
          position: 'relative',
          overflow: 'hidden',
          transition: 'transform 0.3s',
          '&:hover': {
            transform: 'scale(1.1)', // Apply scale transform on hover
          },
          '&:hover::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change background color on hover
            transition: 'background-color 0.3s',
          },
        }}
        image={`https:${item.pic}`}
        title={item.title}
      />
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
      <CardActions className='flex justify-between'>
        <Button
          size='small'
          variant='contained'
          onClick={() => {
            history.push(`/search/${item.num_iid}`);
          }}
        >
          Chi tiết
        </Button>
        <a href={`http:${item.detail_url}`} target='_blank' rel='noopener noreferrer'>
          <Button variant='contained' size='small'>
            Mở trên Taobao
          </Button>
        </a>
      </CardActions>
    </Card>
  );
};
