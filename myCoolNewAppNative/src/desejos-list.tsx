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

    render() {
        return (
            <View style={styles.container}>
                <Text>desejos-list works!</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

  const mapStateToProps = (state) => {
    return {
      state
    }
  };
  
  export default connect(mapStateToProps, { findAll })(DesejosList);