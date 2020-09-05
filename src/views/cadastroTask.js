import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import TaskService from '../app/service/taskService'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class CadastroTask extends React.Component {

    constructor() {
        super();
        this.taskService = new TaskService();
    }

    state = {
        id: null,
        titulo: '',
        descricao: '',
        status: 'PENDENTE',
        disableConcluido: true,
        disablePendente: true
    }

    componentWillMount() {
        const task = { id: this.props.match.params.task }
        if (task.id) {
            this.taskService.buscarPorId(task)
                .then(response => {
                    this.setState({
                        id: response.data.id,
                        titulo: response.data.titulo,
                        descricao: response.data.descricao,
                        status: response.data.status,
                        disableConcluido: false,
                        disablePendente: false
                    })
                }).catch(error => {
                    mensagemErro(error.response.data)
                })
        }
    }

    salvar = () => {
        const task = {
            titulo: this.state.titulo,
            descricao: this.state.descricao,
            status: this.state.status
        }
        this.taskService.salvar(task)
            .then(response => {
                mensagemSucesso('Task cadastrado com sucesso!')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    cancelar = () => {
        this.props.history.push('/lista-task')
    }

    render(a) {
        return (
            <>
                <Card title="Cadastro de task">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">

                                <FormGroup label="Título: *" htmlFor="inputTitulo">
                                    <input type="text"
                                        id="inputTitulo"
                                        className="form-control"
                                        name="nome"
                                        value={this.state.titulo}
                                        maxLength="100"
                                        onChange={e => this.setState({ titulo: e.target.value })} />
                                </FormGroup>

                                <FormGroup label="Descricao:" htmlFor="inputDescricao">
                                    <textarea rows="3"
                                        id="inputDescricao"
                                        className="form-control"
                                        name="nome"
                                        value={this.state.descricao}
                                        maxLength="200"
                                        onChange={e => this.setState({ descricao: e.target.value })} />
                                </FormGroup>

                                <div className="form-group">
                                    <div className="custom-control custom-radio">
                                        <input type="radio"
                                            id="customRadio1"
                                            name="customRadio"
                                            className="custom-control-input"
                                            value="CONCLUIDO"
                                            checked={this.state.status==="CONCLUIDO"}
                                            disabled={this.state.disableConcluido}
                                            onChange={e => this.setState({ status: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="customRadio1">Concluído</label>
                                    </div>
                                    <div className="custom-control custom-radio">
                                        <input type="radio"
                                            id="customRadio2"
                                            name="customRadio"
                                            className="custom-control-input"
                                            value="PENDENTE"
                                            checked={this.state.status==="PENDENTE"}
                                            disabled={this.state.disablePendente}
                                            onChange={e => this.setState({ status: e.target.value })} />
                                        <label className="custom-control-label" htmlFor="customRadio2">Pendente</label>
                                    </div>
                                </div>

                                <button onClick={this.salvar} type="button" className="btn btn-success" style={{ margin: "3px" }}>Salvar</button>
                                <button onClick={this.cancelar} type="button" className="btn btn-danger">Voltar</button>

                            </div>
                        </div>
                    </div>
                </Card>
            </>
        )
    }
}

export default withRouter(CadastroTask)