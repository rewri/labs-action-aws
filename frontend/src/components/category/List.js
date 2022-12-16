import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { DataGrid, GridToolbarContainer, GridToolbarFilterButton, GridToolbarExport, ptBR, GridActionsCellItem } from '@mui/x-data-grid';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import PageViewIcon from '@mui/icons-material/Pageview';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
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

async function handleDelete(id) {
  try {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    await axios.delete(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_CATEGORIES}/${id}`, { headers });
    window.location.reload(false);
  } catch (error) {
    console.error(error.response);
    if (error.response.status === 406) {
      alert(error.response.data.error);
    }
  }
}

const columns = [
  { field: 'name', headerName: 'Nome', flex: 2, headerClassName: 'dg-header' },
  { field: 'description', headerName: 'Descrição', flex: 2, headerClassName: 'dg-header' },
  { field: 'enabled', headerName: 'Ativo', flex: 1, headerClassName: 'dg-header', type: 'boolean' },
  { field: 'createdAt', headerName: 'Criado em', flex: 1, headerClassName: 'dg-header', type: 'dateTime', valueGetter: ({ value }) => value && new Date(value).toLocaleDateString('pt-BR') },
  {
    headerName: 'Ações',
    headerClassName: 'dg-header',
    field: 'actions',
    type: 'actions',
    flex: 1,
    getActions: (params) => [
      <Link to={`/${process.env.REACT_APP_API_ROUTE_CATEGORIES}/detalhes/${params.id}`} >
        <GridActionsCellItem
          icon={<PageViewIcon sx={{ fontSize: 25 }} />}
          label="Ver"
          title="Ver detahes"
        />
      </Link>,
      <Link to={`/${process.env.REACT_APP_API_ROUTE_CATEGORIES}/editar/${params.id}`} >
        <GridActionsCellItem
          icon={<EditIcon sx={{ fontSize: 25 }} />}
          label="Editar"
          title="Editar"
        />
      </Link>,
      <GridActionsCellItem
        icon={<DeleteIcon color="error" sx={{ fontSize: 25 }} />}
        label="Excluir"
        title="Excluir"
        onClick={() => { if (window.confirm('Deseja realmente excluir?')) handleDelete(params.id) }}
      />,
    ],
  }
];

export default function List() {

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    async function getCategories() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_CATEGORIES}`, { headers });
        setCategories(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getCategories();
  }, []);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
        <Grid container spacing={2} justifyContent="flex-end">
          <Grid item xs={6} style={{ display: 'flex', flexWrap: 'wrap', marginBottom: '20px' }}>
            <BookmarksIcon />
            <h3 style={{ margin: 0, paddingLeft: '10px' }}>Categorias</h3>
          </Grid>
          <Grid item xs={6}>
            <Box display="flex" justifyContent="flex-end">
              <Link to={`/${process.env.REACT_APP_API_ROUTE_CATEGORIES}/novo`}>
                <Button variant="outlined">Nova categoria</Button>
              </Link>
            </Box>
          </Grid>
        </Grid>
        <ThemeProvider theme={theme}>
          <DataGrid
            sx={{ border: 0 }}
            components={{ Toolbar: CustomToolbar }}
            autoHeight
            rows={categories}
            columns={columns}
            pageSize={15}
            rowsPerPageOptions={[15]}
          />
        </ThemeProvider >
      </Paper>
    </div>
  )
}
