import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet } from 'react-native';
import { ListaDesejos } from './models/ListaDesejos';
import { findAll } from './actions/actions';

interface State {
  listaDesejos: Array<ListaDesejos>;
}

interface Props {
  listaDesejos: Array<ListaDesejos>;
  findAll: typeof findAll;
  match: any;
  history: any;
}

class DesejosList extends React.Component<Props, State> {

  private lista: any = [];

  constructor(props) {
    super(props);
    this.state = {
      listaDesejos: []
    }
  }

  componentDidMount() {
    this.props.findAll();
  }

  static getDerivedStateFromProps(props: any, state: any) {
    return {
      ...props.state.listaDesejos
    }
  }

  render() {
    this.lista = this.state.listaDesejos.map((desejo) =>
      <Text key={desejo._id}>{desejo.nome}</Text>
    );
    return (
      <View style={styles.container}>
        {this.lista}
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
    state
  }
};

export default connect(mapStateToProps, { findAll })(DesejosList);