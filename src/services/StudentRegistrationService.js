import api from "./api"

class StudentRegistrationService {

    async createphotograph(formData) {
        const response = await api.post('upload', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    }
}

export default new StudentRegistrationService();