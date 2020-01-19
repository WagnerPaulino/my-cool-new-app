import { LISTA_DESEJOS_LIST, LISTA_DESEJOS_EDIT, LISTA_DESEJOS_LOAD } from "./types";
import { ListaDesejos } from '../models/ListaDesejos';

export function findAll(): (store: any) => void {

    return (store: any) => {
        fetch('http://localhost:4000/api/lista-desejos/').then(response => response.json().then(value => store.dispatch(
            {
                listaDesejos: value,
                type: LISTA_DESEJOS_LIST
            }
        )));
    }
}

export function findOne(key: number): (store: any) => void {
    return (store: any) => {
        fetch(`http://localhost:4000/api/lista-desejos/${key}`).then(response => response.json().then(value => store.dispatch(
            {
                type: LISTA_DESEJOS_LOAD,
                listaDesejo: value
            }
        )));
    }
}

export function save(desejo: ListaDesejos, history: any): (store: any) => void {
    return (store: any) => {
        fetch(`http://localhost:4000/api/lista-desejos/`, { method: 'POST', body: JSON.stringify(desejo) }).then(response => response.json().then(value => store.dispatch(
            {
                type: LISTA_DESEJOS_EDIT,
                listaDesejo: value
            })))
    }
}