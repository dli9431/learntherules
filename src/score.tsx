import { useState } from 'react';
import { SpeedDial, SpeedDialAction, Button, Stack, Box, Paper, Typography, Grid } from '@mui/material';
import { SpeedDialIcon } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveIcon from '@mui/icons-material/Remove';
import CloseIcon from '@mui/icons-material/Close';

interface ScoreProps {
    value: string;
    variant: 'text' | 'outlined' | 'contained';
    color: 'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error';
}

export default function Score({ value, variant, color }: ScoreProps) {
    return (
        <Button sx={{ padding: 0 }} variant={variant} size="small" color={color}>
            {value}
        </Button>
    )
}

export function ScoreDial({ action, position }: { action: 'add' | 'remove', position: number }) {
    const [open, setOpen] = useState(false);

    const handleClick = () => {
        setOpen((prevOpen) => !prevOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <SpeedDial
            FabProps={{
                color: action === 'add' ? 'success' : 'error',
                variant: 'extended'
            }}
            ariaLabel={action === 'add' ? 'Add' : 'Remove'}
            // sx={{ display: 'flex', flexDirection: 'column' }}
            sx={{
                position: { xs: 'absolute', sm: 'static' }, // Use absolute positioning on xs screens, switch to static on sm screens and up
                bottom: 16,
                right: { xs: 16, sm: 'auto' }, // Apply right: 16 on xs screens, switch to auto on sm screens and up
                left: { xs: 'auto', sm: 16 }, // Apply left: auto on xs screens, switch to 16 on sm screens and up
                display: { xs: 'block', sm: 'flex' }, // Use block display on xs screens, switch to flex on sm screens and up
                flexDirection: { xs: 'column', sm: 'row' }, // Use column direction on xs screens, switch to row on sm screens and up
                '& .MuiSpeedDial-fab': {
                    width: 56, // Adjust the size of the Speed Dial button
                    height: 56,
                },
                '& .MuiSpeedDialAction-fab': {
                    position: 'absolute',
                    bottom: 0,
                    right: 0,
                    width: 56, // Adjust the size of the Speed Dial actions
                    height: 56,
                },
            }}
            icon={<SpeedDialIcon icon={action === 'add' ? <AddIcon /> : <RemoveIcon />} openIcon={<CloseIcon />} />}
            onClose={handleClose}
            onOpen={handleClick}
            open={open}
        >

            <SpeedDialAction
                icon={<EditIcon />}
                tooltipTitle="Advantage"
                onClick={handleClose}
                tooltipOpen
                tooltipPlacement={position === 1 ? 'right' : 'left'}
            />
            <SpeedDialAction
                icon={<DeleteIcon />}
                tooltipTitle="Penalties"
                onClick={handleClose}
                tooltipOpen
                tooltipPlacement={position === 1 ? 'right' : 'left'}
            />
            <SpeedDialAction
                icon={<AddIcon />}
                tooltipTitle="Points"
                onClick={handleClose}
                tooltipOpen
                tooltipPlacement={position === 1 ? 'right' : 'left'}
            />
        </SpeedDial>
    )
}
