import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import { CssBaseline, Container } from '@mui/material';
import { useParams } from 'react-router-dom';
import { Step1 } from './step1';
import { Step2 } from './step2';
import { Step3 } from './step3';

const steps = ['Your Cart', 'Select Delivery Address', 'Create an order'];

const SlugMapping = (slug: string) => {
  switch (slug) {
    case 'pickup':
      return <Step2 />;
    case 'order':
      return <Step3 />;
    default:
      return <Step1 />;
  }
};

const ActiveTabMapping = (slug: string) => {
  switch (slug) {
    case 'pickup':
      return 1;
    case 'order':
      return 2;
    default:
      return 0;
  }
};

export const Cart = () => {
  const param: { slug: string } = useParams();
  return (
    <React.Fragment>
      <CssBaseline />
      <Container>
        <Box sx={{ width: '100%' }} className='mt-10'>
          <Stepper activeStep={ActiveTabMapping(param.slug)} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </Container>
      <Box>{SlugMapping(param.slug)}</Box>
    </React.Fragment>
  );
};