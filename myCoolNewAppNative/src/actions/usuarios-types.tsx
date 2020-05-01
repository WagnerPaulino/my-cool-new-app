import { Usuario } from "../models/Usuario";

export const USUARIO_CREATE = 'USUARIO_CREATE';

export const USUARIO_LOGIN_GOOGLE = 'USUARIO_LOGIN_GOOGLE';

export const USUARIO_LOGIN_USERNAME_PASSWORD = 'USUARIO_LOGIN_USERNAME_PASSWORD';

export const GET_CURRENT_USUARIO = 'GET_CURRENT_USUARIO';

export const USUARIO_IS_LOGGED = 'USUARIO_IS_LOGGED';

export const USUARIO_LOGOUT = 'USUARIO_LOGOUT';




interface UsuarioLogin {
    type?: typeof USUARIO_CREATE | typeof USUARIO_LOGIN_GOOGLE | typeof USUARIO_LOGIN_USERNAME_PASSWORD | typeof USUARIO_LOGOUT | typeof GET_CURRENT_USUARIO | typeof USUARIO_IS_LOGGED;
    auth?: Usuario;
}

export interface UsuarioLoginState {
    auth?: Usuario | any;
}

export type UsuarioLoginType = UsuarioLogin;

