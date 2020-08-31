import React from 'react'

import Card from '../components/card'
import FromGroup from '../components/from-group'

class Login extends React.Component {

    state = {
        email: '',
        senha: ''
    }

    entrar = () => {
        console.log('Email:', this.state.email)
        console.log('Senha:', this.state.senha)
    }

    render() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-6"
                        style={{ position: 'relative', left: '300px' }}>
                        <div class="bs-docs-section">
                            <Card title="Login">
                                <div className="row">
                                    <div class="col-lg-12">
                                        <div className="bs-component">
                                            <fieldset>
                                                <FromGroup label="Email: *" htmlFor="exampleInputEmail">
                                                    <input type="email"

                                                        value={this.state.email}
                                                        onChange={e => this.setState({ email: e.target.value })}

                                                        className="form-control"
                                                        id="exampleInputEmail1"
                                                        aria-describedby="emailHelp"
                                                        placeholder="Digite o Email" />
                                                </FromGroup>
                                                <FromGroup label="Senha: *" htmlFor="">
                                                    <input type="password"

                                                        value={this.state.senha}
                                                        onChange={e => this.setState({ senha: e.target.value })}

                                                        class="form-control"
                                                        id="exampleInputPassword1"
                                                        placeholder="Password" />
                                                </FromGroup>
                                                <button
                                                    // onClick="window.location.href='home.html'"
                                                    onClick={this.entrar}
                                                    className="btn btn-success">Entrar
                                                </button>
                                                <button
                                                    onClick="window.location.href='usuarios.html'"
                                                    className="btn btn-danger">Cadastrar
                                                </button>
                                            </fieldset>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Login