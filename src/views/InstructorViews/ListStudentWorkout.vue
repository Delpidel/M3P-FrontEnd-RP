<template>
  <div class="container">
    <v-card color="#ffc107">
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-icon class="mr-2">mdi mdi-account-supervisor</v-icon>
          <h1 class="py-12">Treinos {{ studentName }}</h1>
        </div>
        <img src="@/assets/logo.svg" alt="Logo" style="height: 80px;">
      </v-card-title>
    </v-card>
    <v-toolbar color="#757575">
      <v-btn class="ml-auto"
       type="submit" 
       variant="elevated font-weight-bold" 
       size="large" 
       @click="newWorkout">
        Novo Treino
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="days" centered color="#424242">
          <v-tab v-for="(day, index) in daysOfWeek" 
          :key="index" :value="day.value" 
          :prepend-icon="day.icon">{{
            day.label }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-window v-model="days">
      <v-window-item 
      v-for="(day, index) in daysOfWeek" 
      :key="index" 
      :value="day.value">
          <v-table v-if="workoutsList.length > 0">
            <thead>
              <tr>
                <th class="head-descriptions">Exercício</th>
                <th class="head-descriptions">Peso</th>
                <th class="head-descriptions">Repetições</th>
                <th class="head-descriptions">Pausa (s)</th>
                <th class="head-descriptions">Tempo</th>
                <th class="head-descriptions">Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="workout in workoutsList" :key="workout.id">
                <td>{{ workout.exercise.description }}</td>
                <td>{{ workout.weight }} kg</td>
                <td>{{ workout.repetitions }}</td>
                <td>{{ workout.break_time }}</td>
                <td>{{ workout.time }}</td>
                <td>
                  <v-btn @click="updateWorkout">
                    <v-icon>mdi-pencil</v-icon>
                  </v-btn>
                  <v-btn @click="deleteWorkout(workout.id)">
                    <v-icon>mdi-delete</v-icon>
                  </v-btn>
                </td>
              </tr>
            </tbody>
          </v-table>
          <div v-else 
          class="text-center py-4">
          Não há treinos para este dia.
        </div>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import InstructorListWorkoutsService from '@/services/InstructorListWorkoutsService.js'
import DeleteWorkoutService from '@/services/DeleteWorkoutService.js'

export default {
  data() {
    return {
      studentName: '',
      workoutsList: [],
      days: '',
      daysOfWeek: [
        { label: 'Segunda-feira', value: 'segunda', icon: 'mdi-arm-flex' },
        { label: 'Terça-feira', value: 'terca', icon: 'mdi-arm-flex' },
        { label: 'Quarta-feira', value: 'quarta', icon: 'mdi-arm-flex' },
        { label: 'Quinta-feira', value: 'quinta', icon: 'mdi-arm-flex' },
        { label: 'Sexta-feira', value: 'sexta', icon: 'mdi-arm-flex' },
        { label: 'Sábado', value: 'sabado', icon: 'mdi-arm-flex' },
        { label: 'Domingo', value: 'domingo', icon: 'mdi-arm-flex' }
      ]
    };
  },
  mounted() {
    this.loadWorkout();
    const currentDayIndex = new Date().getDay();
    const adjustedDayIndex = currentDayIndex === 0 ? 6 : currentDayIndex - 1;
    this.days = this.daysOfWeek[adjustedDayIndex].value;
  },
  watch: {
    days() {
      this.loadWorkout()
    }
  },
  methods: {
    async loadWorkout() {
      try {
        const studentId = this.$route.params.id;
        const response = await InstructorListWorkoutsService.ListWorkouts(studentId);
        this.studentName = response.student_name;
        const workouts = response.workouts;
        const currentDay = this.days.toUpperCase();
        if (workouts[currentDay]) {
          this.workoutsList = Object.values(workouts[currentDay]);
        } else {
          this.workoutsList = [];
        }
      } catch (error) {
        console.error('Erro ao carregar treinos:', error);
        alert('Não foi possível acessar a lista de exercícios.');
      }
    },
    newWorkout() {
      this.$router.push('/newWorkout/:id')
    },
    updateWorkout() {
      this.$router.push('/newWorkout/:id')
    },
    deleteWorkout(workoutId) {
  DeleteWorkoutService.DeleteWorkout(workoutId)
    .then(() => {
      alert("Treino excluído com sucesso!");
      this.loadWorkout();
    })
    .catch(() => {
      alert('Erro ao excluir o treino.');
    });
}
  }
}
</script>
<style scoped>
.head-descriptions {
  background-color: #424242;
  color: #ffffff;
  font-weight: bold;
  font-size: 1.1rem;
}

</style>