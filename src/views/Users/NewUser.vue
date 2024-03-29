<template>
  <div class="container">
    <div class="d-flex align-center" :style="smAndDown ? 'justify-content:center;' : ''">
      <h1 class="py-4 py-md-12 font-weight-medium">Cadastrar Usuário</h1>
      <v-icon size="x-large" class="pl-10" color="amber">mdi-account-outline</v-icon>
    </div>
    <div class="cardImage pa-10 mt-10">
      <v-form ref="form" @submit.prevent="createNewUser">
        <v-row>
          <v-col cols="12" sm="5" md="4">
            <div :style="smAndDown ? 'display:flex; justify-content:center;' : ''">
              <ImageUploadPreview @update:selectedImage="updatePhoto" />
            </div>
            <span
              class="v-messages__message v-messages errorFile mx-5 my-3"
              tag="div"
              role="alert"
              aria-live="polite"
              id="input-13-messages"
            >
              {{ errors.photo }}
            </span>
          </v-col>

          <v-col cols="12" sm="7" md="8" class="my-auto">
            <v-row>
              <v-col cols="12" class="pt-sm-2 pb-sm-2 mt-sm-0 mt-3">
                <v-select
                  v-model="profile"
                  label="Perfil do Usuário"
                  :items="profileUsers"
                  :error-messages="errors.profile"
                  variant="outlined"
                ></v-select>
              </v-col>

              <v-col cols="12" class="pt-sm-2 pb-sm-2 my-sm-0 my-3">
                <v-text-field
                  v-model="name"
                  label="Nome completo"
                  type="text"
                  variant="outlined"
                  :error-messages="errors.name"
                >
                </v-text-field>
              </v-col>

              <v-col cols="12" class="pt-sm-2 pb-sm-2 mb-sm-0 mb-3">
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  type="email"
                  variant="outlined"
                  :error-messages="errors.email"
                >
                </v-text-field>
              </v-col>
            </v-row>
          </v-col>
        </v-row>

        <v-row class="mt-10">
          <v-col class="d-flex justify-center pt-sm-6 pb-sm-0" cols="12">
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
import ImageUploadPreview from '@/components/File/ImageUploadPreview.vue'

import * as yup from 'yup'
import { captureErrorYup } from '../../utils/captureErrorYup'

const schema = yup.object().shape({
  name: yup
    .string()
    .min(6, 'O nome deve ter no mínimo 6 caracteres.')
    .required('O nome é obrigatório.'),
  email: yup
    .string()
    .required('O campo email é obrigatório.')
    .email('O campo email deve conter um e-mail válido.'),
  profile: yup
    .string()
    .required('O perfil é obrigatório.')
    .oneOf(['2', '3', '4'], 'Selecione um perfil válido.'),
  photo: yup
    .mixed()
    .nullable()
    .test('is-image', 'O arquivo deve ser uma imagem', (value) => {
      if (!value) return true
      const mimeTypes = ['image/jpeg', 'image/jpg', 'image/png']
      return mimeTypes.some((mimeType) => value.includes(mimeType))
    })
})

export default {
  components: {
    ImageUploadPreview
  },

  data() {
    return {
      photo: null,
      profile: null,
      profileUsers: [
        { value: '2', title: 'Recepcionista' },
        { value: '3', title: 'Instrutor' },
        { value: '4', title: 'Nutricionista' }
      ],
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
    validateSync() {
      this.errors = {}
      try {
        schema.validateSync(
          {
            name: this.name,
            email: this.email,
            profile: this.profile,
            photo: this.photo
          },
          { abortEarly: false }
        )

        this.errors = {}
      } catch (error) {
        if (error instanceof yup.ValidationError) {
          console.log(error)
          this.errors = captureErrorYup(error)
          return false
        }
      }
      return true
    },

    updatePhoto(imageData) {
      this.photo = imageData
    },

    createNewUser() {
      if (this.validateSync() === false) return
    }
  }
}
</script>

<style scoped>
.cardImage {
  background-color: white;
  border-radius: 10px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.errorFile {
  color: rgb(176, 0, 32);
  opacity: 1;
  font-size: 12px;
}
</style>
