import api from "../api";

class WorkoutsStudentsService {
  async workoutsByStudentList(studentId) {   
      const response = await api.get(`/students/${studentId}/workouts`);
      return response.data;
  }
};

export default new WorkoutsStudentsService();

