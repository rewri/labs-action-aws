import * as React from 'react';
import { Link } from "react-router-dom";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import HomeIcon from '@mui/icons-material/Home';
import ArticleIcon from '@mui/icons-material/Article';
import BookmarksIcon from '@mui/icons-material/Bookmarks';
import VaccinesIcon from '@mui/icons-material/Vaccines';
import AssignmentIcon from '@mui/icons-material/Assignment';
import SyncAltIcon from '@mui/icons-material/SyncAlt';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';
import ListAltIcon from '@mui/icons-material/ListAlt';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function NestedList() {

  const [openStock, setOpenStock] = React.useState(false);
  const [openProducts, setOpenProducts] = React.useState(false);
  const [openCategories, setOpenCategories] = React.useState(false);
  const [selectedIndex, setSelectedIndex] = React.useState(1);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  const handleStockClick = () => {
    setOpenStock(!openStock);
    setOpenCategories(false);
    setOpenProducts(false);
    setSelectedIndex(10);
  };

  const handleCategoriesClick = () => {
    setOpenCategories(!openCategories);
    setOpenStock(false);
    setOpenProducts(false);
    setSelectedIndex(11);
  };

  const handleProductsClick = () => {
    setOpenProducts(!openProducts);
    setOpenStock(false);
    setOpenCategories(false);
    setSelectedIndex(12);
  };

  return (
    <List sx={{ width: '100%', maxWidth: 360, height: '91vh', backgroundColor: '#fff' }} component="nav">

      <ListItem alignItems="center" flexDirection="row" flexWrap="wrap">
        <ListItemAvatar >
          <Avatar alt="Clara Fumes" src="/assets/images/avatar/clara.fumes.jpg" sx={{ width: 76, height: 76 }} />
        </ListItemAvatar>
        <ListItemText primary="Clara Fumes" sx={{ pl: 3 }} />
      </ListItem>

      <Divider component="li" sx={{ marginTop: '20px', marginBottom: '20px' }} />

      <Link to="/">
        <ListItemButton key='dashboard' sx={{ marginTop: '20px' }} selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
          <ListItemIcon>
            <HomeIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItemButton>
      </Link>

      <Link to="/estoque-produto/">
        <ListItemButton key='estoque_produto' selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
          <ListItemIcon>
            <AssignmentIcon />
          </ListItemIcon>
          <ListItemText primary="Estoque X Produto" />
        </ListItemButton>
      </Link>

      <Link to="/entradas">
        <ListItemButton key='entradas' selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
          <ListItemIcon>
            <AddShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Entradas de estoque" />
        </ListItemButton>
      </Link>

      <Link to="/saidas">
        <ListItemButton key='saidas' selected={selectedIndex === 3} onClick={(event) => handleListItemClick(event, 3)}>
          <ListItemIcon>
            <RemoveShoppingCartIcon />
          </ListItemIcon>
          <ListItemText primary="Saídas de estoque" />
        </ListItemButton>
      </Link>

      <Link to="/movimentacao">
        <ListItemButton key='movimentacao' selected={selectedIndex === 13} onClick={(event) => handleListItemClick(event, 13)}>
          <ListItemIcon>
            <SyncAltIcon />
          </ListItemIcon>
          <ListItemText primary="Movimentação de estoque" />
        </ListItemButton>
      </Link>

      <Divider component="li" sx={{ marginTop: '20px', marginBottom: '20px' }} />

      <ListItemButton onClick={handleStockClick} selected={selectedIndex === 10} >
        <ListItemIcon>
          <ArticleIcon />
        </ListItemIcon>
        <ListItemText primary="Estoques" />
        {openStock ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openStock} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/estoques/">
            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 4} onClick={(event) => handleListItemClick(event, 4)}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Ver todos" />
            </ListItemButton>
          </Link>
          <Link to="/estoques/novo">
            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 5} onClick={(event) => handleListItemClick(event, 5)}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Novo estoque" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      <ListItemButton onClick={handleProductsClick} selected={selectedIndex === 12}>
        <ListItemIcon>
          <VaccinesIcon />
        </ListItemIcon>
        <ListItemText primary="Produtos" />
        {openProducts ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openProducts} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/produtos/">
            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 8} onClick={(event) => handleListItemClick(event, 8)}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Ver todos" />
            </ListItemButton>
          </Link>
          <Link to="/produtos/novo">
            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 9} onClick={(event) => handleListItemClick(event, 9)}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Novo produto" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

      <ListItemButton onClick={handleCategoriesClick} selected={selectedIndex === 11}>
        <ListItemIcon>
          <BookmarksIcon />
        </ListItemIcon>
        <ListItemText primary="Categorias" />
        {openCategories ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={openCategories} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <Link to="/categorias/">
            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 6} onClick={(event) => handleListItemClick(event, 6)}>
              <ListItemIcon>
                <ListAltIcon />
              </ListItemIcon>
              <ListItemText primary="Ver todas" />
            </ListItemButton>
          </Link>
          <Link to="/categorias/novo">
            <ListItemButton sx={{ pl: 4 }} selected={selectedIndex === 7} onClick={(event) => handleListItemClick(event, 7)}>
              <ListItemIcon>
                <AddCircleOutlineIcon />
              </ListItemIcon>
              <ListItemText primary="Nova categoria" />
            </ListItemButton>
          </Link>
        </List>
      </Collapse>

    </List>
  );
}
