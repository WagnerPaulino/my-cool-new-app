import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
// import { Actions } from 'react-native-router-flux';
import { ListaDesejos } from './models/ListaDesejos';
import { findOne, save, excluir } from './actions/actions';

interface State {
  listaDesejo: ListaDesejos;
  isNew: boolean;
}

interface Props {
  listaDesejos: ListaDesejos;
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

  componentDidMount() {
  }

  static getDerivedStateFromProps(props: any, state: any): State {
    return {
      listaDesejo: props.desejo,
      isNew: props.desejo._id ? false : true
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text key={this.state.listaDesejo._id}>{this.state.listaDesejo.nome}</Text>
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
    ...state.desejo
  }
};

export default connect(mapStateToProps, { findOne, save, excluir })(DesejosEdit);