import { useMemo, createContext, useState, useContext, useEffect } from 'react'

// mui
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Box from '@mui/material/Box';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ClearIcon from '@mui/icons-material/Clear';
import { Card, CardContent, CardMedia, TextField, InputAdornment, Typography, Stack } from '@mui/material';

// youtube
import YouTube from 'react-youtube';

// app imports
import { parseTitle } from './parse.tsx';
import client from './../env/secrets.ts';
import Timer from './timer.tsx';

const ColorModeContext = createContext({ toggleColorMode: () => { } });

export default function ToggleColorMode() {
  const [mode, setMode] = useState<'light' | 'dark'>('light');
  const colorMode = useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
        },
      }),
    [mode],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

interface PlayerOptions {
  height: string;
  width: string;
  playerVars: {
    mute: number;
    autoplay: number;
  };
}

interface Fighter {
  name: string;
}

function App() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [input, setInput] = useState<string>('');
  const [youtubeId, setYoutubeId] = useState<string>('');
  const [opts, setOpts] = useState<PlayerOptions>({
    height: '360', width: '720',
    playerVars: {
      mute: 1,
      autoplay: 0,
    }
  });
  const [initTime, setInitTime] = useState<number>(0);
  const [currTime, setCurrTime] = useState<number>(0);
  const [playState, setPlayState] = useState<number>(0);
  const [player, setPlayer] = useState<any>(null);
  const [fighter1, setFighter1] = useState<Fighter>({ name: '' });
  const [fighter2, setFighter2] = useState<Fighter>({ name: '' });

  useEffect(() => {
    // update player size
    function updateSize() {
      setOpts(prev => ({ ...prev, height: Math.floor(.5 * window.innerHeight).toString(), width: (window.innerWidth).toString() }));
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    let interval: number | null = null;
    if (youtubeId && playState === 1) {
      interval = setInterval(() => {
        // Assuming you have a way to access the YouTube player instance
        // For example, through a ref or a global variable
        const currentTime = initTime - player.getCurrentTime();
        setCurrTime(Math.floor(currentTime));
      }, 500); // Check every half second
    }

    return () => {
      if (interval) {
        clearInterval(interval);
        interval = null;
      }
    };
  }, [youtubeId, playState]);

  // extract youtube id from link
  function youtubeLink(e: React.ChangeEvent<HTMLInputElement>) {
    let url = e.target.value;
    let id = url.split('v=')[1];
    if (id) {
      setYoutubeId(id);
    }
  }
  const onReady = (event: { target: any; }) => {
    const player = event.target;
    setInitTime(player.getDuration());
    setPlayer(event.target);
    // parse video title
    const names = parseTitle(event.target.videoTitle);
    if (names) {
      setFighter1({ name: names.firstPerson });
      setFighter2({ name: names.secondPerson });
    }
  };
  const onStateChange = (event: { target: any; }) => {
    const player = event.target;
    setPlayState(player.getPlayerState());
  }
  return (
    <>
      <CssBaseline />
      <Grid
        container
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        {/* <Grid
          xs={12}
          item
          className='title'
          p={1}
        >
          <Box>
            <Typography>Test</Typography>
          </Box>
        </Grid> */}
        <Grid
          xs={12}
          item
          className='controls'
          p={1}
        >
          <Paper
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f2eb',
              padding: 1,
              width: '100%',
            }}
          >
            <Stack direction='row' justifyContent='center' alignItems='center'>
              <Typography>Learn the rules</Typography>
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color='inherit'>
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <TextField
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { youtubeLink(e); setInput(e.target.value) }}
                id='input-with-icon-textfield'
                placeholder='Enter youtube link'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position='start'>
                      <YouTubeIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton sx={{ ml: 1 }} color='inherit' onClick={() => { setYoutubeId(''); setInput(''); }}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                variant='standard'
              />
            </Stack>
          </Paper>
        </Grid>
        {
          youtubeId.length > 0 &&
          <Grid
            xs={12}
            item
            className='player'
            sx={{
              height: '50vh',
            }}
          >
            <Box
              sx={{
                display: 'flex',
                width: '100%',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              <YouTube
                videoId={youtubeId}
                opts={opts}
                onReady={onReady}
                onStateChange={onStateChange}
              />
            </Box>
          </Grid>
        }
        {youtubeId.length > 0 &&
          <>
            <Grid
              xs={12}
              item
              className='scoreboard'
              sx={{
                height: '40vh',
              }}
            >
              <Stack spacing={1} direction={{ xs: 'column', sm: 'row' }} justifyContent='center' alignItems='center' height='100%'>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Paper
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f2eb',
                      padding: 1,
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <Typography variant="h3">
                      {fighter1.name}
                    </Typography>
                  </Paper>
                </Box>
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
                          <Timer currTime={currTime} />
                        </Typography>
                      </CardContent>
                      {/* <Box sx={{ display: 'flex', alignItems: 'center', pl: 1, pb: 1 }}>
                        test
                      </Box> */}
                    </Box>
                    {/* <CardMedia
                      component='img'
                      sx={{ width: 151 }}
                      image='/static/images/cards/live-from-space.jpg'
                      alt='Live from space album cover'
                    /> */}
                  </Card>
                  {/* <Card
                    elevation={3}
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f2eb',
                      padding: 1,
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <Typography variant='h1'>
                      5:00
                    </Typography>
                  </Paper> */}
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <Paper
                    sx={{
                      display: 'flex',
                      justifyContent: 'center',
                      bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f2eb',
                      padding: 1,
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <Typography variant="h3">
                      {fighter2.name}
                    </Typography>
                  </Paper>
                </Box>
              </Stack>
            </Grid>
          </>
        }
      </Grid>
    </>
  );
}

// export default App
