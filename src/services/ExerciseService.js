import api from "./api"

class ExerciseService {
    
    async createExercises(body){
        const response = await api.post('exercises', body)
        return response.data
    }

    async getAllExercises(page = '') {
        const response = await api.get(`/exercises?page=${page}`)
        return response.data
    }

}

export default new ExerciseService();