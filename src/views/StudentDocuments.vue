<template>
  <div class="background">
    <v-container fluid>
      <v-row justify="center">
        <v-col cols="12" md="8">
          <v-card class="glass-card mt-8">
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
                <h2>Documentos de {{ student.name }}</h2>
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
                  v-model="selectedFile"
                  label="Selecione o arquivo"
                  outlined
                  accept=".pdf,.doc,.docx,.txt,.jpg,.png"
                ></v-file-input>
              </v-col>

              <v-col cols="12" class="text-center">
                <v-btn color="amber" @click="sendDocument">Enviar</v-btn>
              </v-col>
            </v-row>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      description: '',
      selectedFile: null,
      student: ''
    }
  },
  created() {
    this.fetchStudentName(this.$route.params.id)
  },
  methods: {
    fetchStudentName(studentId) {
      fetch(`http://localhost:8000/api/students/${studentId}`)
        .then((response) => response.json())
        .then((data) => {
          this.student = data.name
        })
        .catch((error) => {
          console.error('Erro ao recuperar o nome do aluno:', error)
        })
    },
    sendDocument() {
      if (!this.selectedFile) {
        alert('Por favor, selecione um arquivo.')
        return
      }

      let formData = new FormData()
      formData.append('file', this.selectedFile)
      formData.append('title', this.description)

      fetch(`http://localhost:8000/api/students/${this.$route.params.id}/documents`, {
        method: 'POST',
        body: formData
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.error) {
            throw new Error(data.error)
          }
          alert('Documento enviado com sucesso!')
        })
        .catch((error) => {
          console.error('Erro:', error.message)
          alert('Ocorreu um erro ao enviar o documento')
        })
    }
  }
}
</script>

<style scoped>
.background {
  background-color: #424242;
  min-height: 100vh;
}

.glass-card {
  background-color: whitesmoke;
  box-shadow: 0 px 32px 0 black;
  backdrop-filter: blur(13.5px);
  border-radius: 10px;
  padding: 40px;
}

@media (max-width: 400px) {
  .text-center {
    text-align: center;
  }
}
</style>
