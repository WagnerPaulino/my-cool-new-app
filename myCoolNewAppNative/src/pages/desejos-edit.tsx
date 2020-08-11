import React, { useEffect, useState } from 'react';
import { useForm, FieldError, Controller } from "react-hook-form";
import { StyleSheet, Text, View } from 'react-native';
import { Input, Button, Card } from 'react-native-elements';
import { useDispatch } from 'react-redux';
import { excluir, save } from '../actions/desejos-actions';
import { ListaDesejos } from '../models/ListaDesejos';
import { FieldsErrors } from '../components/FieldsErrors';

export function DesejosEdit({ route, navigation }) {

  const { listaDesejo } = route?.params;

  const [desejo, setDesejo] = useState<ListaDesejos>(listaDesejo);
  useEffect(() => {
    if (listaDesejo?._id) {
      setDesejo(listaDesejo);
    }
  }, [listaDesejo])

  const { control, handleSubmit, errors } = useForm<ListaDesejos>({ defaultValues: desejo, reValidateMode: 'onChange' });
  const dispatch = useDispatch();

  const onSubmit = (data: ListaDesejos | any) => {
    dispatch(save(data, navigation.goBack));
  }

  const onExcluir = () => {
    dispatch(excluir(desejo, navigation.goBack))
  }

  return (
    <Card containerStyle={{ padding: 0, margin: 0 }}>
      {/* Nome */}
      <Controller control={control} defaultValue={desejo?.nome} rules={{
        required: {
          value: true,
          message: "O campo nome é obrigatorio"
        }
      }} name="nome" render={({ onChange, onBlur, value }) => (
        <Input
          key="nome"
          placeholder="Desejo"
          onBlur={onBlur}
          defaultValue={value}
          style={styles.inputText}
          onChangeText={value => onChange(value)}
        />
      )
      } />
      <FieldsErrors field={errors.nome} />
      {/* Preço */}
      <Controller control={control} defaultValue={desejo?.preco} rules={{
        required: {
          value: true,
          message: "O campo preço é obrigatorio"
        },
        pattern: {
          value: /^[0-9]+$/,
          message: 'O campo preço é numerico'
        }
      }} name="preco" render={({ onChange, onBlur, value }) => (
        <Input
          key="preco"
          placeholder="Preço"
          onBlur={onBlur}
          defaultValue={value?.toString()}
          style={styles.inputText}
          onChangeText={value => onChange(value)}
        />
      )} />
      <FieldsErrors field={errors.preco} />
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