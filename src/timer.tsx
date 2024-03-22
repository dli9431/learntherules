import { Typography } from '@mui/material';

export function Timer({ currTime }: { currTime: number }) {
  const seconds = currTime;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <Typography component='div' fontSize={{ md: 120, sm: 40, xs: 30 }}>
      {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
    </Typography>
  );
}

export default Timer;