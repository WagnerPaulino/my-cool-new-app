import { Usuario } from "./Usuario";
import { Loja } from "./Loja";

export class ListaDesejos {
    _id?: number;
    nome?: string;
    preco?: string;
    createdAt?: Date;
    usuario?: Usuario;
    lojas?: Loja[] = [];
}