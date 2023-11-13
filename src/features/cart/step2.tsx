import { Button } from '@mui/material';
import { useHistory } from 'react-router-dom';

export const Step2 = () => {
  const history = useHistory();
  const onSubmit = () => {
    history.goBack();
  };
  return (
    <Button variant='contained' onClick={onSubmit}>
      Back
    </Button>
  );
};
