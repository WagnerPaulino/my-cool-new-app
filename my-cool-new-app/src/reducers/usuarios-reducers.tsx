import { UsuarioLoginState, UsuarioLoginType, USUARIO_CREATE, USUARIO_LOGIN_USERNAME_PASSWORD, USUARIO_LOGIN_GOOGLE, USUARIO_LOGOUT, GET_CURRENT_USUARIO, USUARIO_IS_LOGGED } from "../actions/usuarios-types";
import Firebase from "../environment/context";

const initialState: UsuarioLoginState = {
    auth: {}
}

export function authReducer(_state = initialState, action: UsuarioLoginType): UsuarioLoginState {
    const firebase = new Firebase();
    switch (action.type) {
        case USUARIO_CREATE:
            return {
                ...action
            }
        case USUARIO_LOGIN_USERNAME_PASSWORD:
            return {
                ...action
            }
        case USUARIO_LOGIN_GOOGLE:
            return {
                ...action
            }
        case USUARIO_LOGOUT:
            return {
                ...action
            }
        case GET_CURRENT_USUARIO:
            return {
                ...action
            }
        case USUARIO_IS_LOGGED:
            return {
                ...action
            }
        default:
            return { auth: { ...firebase.getCurrentAuth() } };
    }
}