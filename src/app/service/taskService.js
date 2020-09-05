import ApiService from '../apiService'

class taskService extends ApiService {

    constructor() {
        super('/api/tasks')
    }

    salvar(task) {
        return this.post('/', task)
    }

    buscar(task) {
        return this.get('/', task)
    }

    buscarPorId(task) {
        return this.post('/buscar', task)
    }

    deletar(task) {
        return this.delete(`/${task}`)
    }

}

export default taskService;