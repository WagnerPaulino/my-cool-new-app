import { ListaDesejos } from "../models/ListaDesejos"

export const LISTA_DESEJOS_LIST = 'LISTA_DESEJOS_LIST'

interface ListaDesejosList {
    type: typeof LISTA_DESEJOS_LIST
    listaDesejosList: Array<ListaDesejos>
}

export interface ListaDesejosListState {
    listaDesejosList: Array<ListaDesejos>;
}

export type ListaDesejosListType = ListaDesejosList