import api from "./api"

class UserService {
    
    async getAllUsers() {
        const response = await api.get('users')
        return response
    }
}

export default new UserService();