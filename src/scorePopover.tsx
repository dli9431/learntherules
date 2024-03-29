import React, { useState } from 'react';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { IconButton, TextField } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ScorePopover({ action, setFighter, playerControl, setScoreHistory }:
    { action: 'add' | 'remove'; setFighter: any; playerControl: any, setScoreHistory: any; }) {
    const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);
    const [sub, setSub] = useState<string>('')
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        playerControl('pause');
        setAnchorEl(event.currentTarget);
    };

    const handleSubChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSub(event.target.value);
    }

    const handleClose = () => {
        if (sub && sub.length > 0) {
            playerControl('stop');
        }
        else {
            playerControl('play');
        }
        setAnchorEl(null);
    };

    const addPoints = (points: number, type: string) => {
        setFighter((prev: any) => {
            switch (type) {
                case 'sub':
                    setScoreHistory((prevHist: any) => [...prevHist, { subType: sub, scoreAmount: 0, scoreType: 'sub', time: playerControl('duration'), fighter: prev.position }]);
                    playerControl('stop');
                    return { ...prev, sub: true, subType: sub };
                    break;
                case 'pts':
                    setScoreHistory((prevHist: any) => [...prevHist, { scoreAmount: points, scoreType: 'pts', time: playerControl('duration'), fighter: prev.position }]);
                    return { ...prev, points: prev.points + points };
                    break;
                case 'adv':
                    setScoreHistory((prevHist: any) => [...prevHist, { scoreAmount: points, scoreType: 'adv', time: playerControl('duration'), fighter: prev.position }]);
                    return { ...prev, advantages: prev.advantages + points };
                    break;
                case 'pen':
                    setScoreHistory((prevHist: any) => [...prevHist, { scoreAmount: points, scoreType: 'pen', time: playerControl('duration'), fighter: prev.position }]);
                    return { ...prev, penalties: prev.penalties + points };
                    break;
                default:
                    return prev;
                    break;
            }
        });
        handleClose();
    }

    const open = Boolean(anchorEl);
    const id = open ? action : undefined;

    return (
        <div>
            <IconButton aria-label={id} onClick={handleClick}>
                {action === 'add' ? <AddIcon color="success" fontSize="large" /> : <RemoveIcon color="error" fontSize="large" />}
            </IconButton>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'left',
                }}
            >
                <Stack direction="column" spacing={1}>
                    {action === 'add' &&
                        <Stack direction="row">
                            <TextField value={sub} onChange={handleSubChange} placeholder="Submission name" variant="filled" required />
                            <Button
                                onClick={() => {
                                    if (sub) {
                                        addPoints(0, 'sub')
                                    }
                                }}
                                color='success' variant="contained">
                                Sub
                            </Button>
                        </Stack>
                    }
                    <Button
                        onClick={() => action === 'add' ? addPoints(2, 'pts') : addPoints(-2, 'pts')}
                        color={action === 'add' ? 'success' : 'error'} variant="contained">{action === 'add' ? '+' : '-'}2 points</Button>
                    <Button
                        onClick={() => action === 'add' ? addPoints(3, 'pts') : addPoints(-3, 'pts')}
                        color={action === 'add' ? 'success' : 'error'} variant="contained">{action === 'add' ? '+' : '-'}3 points</Button>
                    <Button
                        onClick={() => action === 'add' ? addPoints(4, 'pts') : addPoints(-4, 'pts')}
                        color={action === 'add' ? 'success' : 'error'} variant="contained">{action === 'add' ? '+' : '-'}4 points</Button>
                    <Button
                        onClick={() => action === 'add' ? addPoints(1, 'adv') : addPoints(-1, 'adv')}
                        color={action === 'add' ? 'success' : 'error'} variant="contained">{action === 'add' ? '+' : '-'}Advantage</Button>
                    <Button
                        onClick={() => action === 'remove' ? addPoints(1, 'pen') : addPoints(-1, 'pen')}
                        color={action === 'add' ? 'success' : 'error'} variant="contained">{action === 'add' ? '-' : '+'}Penalty</Button>
                </Stack>
            </Popover>
        </div>
    );
}