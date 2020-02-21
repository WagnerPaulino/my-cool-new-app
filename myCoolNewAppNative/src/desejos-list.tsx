import React from 'react';
import { connect } from 'react-redux';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
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
    this.detail = this.detail.bind(this);
    this.state = {
      listaDesejos: []
    }
  }

  componentDidMount() {   
    this.props.findAll();
  }

  static getDerivedStateFromProps(props: any, state: any): State {
    return {
      ...props.state.listaDesejos
    }
  }

  detail(desejo: ListaDesejos) {
    Actions["desejo-edit"]({ listaDesejo: Object.assign({}, desejo) });
  }

  render() {
    this.lista = this.state.listaDesejos.map((desejo) =>
      <Text key={desejo._id} onPress={() => this.detail(desejo)}>{desejo.nome}</Text>
    );
    return (
      <View style={styles.container}>
        <Button onPress={() => Actions["desejo-edit"]({ listaDesejo: new ListaDesejos() })} title="Novo" ></Button>
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
    width: '100%'
  },
  headerCard: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    width: '100%',
    height: '5%'
  }
});


const mapStateToProps = (state) => {
  return {
    state
  }
};

export default connect(mapStateToProps, { findAll })(DesejosList);