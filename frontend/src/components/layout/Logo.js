import Avatar from '@mui/material/Avatar';
import React from 'react';

export default function Logo() {
  return (
    <div>
      <Avatar
        alt="Labs action"
        src="./assets/images/logo-labsaction.png"
        sx={{ width: 48, height: 48, mr: 3 }}
      />
    </div>
  )
}
