'use client';

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function DifficultyToggle() {
  const [alignment, setAlignment] = React.useState<'easy' | 'medium' | 'difficult'>('medium');

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: 'easy' | 'medium' | 'difficult' | null,
  ) => {
    if (newAlignment !== null) {
      setAlignment(newAlignment);
      console.log(newAlignment);
    }
  };

  return (
    <ToggleButtonGroup
      color="standard"
      value={alignment}
      exclusive
      onChange={handleChange}
      aria-label="Difficulty"
      sx={{
        borderWidth: '2px',
        borderColor: 'rgba(255, 255, 255, 0.4);',
        bgcolor: 'rgba(0, 0, 0, 0.5);',
        '& .MuiToggleButton-root.Mui-selected': {
            bgcolor: '#6DB927',
            borderRadius: '0.5rem',
            margin: '0.3rem',
            ":hover": {
                bgcolor: '#6DB927',
            }
        }
      }
    }
    >
      <ToggleButton value="easy" size="large" sx={{fontWeight: 'bold', fontStyle: 'italic'}}>Easy</ToggleButton>
      <ToggleButton value="medium" size="large" sx={{fontWeight: 'bold', fontStyle: 'italic'}}>Medium</ToggleButton>
      <ToggleButton value="difficult" size="large" sx={{fontWeight: 'bold', fontStyle: 'italic'}}>Difficult</ToggleButton>
    </ToggleButtonGroup>
  );
}