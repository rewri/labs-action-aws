import React from 'react';
import { Routes, Route } from "react-router-dom";
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';

import Dashboard from '../Dashboard';

import StockInList from '../stock_in/List';
import StockInAdd from '../stock_in/Add';
import StockInDetail from '../stock_in/Detail';

import StockOutList from '../stock_out/List';
import StockOutAdd from '../stock_out/Add';
import StockOutDetail from '../stock_out/Detail';

import StockList from '../stock/List';
import StockAdd from '../stock/Add';
import StockEdit from '../stock/Edit';
import StockDetail from '../stock/Detail';

import CategoryList from '../category/List';
import CategoryAdd from '../category/Add';
import CategoryEdit from '../category/Edit';
import CategoryDetail from '../category/Detail';

import ProductList from '../product/List';
import ProductAdd from '../product/Add';
import ProductEdit from '../product/Edit';
import ProductDetail from '../product/Detail';

import StockProductList from '../stock_product/List';
import StockProductByStockList from '../stock_product/ListByStock';
import StockProductByProductList from '../stock_product/ListByProduct';

import StockMovementList from '../stock_movement/List';
import StockMovementDetail from '../stock_movement/Detail';
import StockMovementByStock from '../stock_movement/ByStock';
import StockMovementByProduct from '../stock_movement/ByProduct';

import Profile from '../user/Profile';

export default function MainContent() {
  return (
    <div>
      <Container maxWidth="{false}" sx={{ mt: 3 }}>
        <Grid item xs={12}>
          <Routes>
            <Route index element={<Dashboard />} />

            <Route exact path="/perfil" element={<Profile />} />

            <Route exact path="/estoque-produto" element={<StockProductList />} />
            <Route exact path="/estoque-produto/estoque/:id" element={<StockProductByStockList />} />
            <Route exact path="/estoque-produto/produto/:id" element={<StockProductByProductList />} />

            <Route exact path="/entradas" element={<StockInList />} />
            <Route exact path="/entradas/novo" element={<StockInAdd />} />
            <Route exact path="/entradas/detalhes/:id" element={<StockInDetail />} />

            <Route exact path="/saidas" element={<StockOutList />} />
            <Route exact path="/saidas/novo" element={<StockOutAdd />} />
            <Route exact path="/saidas/detalhes/:id" element={<StockOutDetail />} />

            <Route exact path="/movimentacao" element={<StockMovementList />} />
            <Route exact path="/movimentacao/estoque/:stock_id/produto/:product_id" element={<StockMovementDetail />} />
            <Route exact path="/movimentacao/estoque/:id" element={<StockMovementByStock />} />
            <Route exact path="/movimentacao/produto/:id" element={<StockMovementByProduct />} />

            <Route exact path="/estoques" element={<StockList />} />
            <Route exact path="/estoques/novo" element={<StockAdd />} />
            <Route exact path="/estoques/detalhes/:id" element={<StockDetail />} />
            <Route exact path="/estoques/editar/:id" element={<StockEdit />} />

            <Route exact path="/categorias" element={<CategoryList />} />
            <Route exact path="/categorias/novo" element={<CategoryAdd />} />
            <Route exact path="/categorias/detalhes/:id" element={<CategoryDetail />} />
            <Route exact path="/categorias/editar/:id" element={<CategoryEdit />} />

            <Route exact path="/produtos" element={<ProductList />} />
            <Route exact path="/produtos/novo" element={<ProductAdd />} />
            <Route exact path="/produtos/detalhes/:id" element={<ProductDetail />} />
            <Route exact path="/produtos/editar/:id" element={<ProductEdit />} />

          </Routes>
        </Grid>
      </Container>
    </div>
  )
}
