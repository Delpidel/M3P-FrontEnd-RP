import api from './api'

class ExerciseService {

    async createExercises(body) {
        const response = await api.post('exercises', body)
        return response.data
    }
    async createExercise(body) {
        const response = await api.post('exercises', body, {
            headers: {
                token: localStorage.getItem('@token'),
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }

    async getAllExercises(page = '') {
        try {
            const response = await api.get(`/exercises?page=${page}&sortBy=description`, {
                headers: {
                    token: localStorage.getItem('@token'),
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (error) {
            throw new Error('Erro ao obter exercícios: ' + error.message);
        }
    }
}

export default new ExerciseService()