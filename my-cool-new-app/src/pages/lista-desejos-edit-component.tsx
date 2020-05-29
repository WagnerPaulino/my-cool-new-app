import React, { useEffect, useState } from 'react';
import { findOne, save, excluir } from '../actions/desejos-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { ListaDesejos } from '../models/ListaDesejos';
import Container from '@material-ui/core/Container/Container';
import TextField from '@material-ui/core/TextField/TextField';
import Button from '@material-ui/core/Button/Button';

export function ListaDesejosEditComponent({ match, history }: any) {

    const listaDesejo = useSelector((state: any) => state.desejo.listaDesejo);
    const dispatch = useDispatch()
    const [desejo, setDesejo] = useState(listaDesejo);
    let id = match?.params?.key ? match?.params?.key : undefined;

    const { register, handleSubmit, errors } = useForm<ListaDesejos>({ defaultValues: desejo });

    const onSubmit = (data: ListaDesejos) => {
        dispatch(save(data, history))
    }

    useEffect(() => {
        if (id) {
            dispatch(findOne(id));
        }
    }, [id, dispatch])

    useEffect(() => {
        setDesejo(listaDesejo);
    }, [listaDesejo]);

    return (
        <div>
            <Container maxWidth="sm">
                <h3>Desejo</h3>
                <TextField style={inputStyle} name="nome" label="Nome" value={desejo?.nome} inputRef={register({ required: true })}></TextField>
                {errors.nome && <span>O campo nome é obrigatorio</span>}
                <TextField style={inputStyle} name="preco" label="Preço" value={desejo?.preco} inputRef={register({ required: true })}></TextField>
                {errors.preco && <span>O campo preço é obrigatorio</span>}
                {
                    !desejo._id ?
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