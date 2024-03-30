<template>
  <v-container fluid>
    <div class="container">
      <v-row class="mb-5">
        <v-col cols="12">
          <h1 class="font-weight-bold text-center">Olá, Ususario!</h1>
          <h2 class="mt-2 font-weight-medium text-center">
            O sucesso de seus alunos começa com você. Vamos começar!
          </h2>
        </v-col>
      </v-row>

      <v-row justify="space-around">
        <v-col cols="12" md="5">
          <v-card class="user-card elevation-2">
            <v-card-text>
              <div class="text-center">
                <img src="../../assets/exercises.svg" class="card-image" alt="Imagem" />
                <div class="text-h2 my-3">{{ registeredStudents }}</div>
                <div class="text-h5">Alunos Registrados</div>
                <v-btn color="black" class="mt-2">
                  <span style="color: #ffc107">VER</span>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="5">
          <v-card class="user-card elevation-2">
            <v-card-text>
              <div class="text-center">
                <img src="../../assets/exercises.svg" class="card-image" alt="Imagem" />
                <div class="text-h2 my-3">{{ registeredExercises }}</div>
                <div class="text-h5">Exercícios Cadastrados</div>
                <v-btn color="black" class="mt-2">
                  <span style="color: #ffc107">VER</span>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

const registeredStudents = ref(0);
const registeredExercises = ref(0);

onMounted(async () => {
  const token = localStorage.getItem('@token');
  try {
    const response = await axios.get('http://localhost:8000/api/dashboard/instrutor', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

    registeredStudents.value = response.data.registered_students;
    registeredExercises.value = response.data.registered_exercises;
  } catch (error) {
    console.error('Falha ao buscar dados do instrutor:', error);
  }
});
</script>

<style scoped>
.container {
  max-width: 100%;
}

.user-card {
  background: linear-gradient(to right, #ffc107, #ffa000);
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: auto;
}

.card-image {
  max-width: 100%;
  height: auto;
}
</style>
