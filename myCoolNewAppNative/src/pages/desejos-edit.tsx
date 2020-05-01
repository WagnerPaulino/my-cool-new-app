import React, { useEffect, useState } from 'react';
import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { useDispatch } from 'react-redux';
import { excluir, save } from '../actions/desejos-actions';
import { ListaDesejos } from '../models/ListaDesejos';

export function DesejosEdit({ listaDesejo }: any) {

  const [desejo, setDesejo] = useState(new ListaDesejos());
  useEffect(() => {
    if (listaDesejo?._id) {
      setDesejo(listaDesejo);
    }
  }, [listaDesejo])

  const dispatch = useDispatch();

  function handleChange(value, field) {
    setDesejo({ ...desejo, [field]: value });
  }

  return (
    <View style={styles.container}>
      <Text>Desejo</Text>
      <TextInput key="nome" value={desejo?.nome} onChangeText={e => handleChange(e, 'nome')}></TextInput>
      <Text>Preço</Text>
      <TextInput key="preço" value={desejo?.preco?.toString()} onChangeText={e => handleChange(e, 'preco')}></TextInput>
      {
        !desejo?._id ?
          <Button onPress={() => dispatch(save(desejo))} title="Salvar"></Button>
          :
          <Button onPress={() => dispatch(excluir(desejo))} title="Realizado"></Button>
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
});
