import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { findAll } from '../actions/desejos-actions';
import { ListaDesejos } from '../models/ListaDesejos';

export function ListaDesejosListComponent() {

  const listaDesejos: ListaDesejos[] = useSelector((store: any) => store.listaDesejos.listaDesejos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch])

  const lista = listaDesejos.map((desejo: ListaDesejos) =>
    <NavLink key={desejo._id} to={`/desejo/${desejo._id}`} >
      <ListItem button>
        <ListItemText primary={desejo.nome} />
      </ListItem>
    </NavLink>
  );
  return (
    <div>
      <Container maxWidth="sm">
        <h1>Desejos</h1>
        <List>
          {lista}
        </List>
        <NavLink to={`/desejo`} >
          <Button variant="contained" color="primary">Novo</Button>
        </NavLink>
      </Container>
    </div>
  );
}
