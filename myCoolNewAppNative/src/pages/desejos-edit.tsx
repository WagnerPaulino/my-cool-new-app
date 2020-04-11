import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { ListaDesejos } from '../models/ListaDesejos';
import { findOne, save, excluir } from '../actions/actions';
import { Actions } from 'react-native-router-flux';

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
