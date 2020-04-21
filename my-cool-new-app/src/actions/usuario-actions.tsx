import Firebase from "../environment/context";
import { USUARIO_CREATE, USUARIO_LOGIN_USERNAME_PASSWORD, USUARIO_LOGIN_GOOGLE, USUARIO_LOGOUT, GET_CURRENT_USUARIO, USUARIO_IS_LOGGED } from "./usuarios-types";
import { Usuario } from "../models/Usuario";

const firebase = new Firebase();

export function createUserWithEmailAndPassword(username: string, password: string): (store: any) => void {
    return (store: any) => {
        firebase.doCreateUserWithEmailAndPassword(username, password).then(usuario => store.dispatch(
            {
                usuario: usuario.user,
                type: USUARIO_CREATE
            }
        ));
    }
}

export function signInWithEmailAndPassword(username: string, password: string): (store: any) => void {
    return (store: any) => {
        firebase.doSignInWithEmailAndPassword(username, password).then(usuario => store.dispatch(
            {
                type: USUARIO_LOGIN_USERNAME_PASSWORD,
                usuario: usuario.user
            }
        ));
    }
}

export function signInWithGoogleAccount(): (store: any) => void {
    return (store: any) => {
        firebase.doSignInWithGoogleAccount().then(usuario =>
            store.dispatch({
                type: USUARIO_LOGIN_GOOGLE,
                listaDesejo: usuario.user
            }))
    }
}

export function logout(): (store: any) => void {
    return (store: any) => {
        firebase.doLogout().then(() => {
            store.dispatch({
                type: USUARIO_LOGOUT,
                usuario: new Usuario()
            })
        })
    }
}

export function getCurrentUser(): (store: any) => void {
    return (store: any) => {
        store.dispatch({
            type: GET_CURRENT_USUARIO,
            usuario: firebase.getCurrentUser()
        })
    }
}

export function isLogged(): (store: any) => void {
    return (store: any) => {
        store.dispatch({
            type: USUARIO_IS_LOGGED,
            usuario: { logged: firebase.isLogged() }
        })
    }
}

export function redirectIfLogged(history: any): (store: any) => void {
    return (store: any) => {
        setTimeout(() => {
            if (firebase.isLogged()) {
                history.push('/');
            }
            store.dispatch({ type: null });
        }, 1000);
    }
}