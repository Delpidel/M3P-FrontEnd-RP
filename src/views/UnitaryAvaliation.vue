<template>
  <v-container>
    <!-- Detalhes do Estudante -->
    <v-card>
      <v-card-title>
        <h1>Detalhes do Estudante</h1>
      </v-card-title>
      <v-card-text>
        <v-col cols="12">
          <p><strong>Nome:</strong> {{ student?.name }}</p>
        </v-col>
        <v-col cols="12">
          <p><strong>Altura:</strong> {{ student?.height }} m</p>
        </v-col>
        <v-col cols="12">
          <p><strong>Peso:</strong> {{ student?.weight }} kg</p>
        </v-col>
        <v-col cols="12">
          <p><strong>Idade:</strong> {{ student?.age }}</p>
        </v-col>
      </v-card-text>
    </v-card>
    
    <v-card>
      <v-card-title>
        <h1>Avaliações</h1>
      </v-card-title>
      <v-card-text>
        <v-col cols="12">
          <p><strong>Observações para Aluno:</strong> {{ avaliation?.observations_to_student }}</p>
        </v-col>
        <v-col cols="12">
          <p><strong>Observações para Nutricionista:</strong> {{ avaliation?.observations_to_nutritionist }}</p>
        </v-col>
        <v-col cols="12">
          <p><strong>Medidas:</strong></p>
          <ul>
            <li v-for="(measure, index) in avaliation?.measures" :key="index">
              {{ index }}: {{ measure }}
            </li>
          </ul>
        </v-col>
        <v-row>
          <v-col v-for="(image, index) in avaliationImages" :key="index" cols="6">
            <img :src="image" alt="Imagem da Avaliação">
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="6">
            <!-- Select para escolher avaliações -->
            <v-select v-model="selectedAvaliationId" :items="avaliationOptions" label="Escolha uma avaliação" @input="selectAvaliation"></v-select>
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
      avaliations: [],
      selectedAvaliationId: null,
      avaliation: null // Adicionado uma propriedade para armazenar a avaliação selecionada
    };
  },
  computed: {
    avaliationOptions() {
      const options = [];
      for (let i = 0; i < this.avaliations.length; i++) {
        const avaliation = this.avaliations[i];
        options.push({
          text: avaliation.id,
          value: avaliation.id
        });
      }
      return options;
    },
    avaliationImages() {
      if (this.selectedAvaliationId && Array.isArray(this.avaliations)) { // Verifica se this.avaliations é um array
        const selectedAvaliation = this.avaliations.find(avaliation => avaliation.id === this.selectedAvaliationId);
        if (selectedAvaliation) {
          // Verificar se há imagens e extrair as URLs
          const images = ['back', 'front', 'left', 'right'].map(key => selectedAvaliation[key]);
          return images;
        }
      }
      return [];
    }
  },
  methods: {
    fetchAvaliations(studentId) {
      axios.get(`/api/avaliations/${studentId}`)
        .then(response => {
          this.avaliations = response.data;
        })
        .catch(error => {
          console.error('Erro ao obter avaliações:', error);
        });
    },
    selectAvaliation() {
      if (this.selectedAvaliationId && Array.isArray(this.avaliations)) { // Verifica se this.avaliations é um array
        // Encontra a avaliação correspondente ao ID selecionado
        const selectedAvaliation = this.avaliations.find(avaliation => avaliation.id === this.selectedAvaliationId);

        // Atualiza a propriedade avaliation com a avaliação selecionada
        this.avaliation = selectedAvaliation;
      } else {
        // Caso não haja nenhuma avaliação selecionada, define avaliation como null ou um objeto vazio, dependendo da sua lógica de tratamento
        this.avaliation = null; // ou this.avaliation = {};
      }
    }
  },

  mounted() {
    const studentId = this.$route.params.studentId;
    this.fetchAvaliations(studentId);
  }
};
</script>
