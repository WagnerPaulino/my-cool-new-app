import React from 'react';
import { connect } from 'react-redux'
import { AppState } from '..';
import { findAll } from '../actions/actions';
import { ListaDesejos } from '../models/ListaDesejos';

interface State {
  listaDesejosList: Array<ListaDesejos>;
}

interface Props {
  listaDesejosList: Array<ListaDesejos>;
  findAll: typeof findAll;
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


  render() {
    this.lista = this.state.listaDesejosList.map((desejo) =>
      <li key={desejo.key}>
        {desejo.nome}
      </li>
  );
      return (
      <div>
        <h1>Desejos</h1>
        <ul>
          {this.lista}
        </ul>
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