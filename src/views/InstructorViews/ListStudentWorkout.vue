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
      <v-btn class="ml-auto" type="submit" variant="elevated font-weight-bold" size="large">
        Novo Treino
      </v-btn>

      <template v-slot:extension>
        <v-tabs v-model="tab" direction="horizontal" color="#212121">
          <v-tab v-for="(day, index) in days" :key="index" :value="'option-' + (index + 1)">
            {{ day }}
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
    <v-window v-model="tab">
      <v-window-item v-for="(day, index) in days" :key="index" :value="'option-' + (index + 1)">

        <v-card-text>
          <v-data-table :items="formattedWorkouts[day]" :headers="headers" :items-per-page="5">

            <tr class="text-body-1" v-for="workout in formattedWorkouts[day]" :key="workout.id">

              <td> {{ workout.exercise.description }}</td>
              <td> {{ workout.weight }} KG </td>
              <td> {{ workout.repetitions }} repetições </td>
              <td> {{ workout.break_time }} min de pausa</td>
            </tr>

          </v-data-table>
        </v-card-text>
      </v-window-item>
    </v-window>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      studentName: '',
      formattedWorkouts: {},
      today: ['DOMINGO', 'SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO'],
      tab: 'option-1',
      days: ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO', 'DOMINGO'],

    }
  },

  computed: {
    currentDay() {
      const todayIndex = new Date().getDay();
      return this.today[todayIndex];
    }
  },
  mounted() {
    this.fetchWorkoutsByStudent();
  },
  methods: {
    fetchWorkoutsByStudent() {
      const studentId = this.$route.params.id;

      axios.get(`http://127.0.0.1:8000/api/students/${studentId}/workouts`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`
        }
      })
        .then(response => {
          this.studentName = response.data.student_name;
          this.formattedWorkouts = response.data.workouts;
        })
        .catch(error => {
          alert('Não foi possível acessar a lista de treinos.');
        });
    }
  }


}
</script>
