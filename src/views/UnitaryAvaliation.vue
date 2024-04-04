<template>
  <v-container>
    <v-card>
      <v-card-title>
        <h1>Detalhes do Estudante</h1>
      </v-card-title>
      <v-card-text>
        <v-row v-if="student">
          <v-col cols="12">
            <p><strong>ID:</strong> {{ student.id }}</p>
          </v-col>
          <v-col cols="12">
            <p><strong>Nome:</strong> {{ student.name }}</p>
          </v-col>
          <v-col cols="12">
            <p><strong>Idade:</strong> {{ student.age }}</p>
          </v-col>
        </v-row>
        <v-row v-else-if="loading">
          <v-col cols="12">
            <p>Carregando...</p>
          </v-col>
        </v-row>
        <v-row v-else>
          <v-col cols="12">
            <p>{{ errorMessage }}</p>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      student: null,
      loading: true,
      errorMessage: ''
    };
  },
  mounted() {
    const studentId = this.$route.params.id;
    axios.get(`/api/avaliations/${studentId}`, {
      baseURL: 'http://127.0.0.1:8000',
    })
    .then(response => {
      this.student = response.data;
      this.loading = false; // Indica que o carregamento foi concluído com sucesso
    })
    .catch(error => {
      console.error('Erro ao buscar dados do estudante:', error);
      this.errorMessage = 'Erro ao buscar dados do estudante. Por favor, tente novamente mais tarde.'; // Define a mensagem de erro
      this.loading = false; // Indica que o carregamento falhou
    });

    // Configura um temporizador para exibir a mensagem de erro após 5 segundos
    setTimeout(() => {
      if (this.loading) {
        this.errorMessage = 'Não foi possível obter resposta da API após 5 segundos.';
        this.loading = false;
      }
    }, 5000);
  },
};
</script>