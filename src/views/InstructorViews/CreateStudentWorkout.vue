<template>
  <div class="container">
    <v-app>
      <v-main class="mt-6">
        <v-row>
          <v-col>
            <v-card color="#ffc107">
              <v-card-title class="d-flex align-center justify-space-between">
                <div class="d-flex align-center">
                  <v-icon class="mr-2">mdi mdi-account-supervisor</v-icon>
                  <h1 class="py-6">Novo Treino</h1>
                </div>
                <img src="@/assets/logo.svg" alt="Logo" style="height: 80px" />
              </v-card-title>
            </v-card>
            <v-window>
              <v-window-item>
                <v-form class="ma-5" ref="addWorkoutForm" @submit.prevent="addWorkout">
                  <v-row>
                    <v-col cols="12">
                      <v-autocomplete
                        clearable
                        label="Selecione o exercício"
                        :items="exercises"
                        item-title="description"
                        item-value="id"
                        variant="outlined"
                        v-model="exercisesSelected"
                      ></v-autocomplete>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="3">
                      <v-text-field
                        label="Repetições"
                        type="number"
                        variant="outlined"
                        v-model="repetitionOfExercise"
                        :rules="repetitionOfExerciseRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="Carga"
                        type="number"
                        min="0"
                        variant="outlined"
                        v-model="exerciseLoad"
                        :rules="exerciseLoadRules"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <div class="text-caption">Pausa (em segundos)</div>
                      <v-slider
                        thumb-label="always"
                        variant="outlined"
                        v-model="breakTime"
                        :min="0"
                        :max="120"
                        :step="15"
                      ></v-slider>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-select
                        label="Dia da semana"
                        variant="outlined"
                        :items="daysOfWeek"
                        v-model="dayOfWeek"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col cols="12">
                      <v-textarea
                        clearable
                        counter
                        clear-icon="mdi-close-circle"
                        label="Observações"
                        variant="outlined"
                        v-model="observations"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-col class="text-right">
                    <v-btn
                      class="font-weight-bold mr-4"
                      type="submit"
                      variant="elevated"
                      color="amber text-grey-darken-4"
                      size="large"
                    >
                      Cadastrar
                    </v-btn>
                    <router-link to="/listagem-treinos/{{id}}/lista-treino">
                      <v-btn class="ml-auto" type="submit" variant="elevated" size="large">
                        Voltar
                      </v-btn>
                    </router-link>
                  </v-col>
                </v-form>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import axios from 'axios'
import { getCurrentDay } from '../../utils/Instructor/getCurrentDay'

export default {
  data() {
    return {
      exercises: [],
      exercisesSelected: [],
      repetitionOfExercise: '',
      exerciseLoad: '',
      breakTime: 45,
      dayOfWeek: getCurrentDay(new Date().getDay()),
      daysOfWeek: [
        { title: 'Segunda-feira', value: 'SEGUNDA' },
        { title: 'Terça-feira', value: 'TERÇA' },
        { title: 'Quarta-feira', value: 'QUARTA' },
        { title: 'Quinta-feira', value: 'QUINTA' },
        { title: 'Sexta-feira', value: 'SEXTA' },
        { title: 'Sábado', value: 'SÁBADO' },
        { title: 'Domingo', value: 'DOMINGO' }
      ],
      observations: '',
      repetitionOfExerciseRules: [
        (v) => (v && v >= 1) || 'O exercício deve ter no minimo 1 repetição'
      ],
      exerciseLoadRules: [(v) => !!v || 'É necessário uma carga para o exercício']
    }
  },
  components: {},
  mounted() {
    axios
      .get('http://localhost:8000/api/exercises/', {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('@token')}`
        }
      })
      .then((response) => {
        this.exercises = response.data.data
      })
      .catch(() => {
        alert('Falha ao carregar dados')
      })
  },

  methods: {
    async addWorkout() {
      const { valid } = await this.$refs.addWorkoutForm.validate()
      if (!valid) {
        alert('Preencha todos os dados')
        return
      } else {
        try {
          const result = await axios.post(
            'http://localhost:8000/api/workouts',
            {
              student_id: this.$route.params.id,
              exercise_id: this.exercisesSelected,
              repetitions: this.repetitionOfExercise,
              weight: this.exerciseLoad,
              break_time: this.breakTime,
              observations: this.observations,
              day: this.dayOfWeek
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('@token')}`
              }
            }
          )
          if (result.status == 201) {
            alert('Treino cadastrado com sucesso')
            this.$refs.addWorkoutForm.reset()
          }
        } catch (error) {
          if (error.response.data.message) {
            alert(error.response.data.message)
          } else {
            alert('Não foi possível cadastrar o treino neste momento')
          }
        }
      }
    }
  }
}
</script>

<style scoped></style>
