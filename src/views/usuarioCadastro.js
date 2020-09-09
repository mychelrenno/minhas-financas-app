import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import UsuarioService from '../app/service/usuarioService'
import {mensagemSucesso, mensagemErro} from '../components/toastr'

class CadastroUsuario extends React.Component {

    constructor() {
        super();
        this.usuarioService = new UsuarioService();
    }

    state = {
        nome: '',
        email: '',
        senha: '',
        senhaRepeticao: ''
    }

    cadastrar = () => {

        const {nome, email, senha, senhaRepeticao} = this.state
        const usuario = {nome, email, senha, senhaRepeticao}

        try {
            this.usuarioService.validar(usuario)
        } catch (erro) {
            const mensagens = erro.mensagens
            mensagens.forEach(mensagem => mensagemErro(mensagem))
            return false
        }

        this.usuarioService.salvar(usuario)
        .then(response => {
            mensagemSucesso('Usuário cadastrado com sucesso! Faça o login para acessar o sistema.')
            this.props.history.push('/login')
        }).catch(error => {
            mensagemErro(error.response.data)
        })
    }

    cancelar = () => {
        window.history.back();
    }

    render() {
        return (
            <Card title="Cadastro de usuário">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="bs-component">

                            <FormGroup label="Nome: *" htmlFor="inputNome">
                                <input type="text"
                                    id="inputNome"
                                    className="form-control"
                                    name="nome"
                                    onChange={e => this.setState({ nome: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Email: *" htmlFor="inputEmail">
                                <input type="text"
                                    id="inputEmail"
                                    className="form-control"
                                    name="nome"
                                    onChange={e => this.setState({ email: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Senha: *" htmlFor="inputSenha">
                                <input type="password"
                                    className="form-control"
                                    id="inputSenha"
                                    placeholder="Password"
                                    onChange={e => this.setState({ senha: e.target.value })} />
                            </FormGroup>

                            <FormGroup label="Repita a Senha: *" htmlFor="inputRepitaSenha">
                                <input type="password"
                                    className="form-control"
                                    id="inputRepitaSenha"
                                    placeholder="Password"
                                    onChange={e => this.setState({ senhaRepeticao: e.target.value })} />
                            </FormGroup>

                            <button onClick={this.cadastrar} type="button" className="btn btn-success"><i className="pi pi-save"></i> Salvar</button>
                            <button onClick={this.cancelar} type="button" className="btn btn-danger"><i className="pi pi-times"></i> Voltar</button>

                        </div>
                    </div>
                </div>
            </Card>
        )
    }
}

export default withRouter(CadastroUsuario)