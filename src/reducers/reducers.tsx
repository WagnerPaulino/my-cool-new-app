import { ListaDesejosListState, ListaDesejosListType, LISTA_DESEJOS_LIST } from "../actions/types";
const initialState: ListaDesejosListState = {
    listaDesejosList: []
}

export function listaDesejosList(state = initialState, action: ListaDesejosListType): ListaDesejosListState {
    switch(action.type) {
        case LISTA_DESEJOS_LIST:
            return {
                listaDesejosList: state.listaDesejosList
            }
        default:
            return initialState;
    }
}