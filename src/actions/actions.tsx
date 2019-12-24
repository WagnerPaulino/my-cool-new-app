import { ListaDesejosListType, LISTA_DESEJOS_LIST } from "./types";

export function findAll(lista: []): ListaDesejosListType {
    return {
        type: LISTA_DESEJOS_LIST,
        listaDesejosList: lista
    }
}