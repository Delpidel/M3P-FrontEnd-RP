import api from "./api"

class UserService {
    
    async getAllUsers() {
        const response = await api.get('users')
        return response
    }

    async updateStatusUserDelete(userId, body) {
        const response = await api.put(`users/${userId}`, body)
        return response
    }
}

export default new UserService();