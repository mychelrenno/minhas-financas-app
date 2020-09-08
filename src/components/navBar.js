import React from 'react'

import NavbarItem from './navBarItem'

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

                    <a className="navbar-brand" href="https://bootswatch.com/">Minhas Finanças</a>

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
                            <NavbarItem href="#/home" label="Home" />
                            <NavbarItem href="#/usuario-cadastro" label="Usuários" />
                            <NavbarItem href="#/lancamento-consulta" label="Lançamentos" />
                            <NavbarItem href="#/login" label="Login" />
                        </ul>
                    </div>

                </nav>
            </div>
        )
    }
}

export default NavBar