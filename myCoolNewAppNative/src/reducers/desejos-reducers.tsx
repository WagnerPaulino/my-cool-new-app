import { ListaDesejosListState, ListaDesejosListType, LISTA_DESEJOS_LIST, ListaDesejosEditType, LISTA_DESEJOS_LOAD, ListaDesejosEditState, LISTA_DESEJOS_EDIT, LISTA_DESEJOS_DELETE, LISTA_DESEJOS_LIST_SEARCH } from "../actions/desejos-types";
import { ListaDesejos } from "../models/ListaDesejos";
const initialListState: ListaDesejosListState = {
    listaDesejos: []
}

const initialEditState: ListaDesejosEditState = {
    listaDesejo: new ListaDesejos()
}

export function listaDesejosList(_state = initialListState, action: ListaDesejosListType): ListaDesejosListState {
    switch (action.type) {
        case LISTA_DESEJOS_LIST:
            return {
                ...action
            }
        case LISTA_DESEJOS_LIST_SEARCH:
            return {
                ...action
            }
        default:
            return initialListState;
    }
}

export function listaDesejosEdit(_state = initialEditState, action: ListaDesejosEditType): ListaDesejosEditState {
    switch (action.type) {
        case LISTA_DESEJOS_LOAD:
            return {
                ...action
            }
        case LISTA_DESEJOS_EDIT:
            return {
                ...action
            }
        case LISTA_DESEJOS_DELETE:
            return {
                ...action
            }
        default:
            return initialEditState;
    }
}