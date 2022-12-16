import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';

export default function Add() {

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    async function getCategories() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_CATEGORIES}`, { headers });
        const enabledCategories = response.data.filter(category => category.enabled === true);
        setCategories(enabledCategories);
      } catch (error) {
        console.error(error.response);
      }
    }
    getCategories();
  }, []);

  const [category, setCategory] = React.useState('');
  const handleChange = (event) => {
    setCategory(event.target.value);
  };

  const [product, setProduct] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);
  const [dateValue, setDateValue] = useState(null);

  const handleChangeDate = (newValue) => {
    setDateValue(newValue);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH };
    const data = new FormData(event.currentTarget);
    const postData = {
      id_category: data.get('id_category'),
      name: data.get('name'),
      description: data.get('description'),
      brand: data.get('brand'),
      batch: data.get('batch'),
      due_date: data.get('due_date') ? data.get('due_date').split('/').reverse().join('-') : null
    };

    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_PRODUCTS}`, postData, { headers });
      setSubmitted(true);
      setProduct(response.data)
    } catch (error) {
      const data = error.response.data.errors;
      const errorArray = [];
      for (let err in data) {
        errorArray.push(Object.values(data[err]));
      }
      setErrors(errorArray.flat());
    }
  };

  return (
    <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', minHeight: '85vh' }}>
      {submitted ? (<div>
        <h4>Produto {product.name} cadastrado com sucesso!</h4>
        <Link to="/produtos">
          <Button>Voltar</Button>
        </Link>
      </div>
      ) : (
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
          }}
        >
          <Typography component="h1" variant="h5">
            Novo produto
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <InputLabel id="id_category">Categoria</InputLabel>
                <Select
                  autoComplete="Categoria"
                  name="id_category"
                  required
                  fullWidth
                  id="id_category"
                  label="Categoria"
                  value={category}
                  onChange={handleChange}
                >
                  {categories.map((category) => (
                    <MenuItem key={category.id} value={category.id}>
                      {category.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="Nome do produto"
                  name="name"
                  required
                  fullWidth
                  id="name"
                  label="Nome"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="marca"
                  name="brand"
                  fullWidth
                  id="brand"
                  label="Marca"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="Lote"
                  name="batch"
                  fullWidth
                  id="batch"
                  label="Lote"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="Descrição auxiliar"
                  name="description"
                  fullWidth
                  id="description"
                  label="Descrição"
                  multiline
                  rows={4}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <Stack spacing={3}>
                    <DesktopDatePicker
                      name="due_date"
                      id="due_date"
                      label="Data de vencimento"
                      inputFormat="dd/MM/yyyy"
                      value={dateValue}
                      onChange={handleChangeDate}
                      renderInput={(params) => <TextField {...params} name='due_date' />}
                    />
                  </Stack>
                </LocalizationProvider>
              </Grid>
            </Grid>
            {errors.map((row) => (
              <div>{row}</div>
            ))}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Enviar
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  )
}
