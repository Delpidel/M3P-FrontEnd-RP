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
                <h2 v-if="studentNameCopy">Documentos de {{ studentNameCopy }}</h2>
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
                >Enviar</v-btn>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <h3 class="mt-4">Documentos Cadastrados</h3>
                <table v-if="documents.length > 0" class="table">
                  <thead>
                    <tr>
                      <th>Título</th>
                      <th>Descrição</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(document, index) in documents" :key="index">
                      <td>{{ document.title }}</td>
                      <td>{{ document.description }}</td>
                    </tr>
                  </tbody>
                </table>
                <span v-else>Nenhum documento cadastrado</span>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import StudentDocumentService from '@/services/StudentDocumentService'

export default {
  props: ['studentName'],
  data() {
    return {
      description: '',
      selectedFile: null,
      isLoading: false,
      documents: [],
      studentId: null,
      studentNameCopy: ''
    }
  },
  methods: {
    async sendDocument() {
      if (!this.selectedFile || !this.description) {
        alert('Por favor, preencha todos os campos.')
        return
      }

      this.isLoading = true

      try {
        const formData = new FormData()
        formData.append('title', this.description)
        formData.append('document', this.selectedFile)

        await StudentDocumentService.sendDocument(this.studentId, formData)
        this.description = ''
        this.selectedFile = null
        this.fetchDocuments()
        alert('Documento enviado com sucesso!')
      } catch (error) {
        console.error('Erro ao enviar documento:', error)
        alert('Erro ao enviar documento')
      } finally {
        this.isLoading = false
      }
    },
    async fetchDocuments() {
      try {
        this.documents = await StudentDocumentService.getDocuments(this.studentId)
      } catch (error) {
        console.error('Erro ao obter documentos do estudante:', error)
        alert('Erro ao obter documentos do estudante')
      }
    }
  },
  mounted() {
    this.studentId = this.$route.params.id
    
    const params = new URLSearchParams(this.$route.query)
    this.studentNameCopy = params.get('studentName')
    
    this.fetchDocuments()
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
