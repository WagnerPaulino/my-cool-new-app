import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Text, View, StyleSheet, FlatList, Button } from 'react-native';
import { ListaDesejos } from '../models/ListaDesejos';
import { findAll } from '../actions/desejos-actions';
import { logout } from '../actions/usuario-actions';

export function DesejosList({ navigation }) {

  const listaDesejos: ListaDesejos[] = useSelector((state: any) => state.listaDesejos.listaDesejos)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch])

  function detail(desejo: ListaDesejos) {
    navigation.navigate('desejo-edit', {
      listaDesejo: Object.assign({}, desejo)
    });
  }

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      dispatch(findAll());
    });
    return unsubscribe;
  })

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
