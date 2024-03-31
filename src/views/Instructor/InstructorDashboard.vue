<template>
  <v-container fluid>
    <div class="container">
      <v-row class="px-16">
        <v-col cols="12" md="10" offset-md="1">
          <v-card class="title-card elevation-10" flat>
            <v-card-text class="d-flex flex-column align-center">
              <h1 class="font-weight-bold" :style="smAndDown ? 'text-align: center;' : ''">
                Olá, {{ userName }}!
              </h1>
              <h3 class="mt-3 font-weight-medium" :style="smAndDown ? 'text-align: center;' : ''">
                O sucesso de seus alunos começa com você. Vamos começar!
              </h3>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>

      <v-row justify="center" class="px-16">
        <v-col cols="12" md="5" class="mx-2" :class="mdAndDown ? 'my-2' : 'my-0'">
          <v-card class="user-card elevation-10">
            <v-card-text class="d-flex flex-column justify-end">
              <img
                src="../../assets/instructor/dashboard/left-card-img-woman.png"
                alt="Imagem de uma mulher praticando levantamento de peso na barra."
                class="card-image"
              />
              <div class="text-center">
                <div class="text-h5 font-weight-bold">ALUNOS<br />CADASTRADOS</div>
                <div class="text-h3 font-weight-bold">{{ registeredStudents }}</div>
                <v-btn
                  size="large"
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold"
                  :class="
                    smAndDown ? 'my-custom-small-button-class' : 'my-custom-large-button-class'
                  "
                >
                  ADICIONAR
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>

        <v-col cols="12" md="5" class="mx-2" :class="mdAndDown ? 'my-2' : 'my-0'">
          <v-card class="user-card elevation-10">
            <v-card-text class="d-flex flex-column justify-end">
              <img
                src="../../assets/instructor/dashboard/right-card-img-man.png"
                alt="Imagem de um homem praticando levantamento de peso na barra."
                class="card-image"
              />
              <div class="text-center">
                <div class="text-h5 font-weight-bold">EXERCÍCIOS<br />CADASTRADOS</div>
                <div class="text-h3 font-weight-bold">{{ registeredExercises }}</div>
                <v-btn
                  size="large"
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold"
                  :class="
                    smAndDown ? 'my-custom-small-button-class' : 'my-custom-large-button-class'
                  "
                >
                  ADICIONAR
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
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useDisplay } from 'vuetify'

const registeredStudents = ref(0)
const registeredExercises = ref(0)
const userName = ref('Instrutor')

const { smAndDown, mdAndDown, lgAndDown } = useDisplay()

onMounted(async () => {
  userName.value = localStorage.getItem('@name') || 'Instrutor'

  const token = localStorage.getItem('@token')
  if (token) {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`
    try {
      const response = await axios.get('http://localhost:8000/api/dashboard/instrutor', {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      registeredStudents.value = response.data.registered_students
      registeredExercises.value = response.data.registered_exercises
    } catch (error) {
      console.error('Falha ao buscar dados do instrutor:', error)
    }
  }
})
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.title-card {
  padding: 2rem;
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
  position: relative;
  overflow: hidden;
  min-height: auto;
}

.card-image {
  max-width: 100%;
  height: auto;
}

@media (max-width: 768px) {
  .text-h3 {
    font-size: 1.5rem; /* Menor que o tamanho padrão */
  }
  .v-btn {
    padding: 8px 12px; /* Menor espaçamento para botões em telas menores */
  }
}
</style>
