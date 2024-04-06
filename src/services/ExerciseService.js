import api from './api'

class ExerciseService {

    async createExercise(body) {
        const response = await api.post('exercises', body, {
            headers: {
                token: localStorage.getItem('@token'),
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }

    async getAllExercises(page = 1) {
        const response = await api.get(`/exercises?page=${page}`, {
            headers: {
                token: localStorage.getItem('@token'),
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}

export default new ExerciseService()
