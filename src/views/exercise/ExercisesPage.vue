<template>
  <div class="container" :style="mdAndDown ? 'padding-left: 5%' : 'padding-left: 20%'">

    <div class="d-flex align-center" :style="smAndDown ? 'justify-content:center;' : ''">
      <h1 class="py-4 py-md-12 font-weight-medium">Cadastro de exercícios</h1>
      <v-icon size="x-large" class="pl-10" color="amber">mdi-weight-lifter</v-icon>
    </div>

    <div class="cardExercise">
      <div class="cardContent" :style="smAndDown ? 'flex-direction: column;  padding:8%' : 'flex-direction: row'">
        <v-form @submit.prevent="addExercise" ref="form" class="d-flex"
          :style="xs ? 'flex-direction: column;' : 'flex-direction: row'">
          <v-text-field v-model="description" label="Digite o nome do exercício" :error-messages="errors.description"
            variant="outlined" class="pl-md-2" data-test="input-description">
          </v-text-field>
          <v-btn type="submit" variant="elevated" color="grey-darken-4 text-amber"
            class="font-weight-bold px-md-16 ml-sm-5 ml-md-10 mt-2 mt-md-0" height="60px" :ripple="false"
            :style="xs ? 'height: 45px;' : 'height: 60px'" data-test="submit-button">Cadastrar</v-btn>
        </v-form>

        <div>
          <v-snackbar v-model="snackbarSuccess" :timeout="duration" color="success" location="top" data-test="snackbar">
            Cadastrado com sucesso!
          </v-snackbar>
          <v-snackbar v-model="signUpError" :timeout="duration" color="red-darken-2" location="top"  data-test="snackbar">
            O exercício já existe!
          </v-snackbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { xs, smAndDown, mdAndDown } = useDisplay()
</script>

<script>
import ExerciseService from '../../services/ExerciseService'
import { schemaExerciseForm } from '../../validations/exercise.validations'

import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'

export default {
  data() {
    return {
      description: '',
      errors: {},
      snackbarSuccess: false,
      signUpError: false,
      duration: 3000,
    }
  },
  methods: {

    addExercise() {
      try {
        const body = {
          description: this.description
        }
        schemaExerciseForm.validateSync(body, { abortEarly: false })
        this.errors = {}

        ExerciseService.createExercise(body)
          .then(() => {
            console.log('Exercício cadastrado com sucesso');
            this.snackbarSuccess = true
            this.description = ''
            this.$refs.form.reset()
          })
          .catch((error) => {
            console.log(error)
            if (error.message === 'Exercício já existe') {
              this.signUpError = true
            }
          })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          this.errors = captureErrorYup(error)
        }
      }
    }
  }
}

</script>

<style scoped>
.container {
  width: 100%;
  min-height: 100%;
}
</style>
