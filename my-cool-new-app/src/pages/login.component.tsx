import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { redirectIfLogged, signInWithEmailAndPassword, signInWithGoogleAccount } from "../actions/usuario-actions";


export function LoginComponent({ history }: any) {

    const usuarioState = useSelector((store: any) => store.usuario);

    const [usuario, setUsuario] = useState(usuarioState.usuario);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(redirectIfLogged(history));
    }, [history, dispatch]);



    function onChanceValueForm(event: any) {
        setUsuario({ ...usuario, [event.target.name]: event.target.value });
    }

    return (
        <div>
            <h1>Fazer Login</h1>
            <input name="nome" placeholder="Usuario" onChange={(e) => onChanceValueForm(e.nativeEvent)}></input>
            <input name="senha" placeholder="Senha" onChange={(e) => onChanceValueForm(e.nativeEvent)} type="password"></input>
            <button onClick={() => dispatch(signInWithEmailAndPassword(usuario.nome, usuario.senha))}>Entrar</button>
            <button onClick={() => dispatch(signInWithGoogleAccount())}>Entrar usando o google</button>
        </div>
    );
}
