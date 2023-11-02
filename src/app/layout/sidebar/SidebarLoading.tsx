import { List, ListItem, ListItemText, Skeleton } from '@mui/material';

const SidebarLoading: React.FC = () => {
  return (
    <List>
      <ListItem>
        <ListItemText>
          <Skeleton variant='rectangular' width='100%' height={24} animation='wave' />
        </ListItemText>
      </ListItem>
      <ListItem>
        <ListItemText>
          <Skeleton variant='rectangular' width='100%' height={24} animation='wave' />
        </ListItemText>
      </ListItem>
    </List>
  );
};

export default SidebarLoading;
