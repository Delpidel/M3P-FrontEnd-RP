import api from './api'

class ExerciseService {
    
    async createExercise(body) {
        
        const response = await api.post('exercises', body, {
            headers: {
                
            token:localStorage.getItem('@token'),
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}

export default new ExerciseService()
