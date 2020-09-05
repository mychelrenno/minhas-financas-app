import React from 'react'

import { withRouter } from 'react-router-dom'
import Card from '../../components/card'
import FormGroup from '../../components/form-group'
import SelectMenu from '../../components/selectMenu'
import LancamentosTable from './lancamentosTable'
import LancamentoService from '../../app/service/lancamentoService'
import LocalStorageService from '../../app/service/localStorageService'
import * as messages from '../../components/toastr'

class ConsultaLancamentos extends React.Component {

    constructor() {
        super()
        this.lancamentoService = new LancamentoService();
    }

    state = {
        ano: '',
        mes: '',
        tipo: '',
        descricao: '',
        lancamentos: []
    }

    buscar = () => {
        if (!this.state.ano) {
            messages.mensagemErro('O preenchimento do campo ano é obrigatório');
            return false
        }

        const usuarioLogado = LocalStorageService.obterItem('_usuario_logado')

        const lancamentoFiltro = {
            ano: this.state.ano,
            mes: this.state.mes,
            tipo: this.state.tipo,
            descricao: this.state.descricao,
            usuario: usuarioLogado.id
        }
        this.lancamentoService.consultar(lancamentoFiltro)
            .then(response => {
                this.setState({ lancamentos: response.data })
            }).catch(error => {
                console.log(error)
            })
    }

    editar = (id) => {
        console.log('Editando o lançamento: ' + id);
    }

    deletar = ( lancamento ) => {
        this.lancamentoService.deletar(lancamento.id)
            .then(response => {
                const lancamentos = this.state.lancamentos;
                const index = this.state.lancamentos.indexOf(lancamento)
                lancamentos.splice(index, 1)
                this.setState({lancamentos: lancamentos})
                messages.mensagemSucesso('Lançamento deletado com sucesso.')
            }).catch(error => {
                messages.mensagemErro('Ocorreu um erro ao tentar deletar o lançamento.')
            })
    }

    render() {

        const meses = this.lancamentoService.obterListaMeses();
        const tipos = this.lancamentoService.obterListaTipos();

        return (
            <Card title="Consulta lançamentos">
                <div className="row">
                    <div className="col-md-6">
                        <div className="bs-component">
                            <FormGroup label="Ano: *" htmlFor="inputAno">
                                <input type="text"
                                    className="form-control"
                                    id="inputAno"
                                    value={this.state.ano}
                                    onChange={e => this.setState({ ano: e.target.value })}
                                    placeholder="Digite o ano" />
                            </FormGroup>

                            <FormGroup label="Mês: " htmlFor="selectMes">
                                <SelectMenu id="selectMes"
                                    className="form-control"
                                    value={this.state.mes}
                                    onChange={e => this.setState({ mes: e.target.value })}
                                    lista={meses} />
                            </FormGroup>

                            <FormGroup label="Descrição: " htmlFor="inputDescricao">
                                <input type="text"
                                    id="inputDescricao"
                                    className="form-control"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({ descricao: e.target.value })}
                                    lista={meses}
                                    placeholder="Digite uma descrição" />
                            </FormGroup>

                            <FormGroup label="Tipo: " htmlFor="selectTipos">
                                <SelectMenu id="selectTipos"
                                    className="form-control"
                                    value={this.state.tipo}
                                    onChange={e => this.setState({ tipo: e.target.value })}
                                    lista={tipos} />
                            </FormGroup>

                            <button onClick={this.buscar} type="button" className="btn btn-success">Buscar</button>
                            <button type="button" className="btn btn-danger">Cadastrar</button>
                        </div>
                    </div>
                </div>

                <br />

                <div className="row">
                    <div className="col-md-12">
                        <div className="bs-component">
                            <LancamentosTable lancamentos={this.state.lancamentos}
                                deleteAction={this.deletar}
                                editAction={this.editar} />
                        </div>
                    </div>
                </div>
            </Card>
        )
    }

}

export default withRouter(ConsultaLancamentos)