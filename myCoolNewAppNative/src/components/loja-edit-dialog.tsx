import React, { useState } from 'react';
import { Text, StyleSheet, View, Button } from 'react-native';
import { Overlay, Input } from 'react-native-elements';
import { Loja } from '../models/Loja';
import { useForm, Controller } from 'react-hook-form';

export function LojaEditDialog(props: { onClose: (value?: any) => void, open: boolean }) {
    const { onClose, open } = props;

    const [loja, setLoja] = useState(new Loja());

    const { control, handleSubmit, errors, reset } = useForm<Loja>({ defaultValues: loja, reValidateMode: 'onChange' });

    const onSubmit = (data: Loja | any) => {
        if (onClose) {
            onClose(data);
        }
    }

    return (
        <Overlay isVisible={open} onBackdropPress={onClose}>
            <View>
                <Text>Loja para comprar</Text>
                <Controller control={control} defaultValue={loja?.nome || null} rules={{
                    required: {
                        value: true,
                        message: "O campo nome é obrigatorio"
                    }
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
                <Controller control={control} defaultValue={loja?.url || null} name="url" render={({ onChange, onBlur, value }) => (
                    <Input
                        key="url"
                        placeholder="Url"
                        onBlur={onBlur}
                        defaultValue={value}
                        style={styles.fullwidth}
                        onChangeText={value => onChange(value)}
                    />
                )
                } />
                <Button onPress={handleSubmit(onSubmit)} title="Salvar"></Button>
            </View>
        </Overlay>)
}

const styles = StyleSheet.create({
    fullwidth: {
        width: '100%'
    }
});