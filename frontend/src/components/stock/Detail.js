import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import axios from 'axios';

export default function Detail() {

  const { id } = useParams();
  const [stocks, setStocks] = useState([]);

  useEffect(() => {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    async function getStocks() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_STOCKS}/${id}`, { headers });
        setStocks(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getStocks();
  }, [id]);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: 0, marginBottom: '15px' }}>#{stocks.id} - {stocks.name}</h3>
        <ul style={{ fontSize: '1.2em' }}>
          <li style={{ marginBottom: '5px' }}><strong>ID: </strong>{stocks.id}</li>
          <li style={{ marginBottom: '5px' }}><strong>Código: </strong>{stocks.code}</li>
          <li style={{ marginBottom: '5px' }}><strong>Nome: </strong>{stocks.name}</li>
          <li style={{ marginBottom: '5px' }}><strong>Descrição: </strong>{stocks.description}</li>
          <li style={{ marginBottom: '5px' }}><strong>Ativo: </strong>{stocks.enabled ? 'Sim' : 'Não'}</li>
          <li style={{ marginBottom: '5px' }}><strong>Criado em: </strong>{new Date(stocks.createdAt).toLocaleDateString('pt-BR')}</li>
          <li style={{ marginBottom: '5px' }}><strong>Atualizado em: </strong>{new Date(stocks.updatedAt).toLocaleDateString('pt-BR')}</li>
        </ul>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'left',
            '& > *': {
              m: 1,
            },
          }}
        >
          <ButtonGroup variant="outlined">
            <Link to="/estoques/" >
              <Button>Voltar</Button>
            </Link>
            <Link to={`/estoques/editar/${stocks.id}`} >
              <Button>Editar</Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Paper>
    </div>
  )
}
