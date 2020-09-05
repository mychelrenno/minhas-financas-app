import React from 'react'

import NavbarItem from './navBarItem'


function Navbar() {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary fixed-top">

            <a className="navbar-brand" href="https://bootswatch.com/">Minhas Finanças</a>

            <button className="navbar-toggler"
                type="button"
                data-toggle="collapse"
                data-target="#navbarColor01"
                aria-controls="navbarColor01"
                aria-expanded="true"
                aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="navbar-collapse collapse show" id="navbarColor01">
                <ul className="navbar-nav mr-auto">
                    <NavbarItem href="#/home" label="Home" />
                    <NavbarItem href="#/cadastro-usuario" label="Usuários" />
                    <NavbarItem href="#/consulta-lancamentos" label="Lançamentos" />
                    <NavbarItem href="#/login" label="Login" />
                </ul>

            </div>
        </nav>
    )
}

export default Navbar