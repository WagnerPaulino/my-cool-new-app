import { ListaDesejosListType, LISTA_DESEJOS_LIST, ListaDesejosEditType, LISTA_DESEJOS_EDIT } from "./types";
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

export function findOne(key: number): ListaDesejosEditType {
    console.log(lista.filter(desejo => desejo.key == key)[0])
    return {
        type: LISTA_DESEJOS_EDIT,
        listaDesejos: lista.filter(desejo => desejo.key == key)[0]
    }
}