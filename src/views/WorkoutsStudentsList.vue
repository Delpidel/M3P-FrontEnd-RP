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

  <v-card>
    <v-toolbar color="orange-accent-1">
      <v-toolbar-title>Treinos da Semana</v-toolbar-title>
    </v-toolbar>

    <div class="d-flex flex-row">
      <v-tabs v-model="tab" direction="horizontal" color="orange-darken-2">
        <v-tab v-for="(day, index) in days" :key="index" :value="'option-' + (index + 1)">
          <v-icon v-if="icons[index]">{{ icons[index] }}</v-icon>
          {{ day }}
        </v-tab>
      </v-tabs>
    </div>

    <br>

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
      tab: 'option-1', 
      days: ['SEGUNDA', 'TERÇA', 'QUARTA', 'QUINTA', 'SEXTA', 'SÁBADO', 'DOMINGO'],
      icons: ['mdi-run', 'mdi-dumbbell', 'mdi-gymnastics', 'mdi-bike', 'mdi-arm-flex', 'mdi-jump-rope', 'mdi-weight-lifter']
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
