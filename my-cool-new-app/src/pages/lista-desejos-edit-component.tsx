import React, { useEffect, useState } from 'react';
import { findOne, save, excluir } from '../actions/desejos-actions';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from "react-hook-form";
import { ListaDesejos } from '../models/ListaDesejos';

export function ListaDesejosEditComponent({ match, history }: any) {

    const listaDesejo = useSelector((state: any) => state.desejo.listaDesejo);
    const dispatch = useDispatch()
    const [desejo, setDesejo] = useState(listaDesejo);
    let id = match?.params?.key ? match?.params?.key : undefined;

    const { register, handleSubmit, errors } = useForm<ListaDesejos>({defaultValues: desejo});

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
            <h3>Desejo</h3>
            <input name="nome" placeholder="Nome" defaultValue={desejo?.nome} ref={register({ required: true })}></input>
            {errors.nome && <span>O campo nome é obrigatorio</span>}
            <input name="preco" placeholder="Preço" value={desejo?.preco} ref={register({ required: true })}></input>
            {errors.preco && <span>O campo preço é obrigatorio</span>}
            {
                !desejo._id ?
                    <button onClick={handleSubmit(onSubmit)}>
                        Salvar
                        </button>
                    : <div>
                        <button onClick={() => dispatch(excluir(desejo, history))}>
                            Realizado
                        </button>
                    </div>
            }
        </div>
    )
}
