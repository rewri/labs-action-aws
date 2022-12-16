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
  const [category, setCategory] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [enabled, setEnabled] = useState("");

  useEffect(() => {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    async function getCategory() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_CATEGORIES}/${id}`, { headers });
        setCategory(response.data);
        setName(response.data.name);
        setDescription(response.data.description);
        setEnabled(response.data.enabled);
      } catch (error) {
        console.error(error.response);
      }
    }
    getCategory();
  }, [id]);

  const handleCategoryName = (event) => {
    setName(event.target.value);
  }
  const handleCategoryDescription = (event) => {
    setDescription(event.target.value);
  }
  const handleCategoryEnabled = (event) => {
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
      description: data.get('description'),
      enabled: data.get('enabled') === 'on' ? true : false,
    };
    try {
      const response = await axios.put(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_CATEGORIES}/${postData.id}`, postData, { headers });
      setSubmitted(true);
      setCategory(response.data)
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
        <h4>{category.name} - Editada com sucesso!</h4>
        <Link to="/categorias">
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
            Editar categoria
          </Typography>
          <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12} hidden={true}>
                <TextField
                  name="id"
                  id="id"
                  value={category.id}
                  hidden
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="name">Nome</InputLabel>
                <TextField
                  autoComplete={category.name}
                  name="name"
                  required
                  fullWidth
                  id="name"
                  value={name}
                  onChange={handleCategoryName}
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
                  onChange={handleCategoryDescription}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <InputLabel id="enabled">Ativo?</InputLabel>
                <Checkbox
                  aria-label='enabled'
                  name="enabled"
                  id="enabled"
                  checked={enabled}
                  onClick={handleCategoryEnabled} />
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
