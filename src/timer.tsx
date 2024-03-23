import { Typography } from '@mui/material';
import { convertSecondsToTime } from './interfaces/shared';

export function Timer({ currTime }: { currTime: number }) {
  const time = convertSecondsToTime(currTime);

  return (
    <Typography component='div' fontSize={{ md: 120, sm: 40, xs: 30 }}>
      {time}
    </Typography>
  );
}

export default Timer;