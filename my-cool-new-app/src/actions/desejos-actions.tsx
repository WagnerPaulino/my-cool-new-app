import { getHostBackend } from "../environment/environment";
import { ListaDesejos } from '../models/ListaDesejos';
import { LISTA_DESEJOS_DELETE, LISTA_DESEJOS_EDIT, LISTA_DESEJOS_LIST, LISTA_DESEJOS_LOAD, LISTA_DESEJOS_LIST_SEARCH } from "./desejos-types";
import Firebase from "../environment/context";
const firebase = new Firebase()
export function findAll(): (store: any) => void {
    return (store: any) => {
        fetch(`http://${getHostBackend()}/api/lista-desejos/findAll`,
            { method: 'POST', body: JSON.stringify({ nome: firebase.getCurrentAuth()?.currentUser?.displayName }), headers: { "Content-Type": "application/json" } })
            .then(response => response.json().then(value => store.dispatch(
                {
                    listaDesejos: value,
                    type: LISTA_DESEJOS_LIST
                }
            )));
    }
}

export function findByName(nome: string): (store: any) => void {
    let body = { nome: nome }
    return (store: any) => {
        fetch(`http://${getHostBackend()}/api/lista-desejos/find-by-nome`,
            { method: 'POST', body: JSON.stringify(body), headers: { "Content-Type": "application/json" } })
            .then(response => response.json().then(value => store.dispatch(
                {
                    listaDesejos: value,
                    type: LISTA_DESEJOS_LIST_SEARCH
                }
            )));
    }
}

export function findOne(key: string): (store: any) => void {
    return (store: any) => {
        fetch(`http://${getHostBackend()}/api/lista-desejos/${key}`).then(response => response.json().then(value => store.dispatch(
            {
                type: LISTA_DESEJOS_LOAD,
                listaDesejo: value
            }
        )));
    }
}

export function save(desejo: ListaDesejos, history: any): (store: any) => void {
    const obj = { desejo: desejo, usuario: { nome: firebase.getCurrentAuth()?.currentUser?.displayName } }
    return (store: any) => {
        fetch(`http://${getHostBackend()}/api/lista-desejos/`, { method: 'POST', body: JSON.stringify(obj), headers: { "Content-Type": "application/json" } }).then(response => response.json().then(value => {
            store.dispatch({
                type: LISTA_DESEJOS_EDIT,
                listaDesejo: value
            })
            history('/')
        }))
    }
}

export function excluir(desejo: ListaDesejos, history: any): (store: any) => void {
    return (store: any) => {
        fetch(`http://${getHostBackend()}/api/lista-desejos/${desejo._id}`, { method: 'DELETE' }).then(() => {
            history('/')
            store.dispatch({
                type: LISTA_DESEJOS_DELETE,
                listaDesejo: new ListaDesejos()
            })
        })
    }
}

export async function exist(nome: string): Promise<boolean> {
    let body = { nome: nome }
    const response = await fetch(`http://${getHostBackend()}/api/lista-desejos/find-by-nome`,
        { method: 'POST', body: JSON.stringify(body), headers: { "Content-Type": "application/json" } });
    const desejos: ListaDesejos[] = await response.json();
    return desejos.length > 0;
}