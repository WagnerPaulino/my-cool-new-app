import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { findAll } from '../actions/desejos-actions';
import { ListaDesejos } from '../models/ListaDesejos';
import { NavLink } from 'react-router-dom';
import { getCurrentUser } from '../actions/usuario-actions';

export function ListaDesejosListComponent() {

  const listaDesejos = useSelector((store: any) => store.listaDesejos.listaDesejos)
  const usuarioState = useSelector((store: any) => store.usuario.usuario);
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch])

  useEffect(() => {
    dispatch(getCurrentUser())
  })

  const lista = listaDesejos.map((desejo: ListaDesejos) =>
    <NavLink key={desejo._id} to={`/desejo/${desejo._id}`} >
      <li>
        {desejo.nome}
      </li>
    </NavLink>
  );
  return (
    <div>
      {
        usuarioState ? <p>Olá {usuarioState?.displayName}</p> : <p>Usuario não logado, Você não devia tá aqui... isso é um bug... REPORTE!</p>
      }
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
