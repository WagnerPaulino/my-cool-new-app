import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, TextInput } from 'react-native';
import { ListaDesejos } from './models/ListaDesejos';
import { findOne, save, excluir } from './actions/actions';

interface State {
  listaDesejo: ListaDesejos;
  isNew: boolean;
}

interface Props {
  listaDesejo: ListaDesejos;
  findOne: typeof findOne;
  save: typeof save;
  excluir: typeof excluir;
  match: any;
  history: any;
}

class DesejosEdit extends React.Component<Props, State> {

  constructor(props) {
    super(props);
    this.state = {
      listaDesejo: new ListaDesejos(),
      isNew: false
    }
  }
  
  static getDerivedStateFromProps(props: any, state: any): State {
    return {
      listaDesejo: Object.values(state.listaDesejo).filter(v => !!v).length > 0 ? state.listaDesejo : props.listaDesejo,
      isNew: !!props.listaDesejo._id ? false : true
    }
  }

  handleChange(value, field) {
    let desejo = this.state.listaDesejo;
    desejo[field] = value;
    this.setState({ listaDesejo: desejo })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>Desejo</Text>
        <TextInput key="nome" value={this.state.listaDesejo.nome} onChangeText={e => this.handleChange(e, 'nome')}></TextInput>
        <Text>Preço</Text>
        <TextInput key="preço" value={this.state.listaDesejo.preco.toString()} onChangeText={e => this.handleChange(e, 'preco')}></TextInput>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
});


const mapStateToProps = (state) => {
  return {
    ...state
  }
};

export default connect(mapStateToProps, { findOne, save, excluir })(DesejosEdit);