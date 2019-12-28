import React from 'react';
import { connect } from 'react-redux'
import { AppState } from '..';
import { findAll } from '../actions/actions';
import { ListaDesejos } from '../models/ListaDesejos';
import { NavLink } from 'react-router-dom';

interface State {
  listaDesejosList: Array<ListaDesejos>;
}

interface Props {
  listaDesejosList: Array<ListaDesejos>;
  findAll: typeof findAll;
  match: any;
  history: any;
}

class ListaDesejosListComponent extends React.Component<Props, State> {

  public state: State;

  private lista: any = [];

  constructor(props: any) {
    super(props);
    this.state = {
      listaDesejosList: this.props.findAll().listaDesejosList
    };
  }

  detail(key: number) {
  }


  render() {
    this.lista = this.state.listaDesejosList.map((desejo) =>
      <NavLink key={desejo.key} to={`/desejo/${desejo.key}`} >
        <li>
          {desejo.nome}
        </li>
      </NavLink>
    );
    return (
      <div>
        <h1>Desejos</h1>
        <ul>
          {this.lista}
        </ul>
        <NavLink to={`/desejo`} >
          <button>Novo</button>
        </NavLink>
      </div>
    )
  }

}

const mapStateToProps = (state: AppState) => {
  return {
    ...state.listaDesejos
  }
};

export default connect(mapStateToProps, { findAll })(ListaDesejosListComponent);