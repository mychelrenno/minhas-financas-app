import React from 'react'

import Card from '../components/card'
import FormGroup from '../components/form-group'
import { withRouter } from 'react-router-dom'
import TaskService from '../app/service/taskService'
import { mensagemSucesso, mensagemErro } from '../components/toastr'

class ListaTask extends React.Component {

    constructor() {
        super();
        this.taskService = new TaskService();
    }

    state = {
        tasks: [],
        tasksDOM: []
    }

    componentWillMount() {
        this.taskService.buscar()
            .then(response => {

                this.setState({ tasks: response.data });

                this.setState({
                    tasksDOM: response.data.map(task =>
                        <tr key={task.id}>
                            <th scope="row" style={{ maxWidth: "200px" }}>{task.titulo}</th>
                            {/* <td>{task.descricao}</td> */}
                            <td>{task.status}</td>
                            <td>
                                <button type="button" className="btn btn-info btn-sm" onClick={() => this.editar(task)} value={task.id}>Editar</button>
                            </td>
                            <td>
                                <button type="button" className="btn btn-danger btn-sm" onClick={this.deletar} value={task.id}>Excluir</button>
                            </td>
                        </tr>
                    )
                });

            })
        // .catch(error => {
        //     mensagemErro(error.response.data)
        // })

    }

    deletar = (e) => {
        var taskId = e.target.value;
        this.taskService.deletar(taskId)
            .then(response => {

                for (var i = 0; i < this.state.tasksDOM.length; i++) {
                    var task = this.state.tasksDOM[i];
                    if (task.key === taskId) {
                        this.state.tasksDOM.splice(i, 1)
                        this.setState({ tasksDOM: this.state.tasksDOM })
                        break
                    }
                }

                mensagemSucesso('Task deletada com sucesso!')
            }).catch(error => {
                mensagemErro(error.response.data)
            })
    }

    editar = (task) => {
        this.props.history.push('/cadastro-task/' + task.id)
    }

    render() {

        return (
            <>
                <Card title="Lista de task">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="bs-component">

                                <FormGroup>
                                    <table className="table table-hover" >
                                        <thead>
                                            <tr>
                                                <th scope="col">Título</th>
                                                <th scope="col">Descrição</th>
                                                <th scope="col">Status</th>
                                                <th scope="col"></th>
                                                <th scope="col"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.tasksDOM}
                                        </tbody>
                                    </table>
                                </FormGroup>

                            </div>
                        </div>
                    </div>
                </Card>
            </>
        )
    }
}

export default withRouter(ListaTask)