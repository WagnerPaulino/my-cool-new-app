import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink } from 'react-router-dom';
import { findAll } from '../actions/desejos-actions';
import { ListaDesejos } from '../models/ListaDesejos';

export function ListaDesejosListComponent() {

  const listaDesejos = useSelector((store: any) => store.listaDesejos.listaDesejos)
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
