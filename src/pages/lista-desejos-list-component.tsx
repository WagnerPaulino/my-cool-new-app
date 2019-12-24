import React from 'react';
import { connect } from 'react-redux'
import { AppState } from '..';
import { findAll } from '../actions/actions';

interface State {
    listaDesejosList: [];
}

interface Props {
  listaDesejosList: [];
  findAll: typeof findAll;
}

class ListaDesejosListComponent extends React.Component<Props, State> {

    public state: State;
  
    constructor(props: any) {
      super(props);
      this.state = {
        listaDesejosList: []
      };
    }
  
  
    render() {
      return (
        <div>
          <h1>Desejos</h1>
        </div>
      )
    }
  
  }
  
  const mapStateToProps = (state: AppState) => {
    return {
       ...state.listaDesejos
    }
  };
  
  export default connect(mapStateToProps,{findAll})(ListaDesejosListComponent);