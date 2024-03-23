import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Fighter, ScoreHistory, formatResult } from './interfaces/shared';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 600,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    overflow: 'auto'
};

export default function ScoreHistoryModal({ history, fighter1, fighter2 }: { history: ScoreHistory[] | null; fighter1: Fighter, fighter2: Fighter }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <>
            <Button onClick={handleOpen} variant="contained">Full</Button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-match-history-title"
                aria-describedby="modal-match-history-description"
            >
                <Box sx={style}>
                    <Typography id="modal-match-history-title" variant="h6" component="h2">
                    </Typography>
                    <Typography id="modal-match-history-description" sx={{ mt: 2 }}>
                        {(history && history.length > 0) && history.map((score) => {
                            return (
                                <Box>
                                    {formatResult(score, fighter1, fighter2)}
                                </Box>
                            )
                        })}
                    </Typography>
                </Box>
            </Modal>
        </>
    );
}