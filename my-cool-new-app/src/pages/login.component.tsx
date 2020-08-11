import React, { useState, useEffect, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signInWithGoogleAccount, onUserInit } from "../actions/usuario-actions";
import { FirebaseContext } from "../environment/context";


export function LoginComponent({ history }: any) {

    const authState = useSelector((store: any) => store.auth.auth);

    const [user, setUser] = useState(authState?.currentUser);
    const dispatch = useDispatch();
    
    const firebase = useContext(FirebaseContext)

    useEffect(() => {
        const subscriber = firebase.getCurrentAuth().onAuthStateChanged((user) => setUser(user));
        return subscriber;
    });

    useEffect(() => {
        if (isLogged()) {
            dispatch(onUserInit());
            history.push('/');
        }
    });

    function isLogged() {
        return user !== null && user !== undefined;
    }

    return (
        <div>
            <h1>Fazer Login</h1>
            {/* <input name="nome" placeholder="Usuario" onChange={(e) => onChanceValueForm(e.nativeEvent)}></input>
            <input name="senha" placeholder="Senha" onChange={(e) => onChanceValueForm(e.nativeEvent)} type="password"></input>
            <button onClick={() => dispatch(signInWithEmailAndPassword(user.nome, user.senha))}>Entrar</button> */}
            <button onClick={() => dispatch(signInWithGoogleAccount())}>Entrar usando o google</button>
        </div>
    );
}
