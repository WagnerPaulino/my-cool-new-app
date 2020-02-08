import { LISTA_DESEJOS_LIST, LISTA_DESEJOS_EDIT, LISTA_DESEJOS_LOAD, LISTA_DESEJOS_DELETE } from "./types";
import { ListaDesejos } from '../models/ListaDesejos';

export function findAll(): (store: any) => void {

    return (store: any) => {
        fetch(`http://10.0.2.2:3000/api/lista-desejos/`).then(response => response.json().then(value => store.dispatch(
            {
                listaDesejos: value,
                type: LISTA_DESEJOS_LIST
            }
        )));
    }
}

export function findOne(key: number): (store: any) => void {
    return (store: any) => {
        fetch(`http://10.0.2.2:3000/api/lista-desejos/${key}`).then(response => response.json().then(value => store.dispatch(
            {
                type: LISTA_DESEJOS_LOAD,
                listaDesejo: value
            }
        )));
    }
}

export function save(desejo: ListaDesejos, history: any): (store: any) => void {
    return (store: any) => {
        fetch(`http://10.0.2.2:3000/api/lista-desejos/`, { method: 'POST', body: JSON.stringify(desejo), headers: { "Content-Type": "application/json" } }).then(response => response.json().then(value => {
            store.dispatch({
                type: LISTA_DESEJOS_EDIT,
                listaDesejo: value
            })
            history.push('/')
        }))
    }
}

export function excluir(desejo: ListaDesejos, history: any): (store: any) => void {
    return (store: any) => {
        fetch(`http://10.0.2.2:3000/api/lista-desejos/${desejo._id}`, { method: 'DELETE' }).then(() => {
            history.push('/')
            store.dispatch({
                type: LISTA_DESEJOS_DELETE,
                listaDesejo: new ListaDesejos()
            })
        })
    }
}