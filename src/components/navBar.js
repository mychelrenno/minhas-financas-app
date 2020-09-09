import React from 'react'

import NavbarItem from './navBarItem'
import { AuthContext } from '../main/provedorAutenticacao'

class NavBar extends React.Component {

    state = {
        show: '',
        collapsed: 'collapsed',
        ariaExpanded: 'false'
    }

    expandirMenu = () => {
        if (this.state.show) {
            this.setState({ show: '' })
            this.setState({ collapsed: 'collapsed' })
            this.setState({ ariaExpanded: 'false' })
        } else {
            this.setState({ show: 'show' })
            this.setState({ collapsed: '' })
            this.setState({ ariaExpanded: 'true' })
        }
    }

    render() {
        return (
            <div className="container">
                <nav className="navbar navbar-expand-lg fixed-top navbar-dark bg-primary">

                    <a className="navbar-brand" href="#/home">Minhas Finanças</a>

                    <button className={`navbar-toggler ${this.state.collapsed}`}
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarColor01"
                        aria-controls="navbarColor01"
                        aria-expanded={this.state.ariaExpanded}
                        aria-label="Toggle navigation"
                        onClick={this.expandirMenu}>
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className={`navbar-collapse collapse ${this.state.show}`} id="navbarColor01">
                        <ul className="navbar-nav mr-auto">
                            <NavbarItem render={this.context.isAutenticado} href="#/home" label="Home" />
                            <NavbarItem render={this.context.isAutenticado} href="#/lancamento-consulta" label="Lançamentos" />
                            <NavbarItem render={this.context.isAutenticado} href="#/usuario-cadastro" label="Usuários" />
                            <NavbarItem render={this.context.isAutenticado} onClick={this.context.encerrarSessao} href="#/login" label="Sair" />
                        </ul>
                    </div>

                </nav>
            </div>
        )
    }
}

NavBar.contextType = AuthContext;

export default NavBar