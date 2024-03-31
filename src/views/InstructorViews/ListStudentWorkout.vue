<template>
  <div class="container">
    <v-card color="#ffc107">
      <v-card-title class="d-flex align-center justify-space-between">
        <div class="d-flex align-center">
          <v-icon class="mr-2">mdi mdi-account-supervisor</v-icon>
          <h1 class="py-6">Treinos {{ studentName }}</h1>
        </div>
        <img src="@/assets/logo.svg" alt="Logo" style="height: 80px;">
      </v-card-title>
    </v-card>
    <v-toolbar color="#757575">
      <v-btn class="ml-auto" type="submit" variant="elevated font-weight-bold" size="large" @click="newWorkout">
        Novo Treino
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="days" centered>
          <v-tab v-for="(day, index) in daysOfWeek" :key="index" :value="day.value" :prepend-icon="day.icon">{{ day.label }}</v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-window v-model="days">
      <v-window-item v-for="(day, index) in daysOfWeek" :key="index" :value="day.value">
        <v-table>
          <thead>
            <tr class="text-left">
              <th>Exercício</th>
              <th>Peso</th>
              <th>Repetições</th>
              <th>Pausa (s)</th>
              <th>Tempo</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="workout in workoutsList" :key="workout.id">
              <td>{{ workout.exercise.description }}</td>
              <td>{{ workout.weight }} kg</td>
              <td>{{ workout.repetitions }}</td>
              <td>{{ workout.break_time }}</td>
              <td>{{ workout.time }}</td>
            </tr>
          </tbody>
        </v-table>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import axios from 'axios'

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
    loadWorkout() {
      const studentId = this.$route.params.id
      axios.get(`http://127.0.0.1:8000/api/students/${studentId}/workouts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`
        }
      })
        .then((response) => {
          this.studentName = response.data.student_name;
          const workouts = response.data.workouts;
          const currentDay = this.days.toUpperCase();
          if (workouts[currentDay]) {
            this.workoutsList = Object.values(workouts[currentDay]); 
          } else {
            this.workoutsList = [];
          }
        })
        .catch(() => {
          alert('Não foi possível acessar a lista de exercícios.');
        });
    },
    newWorkout() {
      this.$router.push('/newWorkout/:id')
    }
  }
}
</script>
