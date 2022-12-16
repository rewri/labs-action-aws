import React, { useState, useEffect } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useParams } from "react-router-dom";
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, ptBR } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import Box from '@mui/material/Box';
import clsx from 'clsx';
import axios from 'axios';

const theme = createTheme(
  {
    palette: {
      primary: { main: '#01579B' },
    },
  },
  ptBR,
);

function CustomToolbar() {
  return (
    <GridToolbarContainer style={{ marginBottom: '10px' }}>
      <GridToolbarFilterButton />
      <GridToolbarExport />
    </GridToolbarContainer>
  );
}

const columns = [
  { field: 'userName', headerName: 'Usuário', flex: 2, headerClassName: 'dg-header', valueGetter: (params) => params.row.user.name },
  { field: 'stockName', headerName: 'Estoque', flex: 2, headerClassName: 'dg-header', valueGetter: (params) => params.row.stock.name },
  { field: 'productName', headerName: 'Produto', flex: 2, headerClassName: 'dg-header', valueGetter: (params) => params.row.product.name },
  {
    field: 'type', headerName: 'Tipo', flex: 1, headerClassName: 'dg-header',
    valueGetter: (params) => `${params.row.type === 1 ? 'Entrada' : 'Saída'}`,
    cellClassName: (params: GridCellParams<number>) =>
      clsx('super-app', {
        negative: params.row.type === 1,
        positive: params.row.type === 2,
      }),
  },
  {
    field: 'amount', headerName: 'Quantidade', flex: 1, headerClassName: 'dg-header', type: 'number',
    valueGetter: (params) => `${params.row.type === 1 ? '+' : '-'} ${params.row.amount}`,
    cellClassName: (params: GridCellParams<number>) =>
      clsx('super-app', {
        negative: params.row.type === 1,
        positive: params.row.type === 2,
      }),
  },
  { field: 'createdAt', headerName: 'Movido em', flex: 1, headerClassName: 'dg-header', type: 'dateTime', valueGetter: ({ value }) => value && new Date(value).toLocaleDateString('pt-BR') },
];

export default function List(props) {

  const pageSize = props.pageSize ? props.pageSize : 15;
  const minHeight = props.minHeight ? props.minHeight : 100;

  const { stock_id, product_id } = useParams();
  const [stockMovement, setStockMovement] = useState([]);
  const [stockName, setStockName] = useState("");
  const [productName, setProductName] = useState("");

  useEffect(() => {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    async function getStockMovement() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_STOCK_MOVE}/estoque/${stock_id}/produto/${product_id}`, { headers });
        setStockMovement(response.data);
        setStockName(response.data[0].stock.name);
        setProductName(response.data[0].product.name);
      } catch (error) {
        console.error(error.response);
      }
    }
    getStockMovement();
  }, [stock_id, product_id]);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: `${minHeight}vh` }}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
            <SyncAltIcon />
            <h3 style={{ margin: 0, paddingLeft: '10px' }}>Movimentação de estoque - {productName} em {stockName}</h3>
          </Grid>
        </Grid>
        <Box
          sx={{
            '& .super-app.negative': {
              color: '#33691e',
              fontWeight: '600',
            },
            '& .super-app.positive': {
              color: '#b71c1c',
              fontWeight: '600',
            },
          }}
        >
          <ThemeProvider theme={theme}>
            <DataGrid
              sx={{ border: 0 }}
              components={{ Toolbar: CustomToolbar }}
              autoHeight
              rows={stockMovement}
              columns={columns}
              pageSize={pageSize}
              rowsPerPageOptions={[pageSize]}
            />
          </ThemeProvider >
        </Box>
      </Paper>
    </div>
  )
}
