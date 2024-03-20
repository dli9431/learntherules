import { Box, Card, CardContent, Typography } from '@mui/material';

export function Timer({ currTime }: { currTime: number }) {
  const seconds = currTime;
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return (
    <Box
      className='timer'
      sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
      }}
    >
      <Card sx={{
        display: 'flex',
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
        <Typography component='div' fontSize={{ md: 120, sm: 60, xs: 30 }}>
          {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
        </Typography>
      </Card>
    </Box>
  );
}

export default Timer;