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
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <CardContent sx={{ flex: '1 0 auto', width: '100%', padding: 0 }}>
            <Typography component='div' variant='h1'>
              <div>
                {minutes}:{remainingSeconds < 10 ? `0${remainingSeconds}` : remainingSeconds}
              </div>
            </Typography>
          </CardContent>
        </Box>
      </Card>
    </Box>
  );
}

export default Timer;