import { ListaDesejosListType, LISTA_DESEJOS_LIST } from "./types";
import { ListaDesejos } from '../models/ListaDesejos';

var lista: Array<ListaDesejos> = [
    {
        key: 1, nome: 'Monitor curvo'
    },
    {
        key: 2, nome: 'Guitarra Lespaul'
    },
    {
        key: 3, nome: 'Notebook'
    }
];

export function findAll(): ListaDesejosListType {
    return {
        type: LISTA_DESEJOS_LIST,
        listaDesejosList: lista
    }
}