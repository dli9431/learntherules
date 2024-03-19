import { Box, Paper, Typography } from '@mui/material';
import { Fighter } from './interfaces/shared.ts';
import { Theme } from '@mui/material/styles';

export const Player = ({ fighter, theme }: {fighter: Fighter; theme: Theme}) => {
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
                <Typography variant="h3">
                    {fighter.name}
                </Typography>
            </Paper>
        </Box>
    )
}

export default Player;