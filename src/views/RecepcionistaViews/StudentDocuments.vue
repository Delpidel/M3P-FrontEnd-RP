<template>
  <div class="background">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="6" class="ml-md-3">
          <v-card class="card mt-8 mx-4">
            <v-row align="center">
              <v-col cols="auto">
                <v-img
                  src="https://png.pngtree.com/png-clipart/20220919/ourmid/pngtree-document-3d-icon-png-image_6207045.png"
                  alt="Ícone de documento"
                  width="50"
                  height="50"
                ></v-img>
              </v-col>
              <v-col cols="auto">
                <h2>Documentos {{ studentName ? 'de ' + studentName : '' }}</h2>
              </v-col>
            </v-row>
            <hr />
            <br />

            <v-row class="mt-4">
              <v-col cols="6">
                <v-text-field v-model="description" label="Descrição"></v-text-field>
              </v-col>

              <v-col cols="6">
                <v-file-input
                  ref="fileInput"
                  v-model="selectedFile"
                  label="Selecione o arquivo"
                  outlined
                  accept=".pdf,.doc,.docx,.txt,.jpg,.jpeg,.png"
                ></v-file-input>
              </v-col>

              <v-col cols="12" class="text-center">
                <v-btn
                  :loading="isLoading"
                  type="submit"
                  variant="elevated"
                  color="amber"
                  class="font-weight-bold"
                  size="large"
                  @click="sendDocument"
                  >Enviar</v-btn
                >
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      description: '',
      selectedFile: null,
      studentId: null,
      isLoading: false,
      success: false,
      showError: false,
      studentName: ''
    }
  },
  methods: {
    async sendDocument() {
      if (!this.selectedFile || !this.description || !this.studentId) {
        alert('Por favor, preencha todos os campos.')
        return
      }

      const formData = new FormData()
      formData.append('title', this.description)
      formData.append('document', this.selectedFile)

      this.isLoading = true

      try {
        const response = await axios.post(
          `http://localhost:8000/api/students/${this.studentId}/documents`,
          formData
        )

        if (response.status === 200) {
          this.success = true
          this.description = ''
          this.$refs.fileInput.reset()
        } else {
          this.showError = true
        }
      } catch (error) {
        console.error('Erro ao enviar documento:', error)
        this.showError = true
      } finally {
        this.isLoading = false
      }
    },
    async fetchStudentId() {
      try {
        const studentId = parseInt(this.$route.params.id)
        if (isNaN(studentId)) {
          throw new Error('ID do estudante inválido.')
        }
        this.studentId = studentId

        const studentResponse = await axios.get(`http://localhost:8000/api/students/${studentId}`)
        if (studentResponse.status === 200) {
          const studentData = studentResponse.data
          this.studentName = studentData.name
          // Aqui você pode atribuir outros dados do aluno conforme necessário
        } else {
          throw new Error('Erro ao obter os dados do aluno da API.')
        }
      } catch (error) {
        console.error('Erro ao obter o ID do estudante:', error)
        alert('Erro ao obter os dados do aluno. Por favor, tente novamente mais tarde.')
      }
    }
  },
  created() {
    this.fetchStudentId()
  }
}
</script>

<style scoped>
.background {
  background-color: #424242;
  min-height: 100vh;
}

.card {
  background-color: whitesmoke;
  box-shadow: 0 px 32px 0 black;
  backdrop-filter: blur(13.5px);
  border-radius: 10px;
  padding: 40px;
}
</style>
