import React from 'react'

import { Route, Switch, HashRouter } from 'react-router-dom'
import Login from '../views/login'
import Home from '../views/home'
import UsuarioCadastro from '../views/usuarioCadastro'
import CadastroTask from '../views/cadastroTask'
import ListaTask from '../views/listaTask'
import LancamentoConsulta from '../views/lancamentos/lancamentoConsulta'
import LancamentoCadastro from '../views/lancamentos/lancamentoCadastro'

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/usuario-cadastro" component={UsuarioCadastro} />
                <Route path="/lancamento-consulta" component={LancamentoConsulta} />
                <Route path="/lancamento-cadastro" component={LancamentoCadastro} />
                
                <Route path="/cadastro-task/:task" component={CadastroTask} />
                <Route path="/cadastro-task" component={CadastroTask} />
                <Route path="/lista-task" component={ListaTask} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas