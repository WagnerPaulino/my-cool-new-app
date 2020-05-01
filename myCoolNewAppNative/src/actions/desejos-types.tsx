import { ListaDesejos } from "../models/ListaDesejos"

export const LISTA_DESEJOS_LIST = 'LISTA_DESEJOS_LIST'

export const LISTA_DESEJOS_EDIT = 'LISTA_DESEJOS_EDIT'

export const LISTA_DESEJOS_LOAD = 'LISTA_DESEJOS_LOAD'

export const LISTA_DESEJOS_DELETE = 'LISTA_DESEJOS_DELETE'

interface ListaDesejosList {
    type?: typeof LISTA_DESEJOS_LIST
    listaDesejos?: Array<ListaDesejos>
}

export interface ListaDesejosListState {
    listaDesejos?: Array<ListaDesejos>;
}

export type ListaDesejosListType = ListaDesejosList



interface ListaDesejosEdit {
    type?: typeof LISTA_DESEJOS_EDIT | typeof LISTA_DESEJOS_LOAD | typeof LISTA_DESEJOS_DELETE;
    listaDesejo?: ListaDesejos;
}

export interface ListaDesejosEditState {
    listaDesejo?: ListaDesejos;
}

export type ListaDesejosEditType = ListaDesejosEdit

