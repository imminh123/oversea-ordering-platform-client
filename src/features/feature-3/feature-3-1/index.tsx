import { Box, Button } from '@mui/material';
import useConfirmAlert from 'app/hooks/useConfirmAlert';

export const Feature3_1 = () => {
  const { confirm } = useConfirmAlert();

  const deleteUser = () => {
    confirm({
      onConfirm: () => {
        return new Promise((resolve) =>
          setTimeout(() => {
            console.log('delete user');
            resolve({});
          }, 2000),
        );
      },
    });
  };

  return (
    <Box
      sx={{
        p: 2,
      }}
    >
      <Button variant='contained' onClick={deleteUser}>
        Confirm delete user
      </Button>
    </Box>
  );
};
