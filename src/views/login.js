import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import { mensagemErro } from '../components/toastr'
import { AuthContext } from '../main/provedorAutenticacao'

class Login extends React.Component {

    state = {
        email: '',
        senha: '',
        mensagemErro: null
    }

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    entrar = () => {
        this.usuarioService.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then(response => {
            this.context.iniciarSessao(response.data)
            this.props.history.push('/home')
        })
        .catch(error => {
            mensagemErro(error.response.data)
        })
    }

    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuario')
    }

    render() {
        return (
            <div className="row">
                <div className="col-md-6"
                    style={{ position: 'relative', margin: '0 auto' }}>
                    <div className="bs-docs-section">
                        <Card title="Login">
                            <div className="row">
                                <div className="col-lg-12">
                                    <div className="bs-component">
                                        <fieldset>
                                            <FormGroup label="Email: *" htmlFor="exampleInputEmail">
                                                <input type="email"

                                                    value={this.state.email}
                                                    onChange={e => this.setState({ email: e.target.value })}

                                                    className="form-control"
                                                    id="exampleInputEmail1"
                                                    aria-describedby="emailHelp"
                                                    placeholder="Digite o Email" />
                                            </FormGroup>
                                            <FormGroup label="Senha: *" htmlFor="">
                                                <input type="password"

                                                    value={this.state.senha}
                                                    onChange={e => this.setState({ senha: e.target.value })}

                                                    className="form-control"
                                                    id="exampleInputPassword1"
                                                    placeholder="Password" />
                                            </FormGroup>
                                            <button
                                                // onClick="window.location.href='home.html'"
                                                onClick={this.entrar}
                                                className="btn btn-success"><i className="pi pi-sign-in"></i> Entrar
                                                </button>
                                            <button
                                                // onClick="window.location.href='usuarios.html'"
                                                onClick={this.prepareCadastrar}
                                                className="btn btn-danger"><i className="pi pi-plus"></i> Cadastrar
                                                </button>
                                        </fieldset>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        )
    }
}

Login.contextType = AuthContext

export default withRouter(Login)