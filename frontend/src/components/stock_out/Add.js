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
import axios from 'axios';

export default function Add() {

  const [stocks, setStocks] = useState([]);
  const [stock, setStock] = useState('');
  useEffect(() => {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    async function getStocks() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_STOCKS}`, { headers });
        setStocks(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getStocks();
  }, []);

  const handleChangeStock = (event) => {
    setStock(event.target.value);
  };

  const [products, setProducts] = useState([]);
  const [product, setProduct] = useState('');
  useEffect(() => {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    async function getProducts() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_PRODUCTS}`, { headers });
        setProducts(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getProducts();
  }, []);

  const handleChangeProduct = (event) => {
    setProduct(event.target.value);
  };

  const [amount, setAmount] = useState(1);
  const handleChangeAmount = (event) => {
    if (event.target.value < 1) {
      return false;
    }
    setAmount(event.target.value);
  }

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const [stockOut, setStockOut] = useState(false);
  const handleSubmit = async (event) => {
    event.preventDefault();
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH };
    const data = new FormData(event.currentTarget);
    const postData = {
      id_stock: data.get('id_stock'),
      id_product: data.get('id_product'),
      amount: data.get('amount'),
      id_user: 1,
      description: data.get('description'),
    };
    try {
      const response = await axios.post(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_STOCK_OUT}`, postData, { headers });
      setSubmitted(true);
      setStockOut(response.data);
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
        <h4>{stockOut.id} Saída cadastrada com sucesso!</h4>
        <Link to="/saidas">
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
            Nova saída de estoque
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>

              <Grid item xs={12} sm={12}>
                <InputLabel id="id_stock">Estoque</InputLabel>
                <Select
                  autoComplete="Estoque"
                  name="id_stock"
                  required
                  fullWidth
                  id="id_stock"
                  label="Estoque"
                  value={stock}
                  onChange={handleChangeStock}
                >
                  {stocks.map((stock) => (
                    <MenuItem key={stock.id} value={stock.id}>
                      {stock.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={12}>
                <InputLabel id="id_product">Produto</InputLabel>
                <Select
                  autoComplete="Produto"
                  name="id_product"
                  required
                  fullWidth
                  id="id_product"
                  label="Produto"
                  value={product}
                  onChange={handleChangeProduct}
                >
                  {products.map((product) => (
                    <MenuItem key={product.id} value={product.id}>
                      {product.name}
                    </MenuItem>
                  ))}
                </Select>
              </Grid>

              <Grid item xs={12} sm={12}>
                <TextField
                  autoComplete="Quantidade"
                  name="amount"
                  required
                  fullWidth
                  id="amount"
                  label="Quantidade"
                  type="number"
                  min="1"
                  value={amount}
                  onChange={handleChangeAmount}
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
