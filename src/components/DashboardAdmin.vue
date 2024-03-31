<template>
  <div class="container">
    <v-card class="welcome-card">
      <v-card-title class="py-8">{{ greetingMessage }}</v-card-title>
    </v-card>

    <v-row>
      <v-col cols="12" md="6">
        <v-card class="dashboard-card">
          <v-card-title>Exercícios Registrados</v-card-title>
          <v-card-text>
            <span v-if="!showExercises">{{ registeredExercises }}</span>
            <v-list v-else>
              <v-list-item v-for="exercise in exercises" :key="exercise.id">
                <v-list-item-content>
                  <v-list-item-title>{{ exercise.description }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-card-text>
          <v-card-actions class="text-center">
            <v-btn block class="mb-8" color="#ffc107" size="large" variant="flat" @click="toggleExercises">Visualizar</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>

      <v-col cols="12" md="6">
        <v-card class="dashboard-card">
          <v-card-title>Usuários</v-card-title>
          <v-card-text>Total: {{ totalUsers }}</v-card-text>
          <v-list>
            <v-list-item v-for="(count, profile) in profiles" :key="profile">
              <v-list-item-content>
                <v-list-item-title>{{ profile }}: {{ count }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <v-card-actions class="text-center"> 
            <v-btn block class="mb-8" color="#ffc107" size="large" variant="flat" @click="navigateToCreateUser">Cadastrar Usuário</v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'

export default {
  data() {
    return {
      profileName: 'ADMIN',
      registeredExercises: 0,
      profiles: {},
      exercises: [],
      showExercises: false
    };
  },
  created() {
    this.fetchDashboardData();
  },
  methods: {
    async fetchDashboardData() {
    try {
      const { registered_exercises, profiles, exercises } = await AuthenticationService.fetchDashboardData();
      this.registeredExercises = registered_exercises;
      this.profiles = profiles;
      this.exercises = exercises;
    } catch (error) {
      console.error('Erro ao buscar dados do painel de administração:', error);
    }
  },
    toggleExercises() {
      this.showExercises = !this.showExercises;
    },
    navigateToCreateUser() {
      this.$router.push('/users/new');
    }
  },
  computed: {
    totalUsers() {
      return Object.values(this.profiles).reduce((total, count) => total + count, 0);
    },
    greetingMessage() {
      const greetings = ['Olá', 'Oi', 'Bem-vindo'];
      const randomGreeting = greetings[Math.floor(Math.random() * greetings.length)];
      return `${randomGreeting}, ${this.profileName}!`;
    }
  }
};
</script>

<style scoped>
.welcome-card {
  margin-bottom: 20px;
}

.dashboard-card {
  margin-bottom: 20px;
}
</style>
