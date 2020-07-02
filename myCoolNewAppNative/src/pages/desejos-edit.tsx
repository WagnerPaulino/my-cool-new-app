import React, { useEffect, useState } from 'react';
import { useForm } from "react-hook-form";
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { excluir, save } from '../actions/desejos-actions';
import { ListaDesejos } from '../models/ListaDesejos';

export function DesejosEdit({ route, navigation }) {

  const { listaDesejo } = route?.params;

  const [desejo, setDesejo] = useState(new ListaDesejos());
  useEffect(() => {
    if (listaDesejo?._id) {
      setDesejo(listaDesejo);
    }
  }, [listaDesejo])

  const { register, handleSubmit, errors, setValue } = useForm<ListaDesejos>({ defaultValues: desejo });
  const dispatch = useDispatch();

  useEffect(() => {
    register("nome", { required: true })
    register("preco", { required: true });
  })

  const onSubmit = (data: ListaDesejos | any) => {
    dispatch(save(data, navigation.goBack));
  }

  const onExcluir = () => {
    dispatch(excluir(desejo, navigation.goBack))
  }

  return (
    <Card containerStyle={{ padding: 0, margin: 0 }}>
      <Input
        key="nome"
        placeholder="Desejo"
        defaultValue={desejo?.nome}
        style={styles.inputText}
        onChangeText={(value) => setValue("nome", value)}
      />
      {errors.nome && <Text>O campo nome é obrigatorio</Text>}
      <Input
        key="preco"
        placeholder="Preço"
        defaultValue={desejo?.preco?.toString()}
        style={styles.inputText}
        onChangeText={(value) => setValue("preco", value)}
      />
      {errors.preco && <Text>O campo preço é obrigatorio</Text>}
      {
        !desejo?._id ?
          <Button onPress={handleSubmit(onSubmit)} title="Salvar"></Button>
          :
          <Button type="outline" onPress={onExcluir} title="Realizado"></Button>
      }
    </Card>
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
  inputText: {
    width: '100%'
  }
});
