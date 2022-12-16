import React from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import StockIn from './stock_in/List';
import Counter from './Counter';
import StockOut from './stock_out/List';
import StockProductList from './stock_product/List';
import StockProductCriticList from './stock_product/CriticList';

export default function Dashboard() {
  return (
    <div>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Counter />
          </Grid>
          <Grid item xs={12}>
            <StockProductCriticList pageSize={5} minHeight={10} />
          </Grid>
          <Grid item xs={12}>
            <StockProductList pageSize={5} minHeight={10} />
          </Grid>
          <Grid item xs={12}>
            <StockIn pageSize={5} minHeight={10} />
          </Grid>
          <Grid item xs={12}>
            <StockOut pageSize={5} minHeight={10} />
          </Grid>
        </Grid>
      </Box>
    </div>
  )
}
