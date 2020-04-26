import React, { useEffect, useState } from 'react';
import { findOne, save, excluir } from '../actions/desejos-actions';
import { useDispatch, useSelector } from 'react-redux';

export function ListaDesejosEditComponent({ match, history }: any) {

    const listaDesejo = useSelector((state: any) => state.desejo.listaDesejo);
    const dispatch = useDispatch()
    const [desejo, setDesejo] = useState(listaDesejo);
    let id = match?.params?.key ? match?.params?.key : undefined;

    useEffect(() => {
        if (id) {
            dispatch(findOne(id));
        }
    }, [id, dispatch])

    useEffect(() => {
        setDesejo(listaDesejo);
    }, [listaDesejo]);

    function onChanceValueForm(event: any) {
        setDesejo({ ...desejo, [event.target.name]: event.target.value });
    }


    return (
        <div>
            <h3>Desejo</h3>
            <input name="nome" placeholder="Nome" value={desejo?.nome} onChange={(e) => onChanceValueForm(e.nativeEvent)}></input>
            <input name="preco" placeholder="Preço" value={desejo?.preco} onChange={(e) => onChanceValueForm(e.nativeEvent)}></input>
            {
                !desejo._id ?
                    <button onClick={() => dispatch(save(desejo, history))}>
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
