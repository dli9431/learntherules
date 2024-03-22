import { Stack, Box, Paper, Typography, Grid } from '@mui/material';
import { Fighter } from './interfaces/shared.ts';
import { Theme } from '@mui/material/styles';
import ScorePopover from './scorePopover.tsx';

export const Player = ({ fighter, theme, setFighter }: { fighter: Fighter; theme: Theme; setFighter: any }) => {
    return (

        <Paper
            sx={{
                display: 'flex',
                justifyContent: 'center',
                bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f2eb',
                padding: 1,
            }}
        >
            <Stack>
                <Grid container spacing={0} className="scores">
                    <Grid item xs={6} sx={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
                        <Box sx={{
                            width: '100%',
                            height: '100%',
                            maxWidth: { sm: '100px', lg: '150px' },
                            maxHeight: { sm: '100px', lg: '150px' },
                            bgcolor: 'green', color: 'text.primary', textAlign: 'center',
                            display: 'flex', justifyContent: 'center', alignItems: 'center'
                        }}>
                            <Typography variant="h3">
                                {fighter.points}
                            </Typography>
                        </Box>
                    </Grid>
                    <Grid item xs={6}>
                        <Grid item xs={12} sx={{ height: '50%' }}>
                            <Box sx={{
                                maxWidth: { md: '100px', xs: '50px' },
                                bgcolor: 'yellow', color: 'text.primary', display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Typography variant="h4">
                                    {fighter.advantages}
                                </Typography>
                            </Box>
                        </Grid>
                        <Grid item xs={12} sx={{ height: '50%' }}>
                            <Box sx={{
                                maxWidth: { md: '100px', xs: '50px' },
                                bgcolor: 'red', color: 'text.primary', display: 'flex', justifyContent: 'center', alignItems: 'center'
                            }}>
                                <Typography variant="h4">
                                    {fighter.penalties}
                                </Typography>
                            </Box>
                        </Grid>
                    </Grid>
                </Grid>
                <Typography fontSize={{ md: 30, xs: 15 }} sx={{ textAlign: 'center' }}>
                    {fighter.name}
                </Typography>
                <Grid
                    direction={{ sm: 'row' }}
                    container
                    sx={{
                        justifyContent: 'center',
                    }}
                >
                    <Grid item>
                        <ScorePopover action="add" setFighter={setFighter} />
                    </Grid>
                    <Grid item>
                        <ScorePopover action="remove" setFighter={setFighter} />
                    </Grid>
                </Grid>
            </Stack>
        </Paper>
    )
}

export default Player;