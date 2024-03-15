import { useMemo, createContext, useState, useContext, useEffect } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
import client from './../env/secrets.ts';
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
import { TextField, InputAdornment, Typography, Stack } from '@mui/material';

// youtube
import YouTube from 'react-youtube';

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
  const [input, setInput] = useState('');
  const [youtubeId, setYoutubeId] = useState('');
  const [opts, setOpts] = useState({ height: '360', width: '720' });
  const [buffer, setBuffer] = useState({ width: 0, height: 0 })

  useEffect(() => {
    // update player size
    function updateSize() {
      setOpts({ height: Math.floor((.5 * window.innerHeight) - buffer.height).toString(), width: ((window.innerWidth) - buffer.width).toString() });
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);

  // extract youtube id from link
  function youtubeLink(e: React.ChangeEvent<HTMLInputElement>) {
    let url = e.target.value;
    let id = url.split('v=')[1];
    if (id) {
      setYoutubeId(id);
    }
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
          className="title"
          p={1}
        >
          <Box>
            <Typography>Test</Typography>
          </Box>
        </Grid> */}
        <Grid
          xs={12}
          item
          className="controls"
          p={1}
        >
          <Paper
            sx={{
              bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f2eb',
              padding: 1,
              width: '100%',
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Typography>Learn the rules</Typography>
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
              <TextField
                value={input}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { youtubeLink(e); setInput(e.target.value) }}
                id="input-with-icon-textfield"
                placeholder='Enter youtube link'
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <YouTubeIcon />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton sx={{ ml: 1 }} color="inherit" onClick={() => { setYoutubeId(''); setInput(''); }}>
                        <ClearIcon />
                      </IconButton>
                    </InputAdornment>
                  )
                }}
                variant="standard"
              />
            </Stack>
          </Paper>
        </Grid>
        {
          youtubeId.length > 0 &&
          <Grid
            xs={12}
            item
            className="player"
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
              />
            </Box>
          </Grid>
        }
        {youtubeId.length > 0 &&
          <>
            <Grid
              xs={12}
              item
              className="scoreboard"
              sx={{
                height: '40vh',
              }}
            >
              <Stack spacing={1} direction="row" justifyContent="center" alignItems="center" height="100%">
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
                      bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f2eb',
                      padding: 1,
                      width: '100%',
                      height: '100%'
                    }}
                  >
                    <Typography>
                      John Doe
                    </Typography>
                  </Paper>
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
                      bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f2eb',
                      padding: 1,
                      width: '100%',
                      height: '100%'
                    }}
                  >
                  </Paper>
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
                      bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f2eb',
                      padding: 1,
                      width: '100%',
                      height: '100%'
                    }}
                  >
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
