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
    match: any
}

class ListaDesejosEditComponent extends React.Component<Props, State> {

    private desejo: any = new ListaDesejos();

    constructor(props: any) {
        super(props);
        this.state = {
            listaDesejos: {key: 0,nome: '', melhoresPrecos: []}
        }
        this.onChanceValueForm = this.onChanceValueForm.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.key) {
            this.setState({
                ...this.props.findOne(this.props.match.params.key)
            });
        } else {
            this.setState({
                listaDesejos: {key: 0,nome: '', melhoresPrecos: []}
            });
        }
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
                <input name="nome" placeholder="Nome" value={this.state?.listaDesejos?.nome} onChange={(e) => this.onChanceValueForm(e.nativeEvent)}></input>
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