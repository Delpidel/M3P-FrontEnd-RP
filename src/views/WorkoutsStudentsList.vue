<template>
    <v-container>
      <h1 class="title">Treinos {{ formattedWorkouts.name }}</h1>
      <br>    
     
      <v-table>
        <thead class="header-table">
          <tr>
            <th class="text-left">Dia</th>
            <th class="text-left">Descripción</th>
            <th class="text-left">Peso</th>
            <th class="text-left">Repeticiones</th>
            <th class="text-left">Tiempo de Descanso</th> 
          </tr>
        </thead>
        <tbody>
          <template v-for="(workouts, day) in formattedWorkouts.workouts" :key="day">
            <tr v-for="(workout, index) in workouts" :key="index">
              <td>{{ day }}</td>
              <td>{{ workout.description }}</td>
              <td>{{ workout.weight }}</td>
              <td>{{ workout.repetitions }}</td>
              <td>{{ workout.break_time }}</td>    
            </tr>
          </template>
        </tbody>
      </v-table>
    </v-container>
  </template>
  
  <script>
  import WorkoutsStudentsService from '../services/WorkoutsStudentsService'
  
  export default {
    data() {
      return {
        formattedWorkouts: {
          student_id: null,
          name: null,
          workouts: {}
        }
      }
    },
  
    methods: {
      async fetchWorkoutsByStudent(studentId) {
        try {
          const data = await WorkoutsStudentsService.workoutsByStudentList(studentId);
          this.formattedWorkouts = data;
        } catch (error) {
          console.error('Error fetching workouts:', error);
          alert('Hubo un error');
        }
      }
    },
  
    mounted() {
      const studentId = this.$route.params.id;
      this.fetchWorkoutsByStudent(studentId);
    }
  }
  </script>
  
  