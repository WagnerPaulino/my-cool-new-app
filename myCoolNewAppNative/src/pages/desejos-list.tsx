import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, StyleSheet, FlatList } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { ListaDesejos } from '../models/ListaDesejos';
import { findAll } from '../actions/desejos-actions';

export function DesejosList() {

  const listaDesejos: ListaDesejos[] = useSelector((state: any) => state.listaDesejos.listaDesejos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch])

  function detail(desejo: ListaDesejos) {
    Actions["desejo-edit"]({ listaDesejo: Object.assign({}, desejo) });
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={listaDesejos}
        renderItem={({ item: desejo }) => <Text key={desejo._id} style={styles.item} onPress={() => detail(desejo)}>{desejo.nome}</Text>}
        keyExtractor={(_item: ListaDesejos, index: any) => index.toString()}
      />
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
  },
  item: {
    width: '100%'
  }
});
