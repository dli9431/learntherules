import { Button, Stack, Box, Paper, Typography, Grid } from '@mui/material';
import { convertSecondsToTime, Fighter, ScoreHistory } from './interfaces/shared.ts';
import { Theme } from '@mui/material/styles';

export const Match = ({ theme, history, fighter1, fighter2 }:
    { theme: Theme; history: ScoreHistory[] | null; fighter1: Fighter, fighter2: Fighter }) => {

    const formatResult = (score: ScoreHistory) => {
        let res = '';
        if (score.subType) {
            if (score.fighter === 1) {
                res = fighter1.name + ` wins by ` + `(${score.subType})` + ` at ` + `(${convertSecondsToTime(score.time)})`;
            } else {
                res = fighter2.name + ` wins by ` + `(${score.subType}) at ` + `(${convertSecondsToTime(score.time)})`;
            }
        } else {
            if (score.fighter === 1) {
                res = fighter1.name + ` scores ` + score.scoreAmount + ` ` + score.scoreType + ` at ` + `(${convertSecondsToTime(score.time)})`;
            }
            else {
                res = fighter2.name + ` scores ` + score.scoreAmount + ` ` + score.scoreType + ` at ` + `(${convertSecondsToTime(score.time)})`;
            }
        }
        return res;
    }
    return (
        <Paper
            sx={{
                bgcolor: theme.palette.mode === 'dark' ? '#1A2027' : '#f9f2eb',
                padding: 1,
                overflow: 'auto',
            }}
        >
            <Grid container spacing={0} className="matchHistory"
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Grid item>
                    <Typography variant="h3">
                        Match History <Button variant="contained">Full</Button>
                    </Typography>
                </Grid>
                {(history && history.length > 0) && history.slice(-4).map((score, index) => {
                    return (
                        <Grid item xs={12} key={index}>
                            {formatResult(score)}
                        </Grid>
                    )
                })}
            </Grid>
        </Paper>
    )
}

export default Match;