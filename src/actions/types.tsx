export const LISTA_DESEJOS_LIST = 'LISTA_DESEJOS_LIST'

interface ListaDesejosList {
    type: typeof LISTA_DESEJOS_LIST
    listaDesejosList: []
}

export interface ListaDesejosListState {
    listaDesejosList: [];
}

export type ListaDesejosListType = ListaDesejosList