<template>
  <div class="container">
    <div class="d-flex align-center" :style="smAndDown ? 'justify-content:center;' : ''">
      <h1 class="py-4 py-md-12 font-weight-medium">Cadastrar Usuário</h1>
      <v-icon size="x-large" class="pl-10" color="amber">mdi-account-outline</v-icon>
    </div>
    <div>
      <v-form ref="form" @submit.prevent="createNewUser">
        <v-row>
          <v-col cols="12" class="pt-sm-2 pb-sm-2">
            <v-select
              v-model="profile"
              label="Perfil do Usuário"
              :items="profileUsers"
              :error-messages="errors.profile"
              variant="outlined"
            ></v-select>
          </v-col>

          <v-col cols="12" class="pt-sm-2 pb-sm-2">
            <v-text-field
              v-model="name"
              label="Nome completo"
              type="text"
              variant="outlined"
              :error-messages="errors.name"
            >
            </v-text-field>
          </v-col>

          <v-col cols="12" class="pt-sm-2 pb-sm-2">
            <v-text-field
              v-model="email"
              label="E-mail"
              type="email"
              variant="outlined"
              :error-messages="errors.email"
            >
            </v-text-field>
          </v-col>

          <v-col class="d-flex justify-center pt-sm-6 pb-sm-0">
            <router-link to="/users">
              <v-btn
                variant="elevated"
                color="amber text-dark-grey-4"
                class="font-weight-bold px-sm-2 px-md-10 mr-1 mr-md-4"
                :ripple="false"
                size="large"
              >
                Voltar
              </v-btn>
            </router-link>

            <v-btn
              type="submit"
              variant="elevated"
              color="grey-darken-4 text-amber"
              class="font-weight-bold"
              :ripple="false"
              size="large"
            >
              Cadastrar
            </v-btn>
          </v-col>
        </v-row>
      </v-form>

      <v-snackbar v-model="snackbarSuccess" :timeout="duration" color="success" location="top">
        Usuário cadastrado com sucesso!
      </v-snackbar>
      <v-snackbar v-model="snackbarError" :timeout="duration" color="red-darken-2" location="top">
        {{ errorMessage }}
      </v-snackbar>
    </div>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { smAndDown } = useDisplay()
</script>

<script>
export default {
  data() {
    return {
      profileUsers: [
        { value: '2', title: 'Recepcionista' },
        { value: '3', title: 'Instrutor' },
        { value: '4', title: 'Nutricionista' }
      ],
      profile: null,
      name: '',
      email: '',

      snackbarSuccess: false,
      snackbarError: false,
      errorMessage: '',
      duration: 3000,

      errors: {}
    }
  },
  methods: {
    createNewUser() {
      //logica cadastro user
    }
  }
}
</script>
