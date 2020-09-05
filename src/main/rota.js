import React from 'react'

import { Route, Switch, HashRouter } from 'react-router-dom'
import Login from '../views/login'
import Home from '../views/home'
import CadastroUsuario from '../views/cadastroUsuario'
import CadastroTask from '../views/cadastroTask'
import ListaTask from '../views/listaTask'
import ConsultaLancamentos from '../views/lancamentos/consultaLancamentos'

function Rotas() {
    return (
        <HashRouter>
            <Switch>
                <Route path="/login" component={Login} />
                <Route path="/home" component={Home} />
                <Route path="/cadastro-usuario" component={CadastroUsuario} />
                <Route path="/consulta-lancamentos" component={ConsultaLancamentos} />
                
                <Route path="/cadastro-task/:task" component={CadastroTask} />
                <Route path="/cadastro-task" component={CadastroTask} />
                <Route path="/lista-task" component={ListaTask} />
            </Switch>
        </HashRouter>
    )
}

export default Rotas