<template>
  <div class="container">
    <v-card>
      <h1 class="mx-3 my-3">Bem-vindo, {{ profileName }}</h1>
    </v-card>
    <div class="dashboard-cards">
      <v-card class="dashboard-card">
        <v-card-title>Exercícios Registrados</v-card-title>
        <v-card-text>{{ registeredExercises }}
        </v-card-text>
        <v-button>
          Visualizar
        </v-button>
      </v-card>
<v-card>
  <v-card v-for="(count, profile) in profiles" :key="profile" class="dashboard-card">
        <v-card-title>{{ profile }}</v-card-title>
        <v-card-text>{{ count }}</v-card-text>
      </v-card>
</v-card>

    </div>
  </div>
</template>

<script>

import axios from 'axios'

export default {
  data() {
    return {
      profileName: 'ADMIN', 
      registeredExercises: 0,
      profiles: {} 
    };
  },

  const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  timeout: 10000,
})

api.interceptors.request.use(config => {
  const token = localStorage.getItem('@token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});

  created() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
      try {
        const token = localStorage.getItem('@token');
        if (!token) {
          console.error('Token de autenticação não encontrado no localStorage.');
          return;
        }

        this.$axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await this.$axios.get('dashboard/admin');
        const data = response.data.data;
        this.registeredExercises = data.registered_exercises;
        this.profiles = data.profiles;
      } catch (error) {
        console.error('Erro ao buscar dados do painel de administração:', error);
      }
    }
  }
};
</script>

<style scoped>
.dashboard-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
}

.dashboard-card {
  width: calc(50% - 20px);
}

.v-card {
  margin-bottom: 20px;
}
</style>
