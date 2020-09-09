import LocalStorageService from './localStorageService'

export const USUARIO_LOGADO = '_usuario_logado'

export default class AuthService {

    static isUsuarioAutenticado() {
        const usuario = LocalStorageService.obterItem(USUARIO_LOGADO)
        if (usuario && usuario.id) {
            return true;
        }
        return false;
    }

    static removerUsuarioAutenticado() {
        LocalStorageService.removerItem(USUARIO_LOGADO);
    }

    static logar(usuario) {
        LocalStorageService.adicionarItem(USUARIO_LOGADO, usuario)
    }

    static obterUsuarioAutenticado() {
        return LocalStorageService.obterItem(USUARIO_LOGADO)
    }

}