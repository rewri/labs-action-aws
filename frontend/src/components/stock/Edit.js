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
import axios from 'axios';

export default function Add() {

  const { id } = useParams();
  const [stock, setStock] = useState([]);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState("");

  useEffect(() => {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    async function getStock() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_STOCKS}/${id}`, { headers });
        setStock(response.data);
        setCode(response.data.code);
        setName(response.data.name);
        setDescription(response.data.description);
        setEnabled(response.data.enabled);
      } catch (error) {
        console.error(error.response);
      }
    }
    getStock();
  }, [id]);

  const handleStockCode = (event) => {
    setCode(event.target.value);
  }
  const handleStockName = (event) => {
    setName(event.target.value);
  }
  const handleStockDescription = (event) => {
    setDescription(event.target.value);
  }
  const handleStockEnabled = (event) => {
    setEnabled(event.target.checked);
  }

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState([]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH };
    const data = new FormData(event.currentTarget);
    const postData = {
      id: data.get('id'),
      name: data.get('name'),
      code: data.get('code'),
      description: data.get('description'),
      enabled: data.get('enabled') === 'on' ? true : false,
    };
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_STOCKS}/${postData.id}`, postData, { headers });
      setSubmitted(true);
      setStock(response.data)
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
        <h4>{stock.name} - Editado com sucesso!</h4>
        <Link to="/estoques">
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
            Editar estoque
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} hidden={true}>
                <TextField
                  name="id"
                  id="id"
                  value={stock.id}
                  hidden
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="code">Código</InputLabel>
                <TextField
                  autoComplete="Código do estoque"
                  name="code"
                  fullWidth
                  id="code"
                  value={code}
                  onChange={handleStockCode}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="name">Nome</InputLabel>
                <TextField
                  autoComplete={stock.name}
                  name="name"
                  required
                  fullWidth
                  id="name"
                  value={name}
                  onChange={handleStockName}
                />
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
                  onChange={handleStockDescription}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="enabled">Ativo?</InputLabel>
                <Checkbox
                  aria-label='enabled'
                  name="enabled"
                  id="enabled"
                  checked={enabled}
                  onClick={handleStockEnabled} />
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
