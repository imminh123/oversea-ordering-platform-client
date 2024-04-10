import { Box } from '@mui/material';
import React, { useState, useEffect } from 'react';

export const CountdownTimer = () => {
  const [minutes, setMinutes] = useState(60);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(intervalId);
          // Countdown finished
        } else {
          setMinutes(minutes - 1);
          setSeconds(59);
        }
      } else {
        setSeconds(seconds - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId);
  }, [minutes, seconds]);

  return (
    <>
      <Box className='flex justify-between items-center gap-1'>
        <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: 1 }}>{minutes < 10 ? `0${minutes}` : minutes}</Box>
        <Box>:</Box>
        <Box sx={{ backgroundColor: 'white', p: 1, borderRadius: 1 }}>{seconds < 10 ? `0${seconds}` : seconds}</Box>
      </Box>
    </>
  );
};
