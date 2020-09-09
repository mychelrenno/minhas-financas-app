import React from 'react'

import { Route, Switch, HashRouter, Redirect } from 'react-router-dom'

import Login from '../views/login'
import Home from '../views/home'
import UsuarioCadastro from '../views/usuarioCadastro'
import LancamentoConsulta from '../views/lancamentos/lancamentoConsulta'
import LancamentoCadastro from '../views/lancamentos/lancamentoCadastro'
import { AuthConsumer } from '../main/provedorAutenticacao'

function RotaAutenticada({ component: Component, isUsuarioAutenticado, ...props }) {

    return (
        <Route {...props} render={(componentProps) => {
            if (isUsuarioAutenticado) {
                return (
                    <Component {...componentProps} />
                )
            } else {
                return (
                    <Redirect to={{ pathname: '/login', state: { from: componentProps.location } }} />
                )
            }
        }} />
    )
}

function Rotas(props) {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/usuario-cadastro" component={UsuarioCadastro} />

                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} exact path="/" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/home" component={Home} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/lancamento-consulta" component={LancamentoConsulta} />
                <RotaAutenticada isUsuarioAutenticado={props.isUsuarioAutenticado} path="/lancamento-cadastro/:id?" component={LancamentoCadastro} />
            </Switch>
        </HashRouter>
    )
}

export default () => (
    <AuthConsumer>
        {
            (context) => (<Rotas isUsuarioAutenticado={context.isAutenticado} />)
        }
    </AuthConsumer>
)