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

    <v-card color="#212121" class="pb-6">
      <v-toolbar color="#757575">
        <v-btn class="ml-auto" type="submit" variant="elevated font-weight-bold" size="large">
          Novo Treino
        </v-btn>

        <template v-slot:extension>
          <v-tabs v-model="dias">
            <v-tab v-for="(dia, index) in diasDaSemana" :key="index" :value="dia.toLowerCase()">{{ dia }}</v-tab>
          </v-tabs>
        </template>
      </v-toolbar>

      <v-container>
        <v-row justify="center">
          <v-col cols="12" md="8" lg="8">
            <v-card class="pa-2 mb-4" v-for="(workout, index) in listaTreinos" :key="index">
              <div class="headline">{{ workout.exercise_description }}</div>
              <div>Peso: {{ workout.weight }}</div>
              <div>Repetições: {{ workout.repetitions }}</div>
              <div>Descanso: {{ workout.break_time }}</div>
            </v-card>
            <v-card v-if="listaTreinos.length === 0" color="#212121" class="fill-height d-flex align-center justify-center">
              <v-card-text>Sem treino para este dia.</v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      studentName: '',
      studentId: this.$route.params.id,
      listaTreinos: [],
      dias: '',
      diasDaSemana: ["Segunda", "Terça", "Quarta", "Quinta", "Sexta", "Sábado", "Domingo"]
    };
  },
  mounted() {
    this.loadWorkout();
    const dataAtual = new Date();
    const diaSemana = dataAtual.getDay();
    const diasSemana = ['domingo', 'segunda', 'terca', 'quarta', 'quinta', 'sexta', 'sabado'];
    this.dias = diasSemana[diaSemana];
  },
  watch: {
    dias() {
      this.loadWorkout();
    }
  },
  methods: {
  loadWorkout() {
    const studentId = this.$route.params.id;

    // Verifica se o usuário tem permissão 'get-workouts' antes de fazer a solicitação GET
    const permissions = JSON.parse(localStorage.getItem('@permissions'));
    if (!permissions || !permissions.includes('get-workouts')) {
      alert('Você não tem permissão para acessar esta página.');
      // Ou redireciona para outra página
      this.$router.push('/outra-pagina');
      return; // Encerra a execução do método
    }

    axios.get(`http://127.0.0.1:8000/api/students/${studentId}/workouts`)
      .then(response => {
        this.studentName = response.data.student_name;
        this.listaTreinos = response.data.workouts.filter(item => item.day.toLowerCase() === this.dias);
      })
      .catch(() => {
        alert('Não foi possível acessar a lista de exercícios.');
      });
  },
}

  }
</script>
