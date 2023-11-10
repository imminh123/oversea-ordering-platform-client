import { yupResolver } from '@hookform/resolvers/yup';
import { Button, Container, CssBaseline, Box, Typography, Card, CardContent, CardActions } from '@mui/material';
import { FormAddressInput } from 'app/components/FormAddressInput';
import { FormInputDate } from 'app/components/libs/react-hooks-form/FormInputDate';
import { FormInputDropdown } from 'app/components/libs/react-hooks-form/FormInputDropdown';
import { FormInputText } from 'app/components/libs/react-hooks-form/FormInputText';
import { updateProfileValidator } from 'app/utils/validators';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

interface IFormInput {
  fullname: string;
  gender?: string;
  birthday?: string;
  phone: string;
}

const defaultValues = {
  fullname: '',
  phone: '',
  gender: ''
};

const genderOptions = [
  {
    label: 'Male',
    value: 'male',
  },
  {
    label: 'Female',
    value: 'female',
  },
  {
    label: 'Other',
    value: 'other',
  },
];

export const PersonalInfo = () => {
  const [location, setLocation] = useState<{ province?: string; district?: string; ward?: string }>({});
  const { handleSubmit, reset, control, setValue } = useForm<IFormInput>({
    defaultValues: defaultValues,
    resolver: yupResolver(updateProfileValidator),
  });

  const onSubmit = (data: IFormInput) => {
    console.log("🚀🚀🚀 ~ file: index.tsx:46 ~ onSubmit ~ data:", data);
    const { province, district, ward } = location;
  };

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
                  <FormInputDate name='birthday' control={control} label='Birthday' />
                </Box>
              </Box>
              <Box display={'flex'} justifyContent={'flex-end'} gap={'10px'}>
                <Box flex={1}>
                  <FormInputText name='phone' control={control} label='Phone' />
                </Box>
                <Box flex={1}>
                  <FormInputDropdown name='gender' control={control} label='Gender' options={genderOptions} />
                </Box>
              </Box>

              <FormAddressInput
                onChangeAdress={(data: any) => {
                  setLocation(data);
                }}
              />
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
