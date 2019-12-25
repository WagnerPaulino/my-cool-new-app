import React from 'react';
import { ListaDesejos } from '../models/ListaDesejos';
import { findOne } from '../actions/actions';
import { AppState } from '..';
import { connect } from 'react-redux';

interface State {
    listaDesejos: ListaDesejos;
}

interface Props {
    listaDesejos: ListaDesejos;
    findOne: typeof findOne;
}

class ListaDesejosEditComponent extends React.Component<Props, State> {

    public state: State;
    private desejo: any = { nome: 'Les paul' };

    constructor(props: any) {
        super(props);
        this.onChanceValueForm = this.onChanceValueForm.bind(this);
        this.state = {
            listaDesejos: this.desejo
        };
    }

    onChanceValueForm(event: any) {
        this.desejo[event.target.name] = event.target.value
        this.setState({
            listaDesejos: this.desejo
        });
    }


    render() {
        return (
            <div>
                <h3>Desejo</h3>
                <input name="nome" placeholder="Nome" value={this.state.listaDesejos.nome} onChange={(e) => this.onChanceValueForm(e.nativeEvent)}></input>
            </div>
        )
    }
}
const mapStateToProps = (state: AppState) => {
    return {
      ...state.desejo
    }
  };
  
  export default connect(mapStateToProps, { findOne })(ListaDesejosEditComponent);