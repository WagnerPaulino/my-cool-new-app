import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
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

  const { register, handleSubmit, errors, setValue } = useForm<ListaDesejos>({ defaultValues: desejo });
  const dispatch = useDispatch();

  useEffect(() => {
    register("nome", {required: true})
    register("preco", {required: true});
  })

  const onSubmit = (data: ListaDesejos) => {
    dispatch(save(data))
  }

  return (
    <View style={styles.container}>
      <Text>Desejo</Text>
      <TextInput key="nome" defaultValue={desejo?.nome} onChangeText={(value) => setValue("nome", value)}></TextInput>
      {errors.nome && <Text>O campo nome é obrigatorio</Text>}
      <Text>Preço</Text>
      <TextInput key="preço" defaultValue={desejo?.preco?.toString()} onChangeText={(value) => setValue("preco", value)}></TextInput>
      {errors.preco && <Text>O campo preço é obrigatorio</Text>}
      {
        !desejo?._id ?
          <Button onPress={handleSubmit(onSubmit)} title="Salvar"></Button>
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
