import * as React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

import TopBar from './components/layout/TopBar';
import MainMenu from './components/layout/MainMenu';
import MainContent from './components/layout/MainContent';

function App() {

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <TopBar />
        </Grid>
        <Grid item xs={2} sx={{ backgroundColor: "#fff" }}>
          <MainMenu />
        </Grid>
        <Grid item xs={10}>
          <MainContent />
        </Grid>
      </Grid>
    </Box>
  );
}

export default App;
