import Firebase from "../environment/context";
import { USUARIO_CREATE, USUARIO_LOGIN_USERNAME_PASSWORD, USUARIO_LOGIN_GOOGLE, USUARIO_LOGOUT, GET_CURRENT_USUARIO, USUARIO_IS_LOGGED } from "./usuarios-types";
import { getHostBackend } from "../environment/environment";
import {
    GoogleSignin,
    GoogleSigninButton,
    statusCodes,
} from '@react-native-community/google-signin';

const firebase = new Firebase();

GoogleSignin.configure({
    scopes: ['email', 'profile'], // what API you want to access on behalf of the user, default is email and profile
    webClientId: '466887974288-9f33qjakr0b85f7rdgsi01070mjk4u1k.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
    offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
    forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
});

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
    return async (store: any) => {
        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
            store.dispatch({
                type: USUARIO_LOGIN_GOOGLE,
                usuario: userInfo
            });
        } catch (error) {
            console.log(error);
        }
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