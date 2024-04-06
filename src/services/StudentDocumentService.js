import api from './api'

class StudentDocumentService {
  async getDocuments(studentId) {
    const response = await api.get(`students/${studentId}/documents`)
    return response.data
  }

  async sendDocument(studentId, formData) {
    const response = await api.post(`students/${studentId}/documents`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  }
}

const studentDocumentService = new StudentDocumentService()

export default studentDocumentService
