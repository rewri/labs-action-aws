import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InputLabel from '@mui/material/InputLabel';
import Checkbox from '@mui/material/Checkbox';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DesktopDatePicker } from '@mui/x-date-pickers/DesktopDatePicker';
import axios from 'axios';

export default function Add() {

  const { id } = useParams();
  const [product, setProduct] = useState("");
  const [name, setName] = useState("");
  const [category, setCategory] = React.useState("");
  const [brand, setBrand] = useState("");
  const [batch, setBatch] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState("");
  const [dateValue, setDateValue] = useState(null);

  useEffect(() => {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    async function getProduct() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_PRODUCTS}/${id}`, { headers });
        setProduct(response.data);
        setName(response.data.name);
        setCategory(response.data.id_category);
        setBrand(response.data.brand);
        setBatch(response.data.batch);
        setDescription(response.data.description);
        setDateValue(response.data.due_date);
        setEnabled(response.data.enabled);
      } catch (error) {
        console.error(error.response);
      }
    }
    getProduct();
  }, [id]);

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

  const handleChangeCategory = (event) => {
    setCategory(event.target.value);
  };
  const handleProductName = (event) => {
    setName(event.target.value);
  }
  const handleProductDescription = (event) => {
    setDescription(event.target.value);
  }
  const handleProductEnabled = (event) => {
    setEnabled(event.target.checked);
  }
  const handleProductBatch = (event) => {
    setBatch(event.target.value);
  }
  const handleProductBrand = (event) => {
    setBrand(event.target.value);
  }
  const handleChangeDate = (newValue) => {
    setDateValue(newValue);
  };

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH };
    const data = new FormData(event.currentTarget);
    const postData = {
      id: data.get('id'),
      name: data.get('name'),
      id_category: data.get('id_category'),
      brand: data.get('brand'),
      batch: data.get('batch'),
      description: data.get('description'),
      due_date: data.get('due_date') ? data.get('due_date').split('/').reverse().join('-') : null,
      enabled: data.get('enabled') === 'on' ? true : false,
    };
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_PRODUCTS}/${postData.id}`, postData, { headers });
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
        <h4>{product.name} - Editado com sucesso!</h4>
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
            Editar produto
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} hidden={true}>
                <TextField
                  name="id"
                  id="id"
                  value={product.id}
                  hidden
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="name">Nome</InputLabel>
                <TextField
                  name="name"
                  required
                  fullWidth
                  id="name"
                  value={name}
                  onChange={handleProductName}
                />
              </Grid>
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
                  onChange={handleChangeCategory}
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
                  autoComplete="marca"
                  name="brand"
                  fullWidth
                  id="brand"
                  label="Marca"
                  value={brand}
                  onChange={handleProductBrand}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="Lote"
                  name="batch"
                  fullWidth
                  id="batch"
                  label="Lote"
                  value={batch}
                  onChange={handleProductBatch}
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
              <Grid item xs={12} sm={12}>
                <InputLabel id="description">Descrição auxiliar</InputLabel>
                <TextField
                  autoComplete="Descrição auxiliar"
                  name="description"
                  fullWidth
                  id="description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={handleProductDescription}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="enabled">Ativo?</InputLabel>
                <Checkbox
                  aria-label='enabled'
                  name="enabled"
                  id="enabled"
                  checked={enabled}
                  onClick={handleProductEnabled} />
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
              Atualizar
            </Button>
          </Box>
        </Box>
      )}
    </Paper>
  )
}
