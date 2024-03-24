<template>
  <form @submit.prevent="handleSubmit" class="mx-auto pa-12 pb-8">
    <v-card class="mx-auto pa-12 pb-8" elevation="8" max-width="448" rounded="lg">
      <v-img
        class="mx-auto my-6"
        max-width="228"
        src="../../src/assets/fit-manage-tech.svg"
        style="z-index: 9999"
      ></v-img>

      <div class="text-subtitle-1 text-medium-emphasis mt-4">Email</div>

      <v-text-field
        density="compact"
        placeholder="Email address"
        prepend-inner-icon="mdi-email-outline"
        variant="outlined"
        v-model="email"
        data-test="input-email"
        outlined
        :error-messages="errors.email"
      />

      <div class="text-subtitle-1 text-medium-emphasis d-flex align-center justify-space-between">
        Senha
      </div>
      <v-text-field
        :append-inner-icon="visible ? 'mdi-eye' : 'mdi-eye-off'"
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
      />

      <v-snackbar v-model="showError" :timeout="5000" color="error">
        Credenciais inválidas
      </v-snackbar>

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
import router from '@/router'

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
          .then(({ data }) => {
            api.defaults.headers.common['Authorization'] = `Bearer ${data.token}`
            localStorage.setItem('@token', data.token)
            localStorage.setItem('@permissions', JSON.stringify(data.permissions))
            localStorage.setItem('@name', data.name)
            localStorage.setItem('@profile', data.profile)

            // Carrega o perfil do usuário após o login
            this.loadUserProfile()
          })
          .catch((error) => {
            if (error.response && error.response.status === 401) {
              this.showError = true
            } else {
              this.showError = false
              console.error('Ocorreu um erro ao processar sua solicitação:', error.message)
            }
          })
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error)
          this.errors = captureErrorYup(error)
        }
      }
    },
    loadUserProfile() {
      const profile = localStorage.getItem('@profile')
      let dashboardRoute = ''

      switch (profile) {
        case 'ADMIN':
          dashboardRoute = '/dashboard/admin'
          break
        case 'RECEPCIONISTA':
          dashboardRoute = '/dashboard/recepcionista'
          break
        case 'INSTRUTOR':
          dashboardRoute = '/dashboard/instrutor'
          break
        case 'NUTRICIONISTA':
          dashboardRoute = '/dashboard/nutricionista'
          break
        case 'ALUNO':
          dashboardRoute = '/dashboard/aluno'
          break
        default:
          console.error('Perfil de usuário inválido:', profile)
          break
      }

      router.push(dashboardRoute)
    }
  }
}
</script>
