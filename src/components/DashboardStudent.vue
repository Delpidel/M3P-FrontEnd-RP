<template>
  <v-container fluid>
    <div class="container">
      <v-row>
        <v-col cols="12" md="10" offset-md="1">
          <v-card class="title-card elevation-10" flat>
            <v-card-text class="d-flex flex-column align-center">
              <div class="d-flex align-center justify-center">
                <v-icon class="mr-3" size="36">mdi-weight-lifter</v-icon>
                <h1 class="font-weight-bold my-10" :style="smAndDown ? 'text-align: center;' : ''">
                  Bem vindo, {{ profileName }}!
                </h1>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-row justify="center">
        <v-col cols="12" md="5" :class="mdAndDown ? 'my-2' : 'my-0'">
          <v-card class="user-card elevation-10" style="cursor: pointer">
            <v-card-text class="d-flex flex-column justify-end">
              <img
                src="../assets/left-card-img-woman.png"
                alt="Imagem de uma mulher praticando levantamento de peso na barra."
                class="card-image"
              />
              <div class="text-center">
                <v-card-title>Minhas Dietas</v-card-title>
                <v-card-text class="text-h3 font-weight-bold">{{ registeredMealPlans }}</v-card-text>
                <v-btn
                  @click="navigateToMealPlans"
                  append-icon="mdi-food-apple"
                  size="large"
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold my-6"
                  :class="smAndDown ? 'my-custom-small-button-class' : 'my-custom-large-button-class'"
                >
                  Visualizar
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </v-col>
        <v-col cols="12" md="5" :class="mdAndDown ? 'my-2' : 'my-0'">
          <v-card class="user-card elevation-10" style="cursor: pointer">
            <img
              src="../assets/right-card-img-man.png"
              alt="Imagem de um homem praticando levantamento de peso na barra."
              class="card-image"
            />
            <div class="text-center">
              <v-card-title>Meus Treinos</v-card-title>
              <v-card-text class="text-h3 font-weight-bold">{{ registeredWorkouts }}</v-card-text>
              <v-btn
                  @click="navigateToWorkouts"
                  append-icon="mdi-dumbbell"
                  size="large"
                  variant="elevated"
                  color="grey-darken-4 text-amber"
                  class="font-weight-bold my-6"
                  :class="smAndDown ? 'my-custom-small-button-class' : 'my-custom-large-button-class'"
                >
                Visualizar
              </v-btn>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import AuthenticationService from '../services/AuthenticationService'

export default {
  data() {
    return {
      profileName: localStorage.getItem('@name'),
      workouts: [],
      mealPlans: []
    }
  },  
  created() {
    // this.fetchStudentsData()
  },
  computed: {
    registeredMealPlans() {
      return this.mealPlans.length
    },
    registeredWorkouts() {
      return this.workouts.length
    }
  },
  methods: {
    // async fetchStudentsData() {
    //   try {
    //     const { students } = await AuthenticationService.fetchStudentsData()
    //     this.students = students
    //   } catch (error) {
    //     console.error('Erro ao buscar dados do painel de administração:', error)
    //   }
    // },
    navigateToMealPlans() {
      this.$router.push('/students/{id}/meal-plans')
    },
    navigateToWorkouts() {
      this.$router.push('/students/{id}/workouts')
    }
  }
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
}

.title-card,
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
  margin-bottom: 10px; /* Adiciona um espaço entre a imagem e o texto */
}

@media (max-width: 768px) {
  .text-h3 {
    font-size: 1.5rem;
  }
  .v-btn {
    padding: 8px 12px;
  }
  .v-row{
    padding: 0px;
  }
}
</style>
