import api from '../api'

class UserService {
  async createUser(body, config) {
    const response = await api.post('users', body, config)
    return response.data
  }

  async getOneUser(id, config) {
    const response = await api.get(`users/${id}`, config)
    return response.data
  }
}

export default new UserService()
