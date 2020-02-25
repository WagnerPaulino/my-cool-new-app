import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findAll } from '../actions/actions';
import { ListaDesejos } from '../models/ListaDesejos';
import { NavLink } from 'react-router-dom';

export function ListaDesejosListComponent() {

  const listaDesejos = useSelector((state: any) => state.listaDesejos.listaDesejos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch])

  const lista = listaDesejos.map((desejo: ListaDesejos) =>
    <NavLink key={desejo._id} to={`/desejo/${desejo._id}`} >
      <li>
        {desejo.nome}
      </li>
    </NavLink>
  );
  return (
    <div>
      <h1>Desejos</h1>
      <ul>
        {lista}
      </ul>
      <NavLink to={`/desejo`} >
        <button>Novo</button>
      </NavLink>
    </div>
  );
}
