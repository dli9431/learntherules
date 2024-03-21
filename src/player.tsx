import { Button, Stack, Box, Paper, Typography, Grid } from '@mui/material';
import { Fighter } from './interfaces/shared.ts';
import { Theme } from '@mui/material/styles';
import Score from './score.tsx';
import { ScoreDial } from './score.tsx';

export const Player = ({ fighter, theme }: { fighter: Fighter; theme: Theme }) => {
    return (
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
                <Stack spacing={0} alignItems="center" /*direction={{ sm: 'column', lg: 'row' }}*/>
                    <Typography fontSize={{ md: 30, xs: 15 }}>
                        {fighter.name}
                    </Typography>
                    <Grid
                        direction={{ sm: 'row' }}
                        container
                        sx={{ border: '1px solid black' }}
                    >
                        <Grid item>
                            <ScoreDial action="add" position={fighter.position} />
                        </Grid>
                        <Grid item>
                            <ScoreDial action="remove" position={fighter.position} />
                        </Grid>
                    </Grid>
                    {/* <Grid
                        direction="row"
                        container
                        sx={{ border: '1px solid black' }}
                    >
                        <Grid item>
                            <Score variant="outlined" color="error" value="-p" />
                        </Grid>
                        <Grid item>
                            <Score variant="outlined" color="success" value="-2" />
                        </Grid>
                        <Grid item>
                            <Score variant="outlined" color="success" value="-3" />
                        </Grid>
                        <Grid item>
                            <Score variant="outlined" color="success" value="-4" />
                        </Grid>
                        <Grid item>
                            <Score variant="outlined" color="info" value="-a" />
                        </Grid>
                    </Grid> */}
                </Stack>
            </Paper>
        </Box>
    )
}

export default Player;