<template>
  <form @submit.prevent="handleSubmit" class="mx-auto pa-12 pb-8">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-img
        class="mx-auto my-6"
        max-width="228"
        src="../../src/assets/fit-manage-tech.svg"
        style="z-index: 9999"
      ></v-img>

      <div class="text-subtitle-1 text-medium-emphasis mt-4">Account</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="email"
        data-test="input-email"
        outlined
        :error-messages="errors.email"
        required
      />
      <span class="message-error" v-if="errors.email">{{ errors.email }}</span>

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Password
      </div>
      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye-off' : 'mdi-eye'"
        :type="visible ? 'text' : 'password'"
        density="compact"
        placeholder="Enter your password"
        prepend-inner-icon="mdi-lock-outline"
        variant="outlined"
        @click:append-inner="visible = !visible"
        v-model="password"
        data-test="input-password"
        outlined
        :error-messages="errors.password"
        required
      />
      <span class="message-error" v-if="errors.password">{{ errors.password }}</span>

      <v-alert
        v-if="showError"
        class="mb-8"
        color="error"
        closable
        title="Credenciais inválidas"
      ></v-alert>

      <v-btn
        block
        class="mb-8"
        color="#ffc107"
        size="large"
        variant="flat"
        type="submit"
        data-test="submit-button"
      >
        Login
      </v-btn>
    </v-card>
  </form>
</template>

<script>
import api from '../services/api'
import * as yup from 'yup'
import { captureErrorYup } from '../utils/captureErrorYup.js'

import AuthenticationService from '../services/AuthenticationService'

export default {
  data() {
    return {
      visible: false,
      email: '',
      password: '',
      errors: {},
      showError: false 
    }
  },
  methods: {

    handleSubmit() {
      try {
        const schema = yup.object().shape({
          email: yup.string().required('Email é obrigatório'),
          password: yup.string().required('A senha é obrigatória')
        })

        schema.validateSync(
          {
            email: this.email,
            password: this.password
          },
          { abortEarly: false }
        )
        AuthenticationService.login({
          email: this.email,
          password: this.password
        })
          .then((data) => {
            api.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`
            localStorage.setItem('@token_fitmanage', data.data.token)
            localStorage.setItem('@permissions_fitmanage', JSON.stringify(data.data.permissions))
            localStorage.setItem('@name', data.data.name)
            localStorage.setItem('@profile', data.data.profile)
            this.$router.push('/dashboard')
          })
          .catch(error => {
          // Se houver um erro na resposta, exiba a mensagem de erro
          if (error.response && error.response.status === 401) {
            // Defina showError como true para exibir o alerta de erro
            this.showError = true
          } else {
            // Defina showError como false para ocultar o alerta de erro
            this.showError = false
            // Exiba uma mensagem de erro genérica
            console.error('Ocorreu um erro ao processar sua solicitação:', error.message)
          }
        })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error)
          this.errors = captureErrorYup(error)
        }
      }
    }
  }
}
</script>
