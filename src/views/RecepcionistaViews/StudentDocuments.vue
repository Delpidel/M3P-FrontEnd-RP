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
                <h2 v-if="studentName">Documentos de {{ studentName }}</h2>
                <h2 v-else>Documentos</h2>
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

            <v-row>
              <v-col cols="12">
                <h3 class="mt-4">Documentos Cadastrados</h3>
                <v-list>
                  <v-list-item v-for="(document, index) in documents" :key="index">
                    <v-list-item-content>
                      <v-list-item-title>{{ document.title }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                </v-list>
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
      studentName: '',
      documents: []
    }
  },
  methods: {
    async sendDocument() {
      if (!this.selectedFile || !this.description) {
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
          this.fetchDocuments()
          alert('Documento enviado com sucesso!')
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
    async fetchDocuments() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/students/${this.studentId}/documents`
        )
        if (response.status === 200) {
          this.documents = response.data
        } else {
          throw new Error('Erro ao obter documentos do estudante')
        }
      } catch (error) {
        console.error('Erro ao obter documentos do estudante:', error)
        alert('Erro ao obter documentos do estudante')
      }
    }
  },
  async created() {
    await this.fetchStudentId()
    await this.fetchDocuments()
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
