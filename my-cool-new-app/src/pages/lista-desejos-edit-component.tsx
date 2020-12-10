import Button from '@material-ui/core/Button/Button';
import Container from '@material-ui/core/Container/Container';
import TextField from '@material-ui/core/TextField/TextField';
import React, { useEffect, useState } from 'react';
import { Controller, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { excluir, exist, findOne, save } from '../actions/desejos-actions';
import { FieldsErrors } from '../components/FieldsErrors';
import { ListaDesejos } from '../models/ListaDesejos';
import { LojaEditDialog } from './loja-edit-dialog';

export function ListaDesejosEditComponent({ match, history }: any) {

    const [openLojaEditDialog, setOpenLojaEditDialog] = React.useState(false);
    const listaDesejo: ListaDesejos = useSelector((state: any) => state.desejo.listaDesejo);
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

    async function validateNome(nome: string) {
        if (nome.trim().length > 0) {
            return await exist(nome) ? 'Desejo com esse nome já existe' : true
        } else {
            return true;
        }
    }

    const onOpenLojaEditDialog = () => {
        console.log("abriu");
        setOpenLojaEditDialog(true);
    }

    const onCloseLojaEditDialog = (value?: string) => {
        console.log("fechou", value);
        setOpenLojaEditDialog(false);
    }

    return (
        <div>
            <Container maxWidth="sm">
                <h3>Desejo</h3>
                {/* Nome */}
                <Controller control={control} defaultValue={desejo?.nome} rules={{
                    required: {
                        value: true,
                        message: "O campo nome é obrigatorio"
                    },
                    validate: async (value) => await validateNome(value)
                }} name="nome" render={({ onChange, onBlur, value }) => (
                    <TextField autoFocus style={fullWidthStyle} name="nome" label="Nome" value={value} onChange={onChange} onBlur={onBlur}></TextField>
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
                    <TextField style={fullWidthStyle} name="preco" label="Preço" value={value?.toString()} onChange={onChange} onBlur={onBlur}></TextField>
                )
                } />
                <FieldsErrors field={errors.preco} />
                <Button color="primary" style={fullWidthStyle} onClick={onOpenLojaEditDialog}>Adicionar Loja</Button>
                <LojaEditDialog open={openLojaEditDialog} onClose={onCloseLojaEditDialog}></LojaEditDialog>
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

const fullWidthStyle = {
    width: '100%'
};

const buttonStyle = {
    display: 'block'
};
