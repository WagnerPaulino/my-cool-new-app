import Firebase from "../environment/context";
import { getAxios } from "../environment/environment";
import { ListaDesejos } from '../models/ListaDesejos';
import { LISTA_DESEJOS_DELETE, LISTA_DESEJOS_EDIT, LISTA_DESEJOS_LIST, LISTA_DESEJOS_LIST_SEARCH, LISTA_DESEJOS_LOAD } from "./desejos-types";
const firebase = new Firebase()
export function findAll(): (store: any) => void {
    return (store: any) => {
        getAxios().post('/lista-desejos/findAll', { nome: firebase.getCurrentAuth()?.currentUser?.displayName }).then(value => store.dispatch(
            {
                listaDesejos: value.data,
                type: LISTA_DESEJOS_LIST
            }
        ));
    }
}

export function findByName(nome: string): (store: any) => void {
    let body = { nome: nome }
    return (store: any) => {
        getAxios().post('/lista-desejos/find-by-nome', body).then(value => store.dispatch(
            {
                listaDesejos: value.data,
                type: LISTA_DESEJOS_LIST_SEARCH
            }
        ));
    }
}

export function findOne(key: string): (store: any) => void {
    return (store: any) => {
        getAxios().get(`/lista-desejos/${key}`).then(value => store.dispatch(
            {
                listaDesejo: value.data,
                type: LISTA_DESEJOS_LOAD
            }
        ));
    }
}

export function save(desejo: ListaDesejos, history: any): (store: any) => void {
    const obj = { desejo: desejo, usuario: { nome: firebase.getCurrentAuth()?.currentUser?.displayName } }
    return (store: any) => {
        getAxios().post('lista-desejos', obj).then(value => {
            history('/');
            store.dispatch(
                {
                    listaDesejos: value.data,
                    type: LISTA_DESEJOS_EDIT
                }
            );
        });
    }
}

export function excluir(desejo: ListaDesejos, history: any): (store: any) => void {
    return (store: any) => {
        getAxios().delete(`/lista-desejos/${desejo._id}`).then(value => {
            history('/');
            store.dispatch(
                {
                    type: LISTA_DESEJOS_DELETE,
                    listaDesejo: new ListaDesejos()
                }
            );
        });
    }
}

export async function exist(nome: string): Promise<boolean> {
    let body = { nome: nome }
    const desejos: ListaDesejos[] = (await getAxios().post("/lista-desejos/find-by-nome", body)).data;
    return desejos.length > 0;
}