import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentoService from '../../app/service/lancamentoService'
import * as messages from '../../components/toastr'
import localStorageService from '../../app/service/localStorageService'

class LancamentoCadastro extends React.Component {

    constructor() {
        super();
        this.lancamentoService = new LancamentoService();
    }

    componentDidMount() {
        const params = this.props.match.params
        // console.log('params: ', params)
        if (params.id) {
            this.lancamentoService.obterPorId(params.id).then(response => {
                this.setState({...response.data, atualizando: true})
            }).catch(error => {
                messages.mensagemErro(error.response.data)
            })
        }
    }

    state = {
        id: null,
        descricao: '',
        valor: '',
        mes: '',
        ano: '',
        tipo: '',
        status: '',
        usuario: null,
        atualizando: false
    }

    handleChange = (event) => {
        const value = event.target.value
        const name = event.target.name

        this.setState({ [name]: value })
    }

    submit = () => {
        const usuarioLogado = localStorageService.obterItem('_usuario_logado');
        const { descricao, valor, mes, ano, tipo } = this.state
        const lancamento = { descricao, valor, mes, ano, tipo, usuario: usuarioLogado.id}

        try {
            this.lancamentoService.validar(lancamento)
        } catch (erro) {
            const mensagens = erro.mensagens
            mensagens.forEach(mensagem => messages.mensagemErro(mensagem))
            return false
        }

        this.lancamentoService.salvar(lancamento).then( response => {
            this.props.history.push('/lancamento-consulta')
            messages.mensagemSucesso('Lançamento cadastrado com sucesso.')
        }).catch(error => {
            messages.mensagemErro(error.response.data)
        })

        // console.log(lancamento)
    }

    atualizar = () => {
        const { descricao, valor, mes, ano, status, tipo, id, usuario } = this.state
        const lancamento = { descricao, valor, mes, ano, status, tipo, id, usuario}

        this.lancamentoService.atualizar(lancamento).then( response => {
            this.props.history.push('/lancamento-consulta')
            messages.mensagemSucesso('Lançamento atualizado com sucesso.')
        }).catch(error => {
            messages.mensagemErro(error.response.data)
        })
    }

    render() {

        const tipos = this.lancamentoService.obterListaTipos();
        const meses = this.lancamentoService.obterListaMeses();

        return (
            <Card title={ this.state.atualizando ? 'Atualização de lançamento' : 'Cadastro de lançamento' }>
                <div className="row">
                    <div className="col-md-12">
                        <FormGroup id="inputDescricao" label="Descrição: *">
                            <input id="inputDescricao"
                                type="text"
                                className="form-control"
                                name="descricao"
                                value={this.state.descricao}
                                onChange={this.handleChange} ></input>
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-6">
                        <FormGroup id="inputAno" label="Ano: *">
                            <input id="inputAno"
                                type="text"
                                className="form-control"
                                name="ano"
                                value={this.state.ano}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-6">
                        <FormGroup id="inputMes" label="Mês: *">
                            <SelectMenu id="meses"
                                lista={meses}
                                className="form-control"
                                name="mes"
                                value={this.state.mes}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-4">
                        <FormGroup id="inputValor" label="Valor: *">
                            <input id="inputValor"
                                type="text"
                                className="form-control"
                                name="valor"
                                value={this.state.valor}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputTipo" label="Tipo: *">
                            <SelectMenu id="inputTipo"
                                lista={tipos}
                                className="form-control"
                                name="tipo"
                                value={this.state.tipo}
                                onChange={this.handleChange} />
                        </FormGroup>
                    </div>
                    <div className="col-md-4">
                        <FormGroup id="inputStatus" label="Status: *">
                            <input id="inputStatus"
                                type="text"
                                className="form-control"
                                disabled
                                name="status"
                                value={this.state.status} />
                        </FormGroup>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6">
                        { this.state.atualizando ?
                            (<button className="btn btn-success" onClick={this.atualizar} ><i className="pi pi-refresh"></i> Atualizar</button>)
                            :
                            (<button className="btn btn-success" onClick={this.submit} ><i className="pi pi-save"></i> Salvar</button>)
                        }
                        <button className="btn btn-danger" onClick={e => this.props.history.push('/lancamento-consulta')}><i className="pi pi-times"></i> Cancelar</button>
                    </div>
                </div>
            </Card >
        )
    }
}

export default withRouter(LancamentoCadastro)