import AsyncStorage from '@react-native-community/async-storage';
import { getAxios } from "../environment/environment";
import { ListaDesejos } from '../models/ListaDesejos';
import { LISTA_DESEJOS_DELETE, LISTA_DESEJOS_EDIT, LISTA_DESEJOS_LIST, LISTA_DESEJOS_LIST_SEARCH, LISTA_DESEJOS_LOAD } from "./desejos-types";

export function findAll(): (store: any) => void {
    return (store: any) => {
        AsyncStorage.getItem('@userInfo').then(userInfo => {
            getAxios().post('/lista-desejos/findAll', { nome: JSON.parse(userInfo).user?.name }).then(value => store.dispatch(
                {
                    listaDesejos: value.data,
                    type: LISTA_DESEJOS_LIST
                }
            ));
        })
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

export function findOne(key: number): (store: any) => void {
    return (store: any) => {
        getAxios().get(`/lista-desejos/${key}`).then(value => store.dispatch(
            {
                listaDesejo: value.data,
                type: LISTA_DESEJOS_LOAD
            }
        ));
    }
}

export function save(desejo: ListaDesejos, callback = () => { }): (store: any) => void {
    return (store: any) => {
        AsyncStorage.getItem('@userInfo').then(userInfo => {
            const obj = { desejo: desejo, usuario: { nome: JSON.parse(userInfo).user?.name } }
            getAxios().post('lista-desejos', obj).then(value => {
                callback();
                store.dispatch(
                    {
                        listaDesejos: value.data,
                        type: LISTA_DESEJOS_EDIT
                    }
                );
            });
        });
    }
}

export function excluir(desejo: ListaDesejos, callback = () => { }): (store: any) => void {
    return (store: any) => {
        getAxios().delete(`/lista-desejos/${desejo._id}`).then(value => {
            callback();
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