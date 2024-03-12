<template>
  <form @submit.prevent="handleSubmit">
    <v-card>
      <v-text-field
        v-model="email"
      />
      <v-text-field
        v-model="password"
      />

      <v-btn
        type="submit"
      >
        Log In
      </v-btn>
    </v-card>
  </form>
</template>

<script>
import api from '../services/api'

import AuthenticationService from '../services/AuthenticationService'

export default {
  data() {
    return {
      email: '',
      password: '',
    }
  },
  methods: {
    handleSubmit() {
      AuthenticationService.login({
        email: this.email,
        password: this.password
      })
        .then((data) => {
          api.defaults.headers.common['Authorization'] = `Bearer ${data.data.token}`
          localStorage.setItem('@token', data.data.token)
          localStorage.setItem('@permissions', JSON.stringify(data.data.permissions))
          localStorage.setItem('@name', data.data.name)
          this.$router.push('/home')
        })
        .catch((error) => {
          
        })
    }
  }
}
</script>