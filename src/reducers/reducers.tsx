import { ListaDesejosListState, ListaDesejosListType, LISTA_DESEJOS_LIST, ListaDesejosEditType, LISTA_DESEJOS_LOAD, ListaDesejosEditState, LISTA_DESEJOS_EDIT } from "../actions/types";
import { ListaDesejos } from "../models/ListaDesejos";
const initialListState: ListaDesejosListState = {
    listaDesejosList: []
}

const initialEditState: ListaDesejosEditState = {
    listaDesejos: new ListaDesejos()
}

export function listaDesejosList(state = initialListState, action: ListaDesejosListType): ListaDesejosListState {
    switch (action.type) {
        case LISTA_DESEJOS_LIST:
            return {
                listaDesejosList: state.listaDesejosList
            }
        default:
            return initialListState;
    }
}

export function listaDesejosEdit(state = initialEditState, action: ListaDesejosEditType): ListaDesejosEditState {
    switch (action.type) {
        case LISTA_DESEJOS_LOAD:
            return {
                listaDesejos: state.listaDesejos
            }
        case LISTA_DESEJOS_EDIT:
            return {
                listaDesejos: state.listaDesejos
            }
        default:
            return initialEditState;
    }
}