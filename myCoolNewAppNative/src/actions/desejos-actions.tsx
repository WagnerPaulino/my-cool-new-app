import { getHostBackend } from "../environment/environment";
import { ListaDesejos } from '../models/ListaDesejos';
import { LISTA_DESEJOS_DELETE, LISTA_DESEJOS_EDIT, LISTA_DESEJOS_LIST, LISTA_DESEJOS_LOAD } from "./desejos-types";
import Firebase from "../environment/context";
import { Actions } from "react-native-router-flux";

const firebase = new Firebase();

function refreshPages() {
    Actions.reset('desejo-edit');
    Actions.reset('desejos');
}

function back() {
    Actions.pop();
}

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

export function findOne(key: number): (store: any) => void {
    return (store: any) => {
        fetch(`http://${getHostBackend()}/api/lista-desejos/${key}`).then(response => response.json().then(value => store.dispatch(
            {
                type: LISTA_DESEJOS_LOAD,
                listaDesejo: value
            }
        )));
    }
}

export function save(desejo: ListaDesejos): (store: any) => void {
    const obj = { desejo: desejo, usuario: { nome: firebase.getCurrentAuth()?.currentUser?.displayName } }
    return (store: any) => {
        fetch(`http://${getHostBackend()}/api/lista-desejos/`, { method: 'POST', body: JSON.stringify(obj), headers: { "Content-Type": "application/json" } }).then(response => response.json().then(value => {
            refreshPages();
            back();
            store.dispatch({
                type: LISTA_DESEJOS_EDIT,
                listaDesejo: value
            })
        }))
    }
}

export function excluir(desejo: ListaDesejos): (store: any) => void {
    return (store: any) => {
        fetch(`http://${getHostBackend()}/api/lista-desejos/${desejo._id}`, { method: 'DELETE' }).then(() => {
            refreshPages();
            back();
            store.dispatch({
                type: LISTA_DESEJOS_DELETE,
                listaDesejo: new ListaDesejos()
            })
        })
    }
}