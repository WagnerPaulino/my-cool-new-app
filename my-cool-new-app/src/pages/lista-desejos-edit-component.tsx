import React, { useEffect, useState } from 'react';
import { findOne, save, excluir } from '../actions/desejos-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm, Controller } from "react-hook-form";
import { ListaDesejos } from '../models/ListaDesejos';
import Container from '@material-ui/core/Container/Container';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';
import { FieldsErrors } from '../components/FieldsErrors';

export function ListaDesejosEditComponent({ match, history }: any) {

    const listaDesejo = useSelector((state: any) => state.desejo.listaDesejo);
    const dispatch = useDispatch();
    const [desejo, setDesejo] = useState<ListaDesejos>(listaDesejo);
    let id = match?.params?.key ? match?.params?.key : undefined;

    const { control, handleSubmit, errors, reset } = useForm<ListaDesejos>({ defaultValues: desejo, reValidateMode: 'onChange' });

    const onSubmit = (data: ListaDesejos | any) => {
        dispatch(save(data, history));
    }

    useEffect(() => {
        if (id) {
            dispatch(findOne(id));
        }
    }, [id, dispatch]);

    useEffect(() => {
        if (listaDesejo?._id) {
            setDesejo(listaDesejo);
            reset(listaDesejo);
        }
    }, [listaDesejo, setDesejo, reset]);

    return (
        <div>
            <Container maxWidth="sm">
                <h3>Desejo</h3>
                {/* Nome */}
                <Controller control={control} defaultValue={desejo?.nome} rules={{
                    required: {
                        value: true,
                        message: "O campo nome é obrigatorio"
                    }
                }} name="nome" render={({ onChange, onBlur, value }) => (
                    <TextField style={inputStyle} name="nome" label="Nome" value={value} onChange={onChange} onBlur={onBlur}></TextField>
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
                    <TextField style={inputStyle} name="preco" label="Preço" value={value?.toString()} onChange={onChange} onBlur={onBlur}></TextField>
                )
                } />
                <FieldsErrors field={errors.preco} />
                {
                    !desejo?._id ?
                        <Button style={buttonStyle} variant="contained" color="primary" onClick={handleSubmit(onSubmit)}>
                            Salvar
                        </Button>
                        : <div>
                            <Button style={buttonStyle} variant="outlined" color="primary" onClick={() => dispatch(excluir(desejo, history))}>
                                Realizado
                            </Button>
                        </div>
                }
            </Container>
        </div>
    )
}

const inputStyle = {
    width: '100%'
};

const buttonStyle = {
    display: 'block'
};
