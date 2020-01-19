import React from 'react';
import { connect } from 'react-redux'
import { AppState } from '..';
import { findAll } from '../actions/actions';
import { ListaDesejos } from '../models/ListaDesejos';
import { NavLink } from 'react-router-dom';

interface State {
  listaDesejos: Array<ListaDesejos>;
}

interface Props {
  listaDesejos: Array<ListaDesejos>;
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
      listaDesejos: []
    };
  }



  detail(key: number) {
  }

  componentDidMount() {
    this.props.findAll();
  }

  // Substitui o componentWillReceiveProps
  static getDerivedStateFromProps(props: any, state: any) {
    return {
      ...props.state.listaDesejos
    }
  }

  render() {
    this.lista = this.state.listaDesejos.map((desejo) =>
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
    state
  }
};

export default connect(mapStateToProps, { findAll })(ListaDesejosListComponent);