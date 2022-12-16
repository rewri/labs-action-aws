import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import PageViewIcon from '@mui/icons-material/Pageview';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, ptBR, GridActionsCellItem } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import AssignmentIcon from '@mui/icons-material/Assignment';
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
  { field: 'stockName', headerName: 'Estoque', flex: 2, headerClassName: 'dg-header', valueGetter: (params) => params.row.stock.name },
  { field: 'productName', headerName: 'Produto', flex: 2, headerClassName: 'dg-header', valueGetter: (params) => params.row.product.name },
  { field: 'amount', headerName: 'Quantidade', flex: 2, headerClassName: 'dg-header', type: 'number', valueGetter: (params) => `${params.row.amount}` },
  {
    headerName: 'Ações',
    headerClassName: 'dg-header',
    field: 'actions',
    type: 'actions',
    flex: 1,
    getActions: (params) => [
      <Link to={`/${process.env.REACT_APP_API_ROUTE_STOCK_MOVE}/estoque/${params.row.stock.id}/produto/${params.row.product.id}`} >
        <GridActionsCellItem
          icon={<PageViewIcon sx={{ fontSize: 25 }} />}
          label="Ver"
          title="Ver detahes"
        />
      </Link>
    ],
  }
];

export default function List(props) {

  const pageSize = props.pageSize ? props.pageSize : 15;
  const minHeight = props.minHeight ? props.minHeight : 85;

  const [stockProduct, setStockProduct] = useState([]);

  useEffect(() => {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    async function getStockProduct() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_STOCK_PRODUCT}`, { headers });
        setStockProduct(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }

    getStockProduct();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: `${minHeight}vh` }}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={12} style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
            <AssignmentIcon />
            <h3 style={{ margin: 0, paddingLeft: '10px' }}>Estoques X Produtos</h3>
          </Grid>
        </Grid>
        <ThemeProvider theme={theme}>
          <DataGrid
            sx={{ border: 0 }}
            components={{ Toolbar: CustomToolbar }}
            autoHeight
            rows={stockProduct}
            columns={columns}
            pageSize={pageSize}
            rowsPerPageOptions={[pageSize]}
          />
        </ThemeProvider >
      </Paper>
    </div>
  )
}
