import React from 'react';
import { ListaDesejos } from '../models/ListaDesejos';
import { findOne, save } from '../actions/actions';
import { AppState } from '..';
import { connect } from 'react-redux';

interface State {
    listaDesejos: ListaDesejos;
    isNew: boolean;
}

interface Props {
    listaDesejos: ListaDesejos;
    findOne: typeof findOne;
    save: typeof save;
    match: any
}

class ListaDesejosEditComponent extends React.Component<Props, State> {

    private desejo: any = new ListaDesejos();

    constructor(props: any) {
        super(props);
        this.state = {
            listaDesejos: { key: 0, nome: '', melhoresPrecos: [] },
            isNew: true
        }
        this.onChanceValueForm = this.onChanceValueForm.bind(this);
    }

    componentDidMount() {
        if (this.props.match.params.key) {
            this.setState({
                ...this.props.findOne(this.props.match.params.key),
                isNew: false
            });
        } else {
            this.setState({
                listaDesejos: { key: 0, nome: '', melhoresPrecos: [] },
                isNew: true
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
                {
                    this.state.isNew ? 
                        <button onClick={() => this.props.save(this.state.listaDesejos)}>
                            Salvar
                        </button> 
                        : <div></div>
                }
            </div>
        )
    }
}
const mapStateToProps = (state: AppState) => {
    return {
        ...state.desejo
    }
};

export default connect(mapStateToProps, { findOne, save })(ListaDesejosEditComponent);