import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, StyleSheet, Button } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListaDesejos } from '../models/ListaDesejos';
import { findAll } from '../actions/actions';

export function DesejosList() {

  const listaDesejos = useSelector((state: any) => state.listaDesejos.listaDesejos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch])

  function detail(desejo: ListaDesejos) {
    Actions["desejo-edit"]({ listaDesejo: Object.assign({}, desejo) });
  }
  const lista = listaDesejos.map((desejo) =>
    <Text key={desejo._id} onPress={() => detail(desejo)}>{desejo.nome}</Text>
  );
  return (
    <View style={styles.container}>
      {lista}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    width: '100%'
  }
});
