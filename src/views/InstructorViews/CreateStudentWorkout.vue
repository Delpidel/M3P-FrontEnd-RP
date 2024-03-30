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
                <v-form
                  class="ma-5"
                  ref="addWorkoutForm"
                  @submit.prevent="handleSubmit"
                  v-if="exercises.length"
                >
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
                        min="0"
                        variant="outlined"
                        v-model="repetitionOfExercise"
                        :error-messages="errors.repetitionOfExercise"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="Carga"
                        type="number"
                        min="0"
                        variant="outlined"
                        v-model="exerciseLoad"
                        :error-messages="errors.exerciseLoad"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <!-- <div class="text-caption">Pausa (em segundos)</div>
                      <v-slider
                        thumb-label="always"
                        v-model="breakTime"
                        :min="0"
                        :max="120"
                        :step="15"
                      ></v-slider> -->
                      <v-select
                        v-model="breakTime"
                        :items="[0, 15, 30, 45, 60, 75, 90, 105, 120]"
                        label="Selecionar pausa (em segundos)"
                        variant="outlined"
                        :error-messages="errors.breakTime"
                      ></v-select>
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
import * as yup from 'yup'
import { workoutSchema } from '@/validations/InstructorValidations/workout.validations'
import { captureErrorYup } from '../../utils/captureErrorYup'

import { getCurrentDay } from '../../utils/Instructor/getCurrentDay'
import { daysOfWeek } from '../../constants/Instructor/daysOfWeek'

import GetExercises from '../../services/InstructorServices/GetExercises'
import CreateWorkoutService from '../../services/InstructorServices/CreateWorkoutService'

export default {
  data() {
    return {
      exercises: [],
      exercisesSelected: [],
      repetitionOfExercise: '',
      exerciseLoad: '',
      breakTime: 45,
      dayOfWeek: getCurrentDay(new Date().getDay()),
      daysOfWeek: daysOfWeek,
      observations: '',
      errors: []
    }
  },
  components: {},
  mounted() {
    GetExercises.getAllUserExercises()
      .then((response) => {
        this.exercises = response.data.data
      })
      .catch(() => {
        alert('Falha ao carregar dados')
      })
  },
  methods: {
    handleSubmit() {
      try {
        const body = {
          student_id: this.$route.params.id,
          exercise_id: this.exercisesSelected,
          repetitions: this.repetitionOfExercise,
          weight: this.exerciseLoad,
          break_time: this.breakTime,
          observations: this.observations,
          day: this.dayOfWeek
        }

        workoutSchema.validateSync(body, { abortEarly: false })
        this.errors = {}
        CreateWorkoutService.createWorkout(body)
          .then(() => {
            alert('Treino cadastrado com sucesso')
            this.$refs.form.reset()
          })
          // .then(() => {
          //   this.$refs.form.reset()
          // })
          .catch((error) => {
            if (error) {
              alert(error.response.data.message)
            }
          })
        // .catch((error) => {
        //   if (error) {
        //     this.signUpError = true
        //   }
        // })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          this.errors = captureErrorYup(error)
          alert(Object.values(this.errors).join('\n'))
        }
      }
    }
  }
}
</script>

<style scoped></style>
