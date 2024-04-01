import api from './api'

class StudentService {
  async gettAllStudents(text = '') {
    const response = await api.get(`students?text=${text}`)
    return response.data
  }
}

export default new StudentService()
