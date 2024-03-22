import { useMemo, createContext, useState, useContext, useEffect } from 'react'

// mui
import { useTheme, ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
// import Grid from '@mui/material/Unstable_Grid2';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import IconButton from '@mui/material/IconButton';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import YouTubeIcon from '@mui/icons-material/YouTube';
import ClearIcon from '@mui/icons-material/Clear';
import { TextField, InputAdornment, Typography, Stack } from '@mui/material';

// youtube
import YouTube from 'react-youtube';

// app imports
import client from './../env/secrets.ts';
import { parseTitle } from './parse.tsx';
import Timer from './timer.tsx';
import { Fighter, PlayerOptions, YouTubePlayer } from './interfaces/shared.ts';
import Player from './player.tsx';

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

function App() {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  const [input, setInput] = useState<string>('');
  const [youtubeId, setYoutubeId] = useState<string>('UZ3m4ay8Jrk'); // for testing
  const [opts, setOpts] = useState<PlayerOptions>({
    height: '390', width: '640', // default youtube api size
    playerVars: {
      mute: 1,
      autoplay: 0,
    }
  });
  const [initTime, setInitTime] = useState<number>(0);
  const [currTime, setCurrTime] = useState<number>(0);
  const [playState, setPlayState] = useState<number>(0);
  const [player, setPlayer] = useState<YouTubePlayer | null>(null);
  const [fighter1, setFighter1] = useState<Fighter>({ name: 'Player 1', position: 1, points: 0, advantages: 0, penalties: 0 });
  const [fighter2, setFighter2] = useState<Fighter>({ name: 'Player 2', position: 2, points: 0, advantages: 0, penalties: 0 });

  useEffect(() => {
    // update player size
    function updateSize() {
      let videoSize = { width: 1, height: 1 };
      const aspectRatio = 39 / 64;
      const breakpoints = theme.breakpoints.values;
      if (window.innerWidth < breakpoints.sm) {
        // full screen
        videoSize.width = window.innerWidth;
        videoSize.height = Math.floor((videoSize.width * aspectRatio));
      }
      if (window.innerWidth >= breakpoints.sm && window.innerWidth < breakpoints.lg) {
        // half width + aspect ratio
        videoSize.width = Math.floor(.5 * window.innerWidth);
        videoSize.height = Math.floor((videoSize.width * aspectRatio));
      }
      if (window.innerWidth >= breakpoints.lg) {
        // full screen+padding + half height
        videoSize.width = window.innerWidth;
        videoSize.height = Math.floor((.5 * window.innerHeight) - 56);
      }
      setOpts(prev => ({ ...prev, height: videoSize.height.toString(), width: videoSize.width.toString() }));
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    let interval: number | null = null;
    if (player && youtubeId && playState === 1) {
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

  function playerControl(action: string) {
    switch (action) {
      case 'play':
        player?.playVideo();
        break;
      case 'pause':
        player?.pauseVideo();
        break;
      case 'stop':
        player?.stopVideo();
        break;
      default:
        break;
    }
  }

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
      setFighter1(prev => ({ ...prev, name: names.firstPerson }));
      setFighter2(prev => ({ ...prev, name: names.secondPerson }));
    }
  };
  const onStateChange = (event: { target: any; }) => {
    const player = event.target;
    setPlayState(player.getPlayerState());
  }
  return (
    <>
      <CssBaseline />
      <Paper
        sx={{
          bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f2eb',
          padding: { xs: 0, sm: 1 },
          width: '100%',
        }}
      >
        <Stack direction='row' justifyContent='center' alignItems='center'>
          <Typography display={{ xs: 'none', sm: 'block' }}>Learn the rules</Typography>
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
      <Grid
        className="playerScoreContainer"
        direction={{ xs: 'column', sm: 'row', md: 'row', lg: 'column' }}
        container
        sx={{
          bgcolor: 'background.default',
          color: 'text.primary',
        }}
      >
        {
          youtubeId.length > 0 &&
          <Grid
            item
            xs={12} sm={6} md={6} lg={12}
            className='player'
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <YouTube
              // key={opts.width + opts.height} // forces rerender when window size changes
              videoId={youtubeId}
              opts={opts}
              onReady={onReady}
              onStateChange={onStateChange}
            />
          </Grid>
        }
        {youtubeId.length > 0 &&
          <Grid
            item
            className='scoreboard'
            xs={12} sm={6} md={6} lg={12}
          >
            <Grid container>
              <Grid item xs={12} sm={12} md={12} lg={4} order={{ sm: 1, lg: 2 }} sx={{ textAlign: 'center' }}>
                <Timer currTime={currTime} />
              </Grid>
              <Grid item xs={6} sm={6} lg={4} order={{ sm: 2, lg: 1 }}>
                <Player fighter={fighter1} theme={theme} setFighter={setFighter1} playerControl={playerControl} />
              </Grid>
              <Grid item xs={6} sm={6} lg={4} order={{ sm: 3, lg: 3 }}>
                <Player fighter={fighter2} theme={theme} setFighter={setFighter2} playerControl={playerControl} />
              </Grid>
            </Grid>
          </Grid>
        }
      </Grid>
    </>
  );
}

// export default App
