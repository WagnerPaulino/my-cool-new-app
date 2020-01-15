import { ListaDesejosListType, LISTA_DESEJOS_LIST, ListaDesejosEditType, LISTA_DESEJOS_EDIT, LISTA_DESEJOS_LOAD } from "./types";
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
    return {
        type: LISTA_DESEJOS_LOAD,
        listaDesejos: lista.filter(desejo => desejo.key?.toString() === key?.toString())[0]
    }
}

export function save(desejo: ListaDesejos, history: any): ListaDesejosEditType {
    desejo.key = Math.random();
    lista.push(desejo);
    history.push('/')
    return {
        type: LISTA_DESEJOS_EDIT,
        listaDesejos: desejo
    }
}

export function findQuestionarios(): any {
    return {
        questionarios: fetch('https://question-for-study-service.herokuapp.com/api/questionarios-simples'),
        type: 'findQuestionarios'
    }    
}