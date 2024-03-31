<template>
  <v-container fluid>
    <div class="container">
      <v-row class="px-16">
        <v-col cols="12" md="10" offset-md="1">
          <v-card class="title-card elevation-10" flat>
            <v-card-text class="d-flex flex-column align-center">
              <h1 class="font-weight-bold text-center">Olá, {{ userName }}!</h1>
              <h2 class="mt-2 font-weight-medium text-center">
                O sucesso de seus alunos começa com você. Vamos começar!
              </h2>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" class="px-16" >
        <v-col cols="12" md="5" class="mx-2">
          <v-card class="user-card elevation-10">
            <v-card-text class="d-flex flex-column justify-end">
              <img
              src="../../assets//instructor/dashboard/mulhercard.png"
              alt="imagem vetorizada"
              class="womanImage hidden-sm-and-down"
              
                />
              <div class="text-center">
                <div class="text-h2">{{ registeredStudents }}</div>
                <div class="text-h5 font-weight-bold">ALUNOS REGISTRADOS</div>
                <v-btn
                size="large"
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold mt-2"
                >
                  VER
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="5" class="mx-2">
          <v-card class="user-card elevation-10">
            <v-card-text class="d-flex flex-column justify-end">
              <img
              src="../../assets//instructor/dashboard/homemcard.png"
              alt="imagem vetorizada"
              class="womanImage hidden-sm-and-down"
              
                />
              <div class="text-center">
                <div class="text-h2">{{ registeredExercises }}</div>
                <div class="text-h5 font-weight-bold">EXERCÍCIOS CADASTRADOS</div>
                <v-btn
                size="large"
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold mt-2"
                >
                  VER
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
import { useDisplay } from 'vuetify';

const registeredStudents = ref(0);
const registeredExercises = ref(0);
const userName = ref('Usuário'); // Inicializa com um valor padrão

const { smAndDown, mdAndDown, lgAndDown } = useDisplay();

onMounted(async () => {
  // Busca o nome do usuário do localStorage e atribui à variável reativa userName
  userName.value = localStorage.getItem('@name') || 'Usuário';

  const token = localStorage.getItem('@token');
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard/instrutor', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      registeredStudents.value = response.data.registered_students;
      registeredExercises.value = response.data.registered_exercises;
      // Mantém a chamada API para os números dos cards, sem alterar essa parte
    } catch (error) {
      console.error('Falha ao buscar dados do instrutor:', error);
    }
  }
});

</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.title-card {
  border-radius: 1.5rem;
  background: rgb(255, 212, 80);
  background: linear-gradient(160deg, rgba(255, 212, 80, 1) 0%, rgba(222, 167, 0, 1) 100%);
  box-shadow:
    12px 16px 28px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 2px 4px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)),
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.8));
}

.user-card {
  border-radius: 1.5rem;
  background: rgb(255, 212, 80);
  background: linear-gradient(160deg, rgba(255, 212, 80, 1) 0%, rgba(222, 167, 0, 1) 100%);
  box-shadow:
    12px 16px 28px -2px var(--v-shadow-key-umbra-opacity, rgba(0, 0, 0, 0.2)),
    0px 2px 2px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.14)),
    0px 2px 4px 0px var(--v-shadow-key-penumbra-opacity, rgba(0, 0, 0, 0.12)),
    inset 1px 1px 0px 0px var(--v-shadow-key-penumbra-opacity, rgba(255, 255, 255, 0.8));
    min-height: 550px; /* Defina uma altura mínima para garantir que ambos os cards comecem com a mesma altura */
  position: relative;
  overflow: visible;
}


.card-image {
  max-width: 100%;
  height: auto;
}



</style>
