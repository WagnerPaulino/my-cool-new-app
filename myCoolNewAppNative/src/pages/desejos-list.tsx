import React, { useEffect } from 'react';
import { StyleSheet, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { findAll } from '../actions/desejos-actions';
import { ListaDesejos } from '../models/ListaDesejos';

export function DesejosList({ navigation }) {

  const listaDesejos: ListaDesejos[] = useSelector((state: any) => state.listaDesejos.listaDesejos);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(findAll());
  }, [dispatch]);

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
      {
        listaDesejos.map((desejo, i) => (
          <ListItem
            style={styles.item}
            key={i}
            bottomDivider={true}
            onPress={() => detail(desejo)}
          >
            <ListItem.Content>
              <ListItem.Title>{desejo?.nome}</ListItem.Title>
              <ListItem.Subtitle>{desejo?.preco?.toString()}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
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
