import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import { CardActionArea, Box, Card, CardContent, TextField } from '@mui/material';
import { Fighter } from './interfaces/shared';

export default function RefDecPopover({ fighter1, fighter2, setWinner, handleClose }:
    { fighter1: Fighter; fighter2: Fighter; setWinner: any; handleClose: any; }) {
    const [dec, setDec] = useState<string>('')

    const handleDecChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setDec(event.target.value);
    }

    const decideWinner = (winner: number) => {
        setWinner(winner, dec);
        setDec(''); // reset decision
        handleClose();
    }

    return (
        <Box>
            <Stack direction="column">
                <TextField value={dec} onChange={handleDecChange} placeholder="Referee decision reason (optional)" variant="filled" />
                <Stack direction="row" spacing={1}>
                    <Card>
                        <CardActionArea onClick={() => decideWinner(1)}>
                            <CardContent>
                                {fighter1.name}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                    <Card>
                        <CardActionArea onClick={() => decideWinner(2)}>
                            <CardContent>
                                {fighter2.name}
                            </CardContent>
                        </CardActionArea>
                    </Card>
                </Stack>
            </Stack>
        </Box>
    );
}