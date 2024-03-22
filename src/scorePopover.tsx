import * as React from 'react';
import Stack from '@mui/material/Stack';
import Popover from '@mui/material/Popover';
import Button from '@mui/material/Button';
import { IconButton } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

export default function ScorePopover({ action }: { action: 'add' | 'remove' }) {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
                    <Button color={action === 'remove' ? 'error' : 'success'} variant="contained">{action === 'add' ? '+' : '-'}2 points</Button>
                    <Button color={action === 'remove' ? 'error' : 'success'} variant="contained">{action === 'add' ? '+' : '-'}3 points</Button>
                    <Button color={action === 'remove' ? 'error' : 'success'} variant="contained">{action === 'add' ? '+' : '-'}4 points</Button>
                    <Button color={action === 'remove' ? 'error' : 'success'} variant="contained">{action === 'add' ? '-' : '+'}Penalty</Button>
                </Stack>
            </Popover>
        </div>
    );
}