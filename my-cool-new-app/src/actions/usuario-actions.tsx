import Firebase from "../environment/context";
import { USUARIO_CREATE, USUARIO_LOGIN_USERNAME_PASSWORD, USUARIO_LOGIN_GOOGLE, USUARIO_LOGOUT, GET_CURRENT_USUARIO, USUARIO_IS_LOGGED } from "./usuarios-types";
import { Usuario } from "../models/Usuario";
import { getHostBackend } from "../environment/environment";

const firebase = new Firebase();

export function createUserWithEmailAndPassword(username: string, password: string): (store: any) => void {
    return (store: any) => {
        firebase.doCreateUserWithEmailAndPassword(username, password).then(usuario => store.dispatch(
            {
                type: USUARIO_CREATE,
                usuario: usuario.user
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
        firebase.doSignInWithGoogleAccount().then(usuario => {
            userLogin().then(() => {
                store.dispatch({
                    type: USUARIO_LOGIN_GOOGLE,
                    usuario: usuario.user
                })
            })
        })
    }
}

export function logout(): (store: any) => void {
    return (store: any) => {
        firebase.doLogout().then(() => {
            store.dispatch({
                type: USUARIO_LOGOUT,
                usuario: undefined
            })
        })
    }
}

export function getCurrentAuth(): (store: any) => void {
    return (store: any) => {
        store.dispatch({
            type: GET_CURRENT_USUARIO,
            usuario: firebase.getCurrentAuth()
        })
    }
}

export function isLogged(): (store: any) => void {
    return (store: any) => {
        store.dispatch({
            type: USUARIO_IS_LOGGED,
            usuario: firebase.getCurrentAuth()
        })
    }
}

function userLogin() {
    return fetch(`http://${getHostBackend()}/api/login`,
        { method: 'POST', body: JSON.stringify({ nome: firebase.getCurrentAuth()?.currentUser?.displayName }), headers: { "Content-Type": "application/json" } })
}

export function onUserInit(): (store: any) => void {
    return (store: any) => {
        userLogin().then(() => {
        })
    }
}