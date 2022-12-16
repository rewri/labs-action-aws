import React, { useState, useEffect } from 'react';
import { Link, useParams } from "react-router-dom";
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Box from '@mui/material/Box';
import axios from 'axios';

export default function Detail() {

  const { id } = useParams();
  const [stockin, setStockIn] = useState([]);

  useEffect(() => {
    const headers = { 'Authorization': process.env.REACT_APP_API_AUTH }
    async function getStockIn() {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_ROUTE_STOCK_IN}/${id}`, { headers });
        setStockIn(response.data);
      } catch (error) {
        console.error(error.response);
      }
    }
    getStockIn();
  }, [id]);

  return (
    <div style={{ width: '100%' }}>
      <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
        <h3 style={{ margin: 0, marginBottom: '15px' }}>
            Entrada de <span style={{ color: '#01579B' }}>{stockin.amount} item(s)</span> <span style={{ color: '#01579B' }}>{stockin.product?.name}</span> em <span style={{ color: '#01579B' }}>{stockin.stock?.name}</span>
        </h3>
        <ul style={{ fontSize: '1.2em' }}>
          <li style={{ marginBottom: '5px' }}><strong>ID: </strong>{stockin.id}</li>
          <li style={{ marginBottom: '5px' }}><strong>Estoque: </strong>{stockin.stock?.name}</li>
          <li style={{ marginBottom: '5px' }}><strong>Produto: </strong>{stockin.product?.name}</li>
          <li style={{ marginBottom: '5px' }}><strong>Usuário: </strong>{stockin.user?.name}</li>
          <li style={{ marginBottom: '5px' }}><strong>Quantidade: </strong>{stockin.amount}</li>
          <li style={{ marginBottom: '5px' }}><strong>Adicionado em: </strong>{new Date(stockin.createdAt).toLocaleDateString('pt-BR')} - {new Date(stockin.createdAt).toLocaleTimeString('pt-BR')}</li>
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
            <Link to="/entradas/" >
              <Button>Voltar</Button>
            </Link>
          </ButtonGroup>
        </Box>
      </Paper>
    </div>
  )
}

