import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { StyleSheet } from 'react-native';
import { Button, Card, Input } from 'react-native-elements';
import { useDispatch, useSelector } from 'react-redux';
import { excluir, exist, save, findOne } from '../actions/desejos-actions';
import { FieldsErrors } from '../components/FieldsErrors';
import { ListaDesejos } from '../models/ListaDesejos';
import { LojaEditDialog } from '../components/loja-edit-dialog';
import { Loja } from '../models/Loja';
import { LojaDefaultDataTable } from '../components/loja-default-data-table';

export function DesejosEdit({ route, navigation }) {

  const { listaDesejo } = route?.params;
  const listaDesejoOriginal: ListaDesejos = useSelector((state: any) => state.desejo.listaDesejo);
  const [desejo, setDesejo] = useState<ListaDesejos>(listaDesejoOriginal);
  const { control, handleSubmit, errors, reset } = useForm<ListaDesejos>({ defaultValues: desejo, reValidateMode: 'onChange' });
  const dispatch = useDispatch();
  const [openLojaEditDialog, setOpenLojaEditDialog] = React.useState(false);

  useEffect(() => {
    if (listaDesejo?._id) {
      dispatch(findOne(listaDesejo?._id));
    }
  }, [listaDesejo])

  useEffect(() => {
    if (listaDesejoOriginal?._id) {
      setDesejo(listaDesejoOriginal);
      reset(listaDesejoOriginal);
    }
  }, [listaDesejoOriginal, setDesejo, reset]);


  const onSubmit = (data: ListaDesejos | any) => {
    dispatch(save({ ...data, lojas: desejo.lojas }, navigation.goBack));
  }

  const onExcluir = () => {
    dispatch(excluir(desejo, navigation.goBack))
  }

  const onOpenLojaEditDialog = () => {
    setOpenLojaEditDialog(true);
  }

  const onCloseLojaEditDialog = (value?: Loja) => {
    setOpenLojaEditDialog(false);
    if (value?.nome) {
      const lojas = Object.assign([], desejo.lojas || []);
      lojas.push(value);
      setDesejo(Object.assign({}, { ...desejo, lojas: lojas }));
    }
  }

  async function validateNome(nome: string) {
    if (nome.trim().length > 0) {
      return await exist(nome) ? 'Desejo com esse nome já existe' : true
    } else {
      return true;
    }
  }

  return (
    <Card containerStyle={{ padding: 0, margin: 0 }}>
      {/* Nome */}
      <Controller control={control} defaultValue={desejo?.nome || null} rules={{
        required: {
          value: true,
          message: "O campo nome é obrigatorio"
        },
        validate: async (value) => await validateNome(value)
      }} name="nome" render={({ onChange, onBlur, value }) => (
        <Input
          key="nome"
          placeholder="Desejo"
          autoFocus
          onBlur={onBlur}
          defaultValue={value}
          style={styles.fullwidth}
          onChangeText={value => onChange(value)}
        />
      )
      } />
      <FieldsErrors field={errors.nome} />
      {/* Preço */}
      <Controller control={control} defaultValue={desejo?.preco || null} rules={{
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
          style={styles.fullwidth}
          onChangeText={value => onChange(value)}
        />
      )} />
      <FieldsErrors field={errors.preco} />
      {
        !desejo?._id ?
          <Button type="outline" onPress={onOpenLojaEditDialog} title="Adicionar Loja"></Button>
          : <></>
      }
      <LojaEditDialog open={openLojaEditDialog} onClose={onCloseLojaEditDialog}></LojaEditDialog>
      <LojaDefaultDataTable lojas={desejo.lojas || []} />
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
  fullwidth: {
    width: '100%'
  }
});