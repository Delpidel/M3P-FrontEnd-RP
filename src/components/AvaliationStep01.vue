<template>
  <v-container>
    <v-row>
      <!-- Calendário -->
      <v-col cols="12" md="4">
        <v-col>
          <v-date-picker v-model="date" color="yellow" @input="selectDate"></v-date-picker>
        </v-col>        
        <v-col md="10">
          <v-text-field type="time"> Horário: </v-text-field>
        </v-col>        
      </v-col>

      <!-- Formulário de Avaliação -->
      <v-col cols="12" md="8">
        <v-form>
          <v-row>
            <v-col cols="12" sm="4">
              <v-text-field v-model="name" label="Nome" color="yellow"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field v-model="weight" label="Peso" color="yellow" type="number"></v-text-field>
            </v-col>
            <v-col cols="12" sm="4">
              <v-text-field v-model="height" label="Altura" color="yellow" type="number"></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="observationsToNutritionist" label="Observações para a Nutricionista"
                color="yellow"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-textarea v-model="observationsToStudent" label="Observações para o Aluno" color="yellow"></v-textarea>
            </v-col>
            <v-col cols="12">
              <v-btn color="green" @Click="this.$router.push('/avaliacao/step2')">Proximo ></v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      date: null,
      time: null,
      name: '',
      weight: '',
      height: '',
      observationsToNutritionist: '',
      observationsToStudent: ''
    }
  },
  methods: {
    selectDate(date) {
      // Lógica para lidar com a seleção de data
      console.log('Data selecionada:', date)
    }
  }
}
</script>

<style scoped></style>