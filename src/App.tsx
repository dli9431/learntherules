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
import { Typography, Stack } from '@mui/material';

// youtube
import YouTube from 'react-youtube';


// const darkTheme = createTheme({
//   palette: {
//     mode: 'dark',
//   },
// });
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
  const [opts, setOpts] = useState({ height: '360', width: '720' });
  const [buffer, setBuffer] = useState({ width: 0, height: 0 })
  useEffect(() => {
    // update player size
    function updateSize() {
      setOpts({ height: Math.floor((.6 * window.innerHeight) - buffer.height).toString(), width: ((window.innerWidth) - buffer.width).toString() });
    }
    updateSize();
    window.addEventListener('resize', updateSize);
    return () => window.removeEventListener('resize', updateSize);
  }, []);
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
              bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
              padding: 1,
              width: '100%',
            }}
          >
            <Stack direction="row" justifyContent="center" alignItems="center">
              <Typography>Learn the rules</Typography>
              
              <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
                {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
              </IconButton>
            </Stack>

          </Paper>
        </Grid>
        <Grid
          xs={12}
          item
          className="player"
          sx={{
            height: '60vh',
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
              videoId="6ZfuNTqbHE8"
              opts={opts}
            />
          </Box>
        </Grid>
      </Grid>
    </>
    // <Box
    //   sx={{
    //     display: 'flex',
    //     width: '100vw',
    //     height: '100vh',
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     bgcolor: 'background.default',
    //     color: 'text.primary',
    //     borderRadius: 1,
    //   }}
    // >

    // </Box>
  );
}

// export default App
