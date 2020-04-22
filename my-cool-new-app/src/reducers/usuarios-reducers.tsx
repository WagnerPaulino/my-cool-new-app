import { UsuarioLoginState, UsuarioLoginType, USUARIO_CREATE, USUARIO_LOGIN_USERNAME_PASSWORD, USUARIO_LOGIN_GOOGLE, USUARIO_LOGOUT, GET_CURRENT_USUARIO, USUARIO_IS_LOGGED } from "../actions/usuarios-types";
import { Usuario } from "../models/Usuario";
import Firebase from "../environment/context";

const initialState: UsuarioLoginState = {
    usuario: new Usuario()
}

export function usuarioReducer(_state = initialState, action: UsuarioLoginType): UsuarioLoginState {
    const firebase = new Firebase();
    switch (action.type) {
        case USUARIO_CREATE:
            return {
                ...action,
                logged: firebase.isLogged()
            }
        case USUARIO_LOGIN_USERNAME_PASSWORD:
            return {
                ...action,
                logged: firebase.isLogged()
            }
        case USUARIO_LOGIN_GOOGLE:
            return {
                ...action,
                logged: firebase.isLogged()
            }
        case USUARIO_LOGOUT:
            return {
                ...action,
                logged: firebase.isLogged()
            }
        case GET_CURRENT_USUARIO:
            return {
                ...action,
                logged: firebase.isLogged()
            }
        case USUARIO_IS_LOGGED:
            return {
                ...action,
                logged: firebase.isLogged()
            }
        default:
            return { usuario: { ...firebase.getCurrentUser() }, logged: firebase.isLogged() };
    }
}