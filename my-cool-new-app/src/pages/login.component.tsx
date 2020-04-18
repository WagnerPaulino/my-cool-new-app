import React, { useState } from "react";
import { Usuario } from '../models/Usuario';


export function LoginComponent() {

    const [usuario, setUsuario] = useState(new Usuario());

    function onChanceValueForm(event: any) {
        setUsuario({ ...usuario, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <h1>Fazer Login</h1>
            <input name="nome" onChange={(e) => onChanceValueForm(e.nativeEvent)}></input>
            <input name="senha" onChange={(e) => onChanceValueForm(e.nativeEvent)} type="password"></input>
            <button onClick={() => console.log(usuario)}>Entrar</button>
            <button onClick={() => console.log("Entrar com google")}>Entrar usando o google</button>
        </div>
    );
}
