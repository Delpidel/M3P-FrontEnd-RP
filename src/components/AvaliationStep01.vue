<template>
  <div class="container">

    <v-container class="main">
      <v-form @submit.prevent="submitForm">
        <v-row>
          <h2>Aluno - {{ studentName.name }}</h2>
          <v-divider></v-divider>

          <v-col cols="12" sm="4">
            <v-text-field id="age" v-model="age" label="Idade" color="yellow-darken-1"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field id="weight" v-model="weight" label="Peso" color="yellow-darken-2"
              type="number"></v-text-field>
          </v-col>
          <v-col cols="12" sm="4">
            <v-text-field id="height" v-model="height" label="Altura" color="yellow-darken-2"
              type="number"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-textarea id="observationsToNutritionist" v-model="observationsToNutritionist"
              label="Observações para a Nutricionista" color="yellow-darken-2"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-textarea id="observationsToStudent" v-model="observationsToStudent" label="Observações para o Aluno"
              color="yellow-darken-2"></v-textarea>
          </v-col>
          <v-col cols="12">
            <v-btn type="submit" variant="elevated" color="grey-darken-4 text-amber" class="font-weight-bold"
              size="large">Proximo ></v-btn>
          </v-col>
        </v-row>
      </v-form>
      <v-row>
        <!-- Calendário -->
        <v-col cols="12" md="4">
          <v-col>
            <v-date-picker id="date" v-model="date" color="yellow" mode="dateTime" :timezone="timezone"
              is24hr @change="saveDateTime"></v-date-picker>
          </v-col>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>


<script>
import axios from 'axios';

export default {
  data() {
    return {
      studentName: {},
      id: '',
      date: null,
      timezone: '',
      time: null,
      age: '',
      weight: '',
      height: '',
      observationsToNutritionist: '',
      observationsToStudent: '',      
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    //recuperar nome do aluno no qual esta sendo cadastrado a avaliação
    this.findStudentName();

    const savedDateTime = localStorage.getItem('dateTime');
    if (savedDateTime) {
      this.date = new Date(savedDateTime);
    }
  },

  methods: {

    saveDateTime() {
      if (this.date) { 
        localStorage.setItem('dateTime', this.date.toISOString());
      }
    },

    async findStudentName() {
      try {
        const token = localStorage.getItem('@token');
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

        const response = await axios.get(`http://127.0.0.1:8000/api/students/${this.id}`);
        this.studentName = response.data;

      } catch (error) {
        console.error('Erro ao buscar nome do estudante:', error);
      }
    },

    submitForm() {
      const formData = {
        student_id: this.id,
        age: this.age,
        date: this.date ? this.date.toISOString() : null,
        weight: this.weight,
        height: this.height,
        observationsToStudent: this.observationsToStudent,
        observationsToNutritionist: this.observationsToNutritionist,
      };

      // Armazene os dados no LocalStorage
      localStorage.setItem('step1Data', JSON.stringify(formData));
      this.$router.push(`/avaliation/step2/${this.id}`);

    },

    //Logica para formatar data conforme backEnd
    formatDate(date) {
      const formattedDate = new Date(date);
      const year = formattedDate.getFullYear();
      const month = String(formattedDate.getMonth() + 1).padStart(2, '0');
      const day = String(formattedDate.getDate()).padStart(2, '0');
      const hours = String(formattedDate.getHours()).padStart(2, '0');
      const minutes = String(formattedDate.getMinutes()).padStart(2, '0');
      const seconds = String(formattedDate.getSeconds()).padStart(2, '0');

      return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    }

  }
}
</script>

<style scoped>
.main {
  display: flex;
  width: 90%;
  margin: 0 auto;
  margin-top: 5%
}
</style>