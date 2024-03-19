<template>
  <v-container>
    <h1 class="title">Treinos - {{ formattedWorkouts.name }}</h1>
   
    <v-card color="#757575" width="50%" class="px-6 py-6 mt-4 custom-card-1" elevation="10">
      <v-toolbar-title class="orange-text">HOJE : {{ currentDay }}</v-toolbar-title>
      <br>
      
      <v-table v-if="formattedWorkouts.workouts[currentDay]">
        <tbody>
          <tr v-for="(workout, index) in formattedWorkouts.workouts[currentDay]" :key="index">
            <td class="orange-checkbox"><input type="checkbox"></td>
            <td>{{ workout.description }}</td>
            <td> | {{ workout.weight }} KG </td>
            <td> | {{ workout.repetitions }} repetições </td>
            <td> | {{ workout.break_time }} min de pausa</td>
          </tr>
        </tbody>
      </v-table>
      <template v-else>
        <br>
        <p class="orange-text">Não há sessões de treinamento agendadas para hoje!</p>
      </template>
    </v-card>
    <br>

    <v-card class="custom-card" color="#757575" elevation="10" >
      <v-toolbar color="#FFC107">
        <v-toolbar-title>TREINOS DA SEMANA</v-toolbar-title>
      </v-toolbar>

      <div class="d-flex flex-row py-3 px-2" >
        <v-tabs v-model="tab" direction="horizontal" color="#FFC107">
          <v-tab v-for="(day, index) in days" :key="index" :value="'option-' + (index + 1)">
            <v-icon v-if="icons[index]">{{ icons[index] }}</v-icon>
            {{ day }}
          </v-tab>
        </v-tabs>
      </div>     

      <v-window v-model="tab">
        <v-window-item v-for="(day, index) in days" :key="index" :value="'option-' + (index + 1)">
          <v-card flat>
            <v-card-text>
              <table>
                <tr class="text-body-1" v-for="workout in formattedWorkouts.workouts[day]" :key="workout.id">
                  <td>{{ workout.description }}</td>
                  <td> | {{ workout.weight }} KG </td>
                  <td> | {{ workout.repetitions }} repetições </td>
                  <td> | {{ workout.break_time }} min de pausa</td>
                </tr>
              </table>
            </v-card-text>
          </v-card>
        </v-window-item>
      </v-window>
    </v-card>
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
      },
      today: ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'],

      tab: 'option-1', 
      days: ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO', 'DOMINGO'],
      icons: ['mdi-run', 'mdi-dumbbell', 'mdi-gymnastics', 'mdi-bike', 'mdi-arm-flex', 'mdi-jump-rope', 'mdi-weight-lifter']
    }
  },

  computed: {
    currentDay() {
      const todayIndex = new Date().getDay(); 
      return this.today[todayIndex]; 
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

<style scoped>
.orange-text {
  color: #FFC107;
}

.orange-checkbox input[type="checkbox"] {
  appearance: none;
  width: 16px;
  height: 16px;
  border: 2px solid #FFC107;
  border-radius: 3px;
}

.orange-checkbox input[type="checkbox"]:checked {
  background-color: #FFC107; /* Color de fondo cuando está seleccionado */
}

.custom-card {
  border: 2px solid #FFC107; 
  border-radius: 18px;
}

.custom-card-1 {
  border: 2px solid #757575; 
  border-radius: 18px;
}

</style>
