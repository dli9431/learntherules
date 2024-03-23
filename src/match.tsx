import { Paper, Typography, Grid } from '@mui/material';
import { formatResult, Fighter, ScoreHistory } from './interfaces/shared.ts';
import { Theme } from '@mui/material/styles';
import ScoreHistoryModal from './matchHistoryModal.tsx';

export const Match = ({ theme, history, fighter1, fighter2 }:
    { theme: Theme; history: ScoreHistory[] | null; fighter1: Fighter, fighter2: Fighter }) => {

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
                        Score History <ScoreHistoryModal history={history} fighter1={fighter1} fighter2={fighter2} />
                    </Typography>
                </Grid>
                {(history && history.length > 0) && history.filter(score => score.scoreAmount > 0).slice(-4).map((score, index) => {
                    return (
                        <Grid item xs={12} key={index}>
                            {formatResult(score, fighter1, fighter2)}
                        </Grid>
                    )
                })}
            </Grid>
        </Paper>
    )
}

export default Match;