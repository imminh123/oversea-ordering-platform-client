import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, CssBaseline, Box, Typography, Card, CardContent, CardActions } from '@mui/material';
import { FormInputDate } from 'app/components/libs/react-hooks-form/FormInputDate';
import { FormInputText } from 'app/components/libs/react-hooks-form/FormInputText';
import { updateProfileValidator } from 'app/utils/validators';
import React from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
  fullname: string;
}

const defaultValues = {
  fullname: '',
};
export const PersonalInfo = () => {
  const { handleSubmit, reset, control, setValue } = useForm<IFormInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(updateProfileValidator),
  });

  const onSubmit = (data: IFormInput) => console.log(data);

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth='md'>
        <Card sx={{ minWidth: 275 }} className=' mt-10'>
          <CardContent>
            <Box display={'flex'} flexDirection={'column'} gap={'10px'}>
              <Typography variant='h4'>Update Personal Information</Typography>
              <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                <Box flex={1}>
                  <FormInputText name='fullname' control={control} label='Full Name' />
                </Box>
                <Box flex={1}>
                  <FormInputDate name='dateValue' control={control} label='Birthday' />
                </Box>
              </Box>
              {/* <FormInputDropdown name='dropdownValue' control={control} label='Dropdown Input' /> */}
            </Box>
          </CardContent>
          <CardActions>
            <Box width={'100%'} display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
              <Button onClick={handleSubmit(onSubmit)} variant={'contained'}>
                Save
              </Button>
              <Button onClick={() => reset()} variant={'outlined'}>
                Cancel
              </Button>
            </Box>
          </CardActions>
        </Card>
      </Container>
    </React.Fragment>
  );
};
