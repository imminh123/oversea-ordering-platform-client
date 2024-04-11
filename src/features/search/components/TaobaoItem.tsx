import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { ISearchRes } from '../api/useSearchItem';
import { formatMoneyToCN } from 'app/utils/helper';
import { useHistory } from 'react-router-dom';
import { Box, useTheme } from '@mui/material';

export const TaobaoItem = ({ item }: { item: ISearchRes }) => {
  const theme = useTheme();
  const history = useHistory();
  return (
    <Card
      className='flex flex-col justify-between cursor-pointer'
      sx={{
        maxWidth: 345,
        '&:hover': {
          outline: `1px solid ${theme.palette.primary.main}`,
          transition: '.1s all',
        },
      }}
    >
      {/* <CardMedia
        sx={{
          height: 140,
          position: 'relative',
          // overflow: 'hidden',
          // transition: 'transform 0.3s',
          // '&:hover': {
          //   transform: 'scale(1.1)', // Apply scale transform on hover
          // },
          // '&:hover::before': {
          //   content: '""',
          //   position: 'absolute',
          //   top: 0,
          //   left: 0,
          //   width: '100%',
          //   height: '100%',
          //   backgroundColor: 'rgba(0, 0, 0, 0.5)', // Change background color on hover
          //   transition: 'background-color 0.3s',
          // },
        }}
        // image={`${item.pic_url}`}
        src={`${item.pic_url}`}
        title={item.title}
        onClick={() => {
          history.push(`/search/${item.num_iid}`);
        }}
      /> */}
      <Box
        component='img'
        src={`https://images.weserv.nl/?url=${item.pic_url}`}
        alt='product_image'
        srcSet={`https://images.weserv.nl/?url=${item.pic_url}`}
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
      />
      <CardContent
        onClick={() => {
          history.push(`/search/${item.num_iid}?url=${item.detail_url}`);
        }}
      >
        <Typography variant='body2' color='text.secondary'>
          {item.title}
        </Typography>
        {item.original_price === item.price ? (
          <Typography gutterBottom variant='body2' component='div' className='text-red-500'>
            Giá: {formatMoneyToCN(item.price)}
          </Typography>
        ) : (
          <>
            <Typography gutterBottom variant='body2' component='div' className='mt-2 line-through'>
              Giá cũ: {formatMoneyToCN(item.original_price)}
            </Typography>
            <Typography gutterBottom variant='body2' component='div' className='text-red-500'>
              Giá mới: {formatMoneyToCN(item.price)}
            </Typography>
          </>
        )}

        <Typography gutterBottom variant='caption' component='div'>
          Số lượng: {item.quantity}
        </Typography>
      </CardContent>
      <CardActions className='flex justify-center'>
        <a href={`${item.detail_url}`} target='_blank' rel='noopener noreferrer'>
          <Button variant='text' size='small'>
            Mở trên Taobao
          </Button>
        </a>
      </CardActions>
    </Card>
  );
};
