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
                  <h1 class="py-6">Atualizar Treino</h1>
                </div>
                <img src="@/assets/logo.svg" alt="Logo" style="height: 80px" />
              </v-card-title>
            </v-card>
            <v-window>
              <v-window-item>
                <v-form class="ma-5" @submit.prevent="handleSubmit" v-if="exercises && workout">
                  <v-row>
                    <v-col cols="12">
                      <v-autocomplete
                        clearable
                        label="Selecione o exercício"
                        :items="exercises"
                        item-title="description"
                        item-value="id"
                        variant="outlined"
                        v-model="workout.exercise_id"
                        data-test="selected-exercise"
                        :disabled="true"
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
                        v-model="workout.repetitions"
                        :error-messages="errors.repetitions"
                        data-test="repetitions-input"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="3">
                      <v-text-field
                        label="Carga"
                        type="number"
                        min="0"
                        variant="outlined"
                        v-model="workout.weight"
                        :error-messages="errors.weight"
                        data-test="weight-input"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-select
                        v-model="workout.break_time"
                        :items="[0, 15, 30, 45, 60, 75, 90, 105, 120]"
                        label="Selecionar pausa (em segundos)"
                        variant="outlined"
                        :error-messages="errors.break_time"
                        data-test="break-input"
                      ></v-select>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col>
                      <v-select
                        label="Dia da semana"
                        variant="outlined"
                        :items="daysOfWeek"
                        v-model="workout.day"
                        data-test="day-input"
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
                        v-model="workout.observations"
                        data-test="observations-input"
                      ></v-textarea>
                    </v-col>
                  </v-row>
                  <v-row>
                    <v-col class="text-right">
                      <v-btn
                        class="font-weight-bold mr-4"
                        type="submit"
                        variant="elevated"
                        color="amber text-grey-darken-4"
                        size="large"
                        data-test="submission-input"
                      >
                        Atualizar
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-form>
                <v-snackbar
                  v-model="snackbarSuccess"
                  :timeout="duration"
                  color="success"
                  location="top"
                >
                  {{ successMessage }}
                </v-snackbar>
                <v-snackbar
                  v-model="snackbarError"
                  :timeout="duration"
                  color="red-darken-2"
                  location="top"
                >
                  {{ errorMessage }}
                </v-snackbar>
              </v-window-item>
            </v-window>
          </v-col>
        </v-row>
      </v-main>
    </v-app>
  </div>
</template>

<script>
import * as yup from 'yup';
import UpdateWorkoutService from '../../services/InstructorServices/UpdateWorkoutService';
import GetExercises from '../../services/InstructorServices/GetExercises';

export default {
  data() {
    return {
      exercises: [],
      workout: {
        exercise_id: null,
        repetitions: '',
        weight: '',
        break_time: 45,
        day: '',
        observations: '',
      },
      daysOfWeek: ['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado', 'Domingo'],
      snackbarSuccess: false,
      snackbarError: false,
      duration: 3000,
      errors: {},
    };
  },
  async created() {
    await this.loadExercises();
    await this.loadWorkout();
  },
  methods: {
    async loadExercises() {
      try {
        const response = await GetExercises.getAllUserExercises();
        this.exercises = response.data.data;
      } catch (error) {
        console.error('Erro ao carregar exercícios:', error);
        this.showErrorMessage('Falha ao carregar os exercícios cadastrados.');
      }
    },
    async loadWorkout() {
      try {
        const workoutId = this.$route.params.workoutId;
        const response = await UpdateWorkoutService.updateWorkout(workoutId);
        this.workout = response.data; 
      } catch (error) {
        console.error('Erro ao carregar dados do treino:', error);
        this.showErrorMessage('Erro ao carregar dados do treino.');
      }
    },
    async handleSubmit() {
      try {
        const body = {
          exercise_id: this.workout.exercise_id,
          repetitions: this.workout.repetitions,
          weight: this.workout.weight,
          break_time: this.workout.break_time,
          day: this.workout.day,
          observations: this.workout.observations,
        };

        const validationResult = await yup.object().shape({
          exercise_id: yup.string().required('Selecione um exercício'),
          repetitions: yup.number().min(0, 'As repetições devem ser um número positivo').required('Digite o número de repetições'),
          weight: yup.number().min(0, 'A carga deve ser um número positivo').required('Digite a carga do exercício'),
          break_time: yup.number().required('Selecione o tempo de pausa'),
          day: yup.string().required('Selecione o dia da semana'),
          observations: yup.string(),
        }).validate(body, { abortEarly: false });

        await UpdateWorkoutService.updateWorkout(body, this.$route.params.workoutId);
        this.showSuccessMessage('Treino atualizado com sucesso!');
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          this.errors = error.inner.reduce((acc, err) => {
            acc[err.path] = err.message;
            return acc;
          }, {});
        } else {
          console.error('Erro ao atualizar treino:', error);
          this.showErrorMessage('Erro ao atualizar treino. Por favor, tente novamente.');
        }
      }
    },
    showSuccessMessage(message) {
      this.snackbarSuccess = true;
      this.successMessage = message;
    },
    showErrorMessage(message) {
      this.snackbarError = true;
      this.errorMessage = message;
    },
  },
};
</script>

<style scoped>

</style>
