<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h1 class="py-12">Listagem de estudantes</h1>
      <v-btn type="submit" variant="elevated" color="grey-darken-4" text="amber"
        >Novo estudante</v-btn
      >
    </div>
    <form @submit.prevent="handleSearch">
      <v-row>
        <v-col cols="12" class="my-2">
          <v-text-field
            placeholder="Pesquise por uma informação do estudante"
            variant="outlined"
            v-model="text"
          ></v-text-field>
        </v-col>
      </v-row>
    </form>
    <v-data-table>
      <thead>
        <tr>
          <th>Nome</th>
          <th>Cpf</th>
          <th>Email</th>
          <th>Ações</th>
        </tr>
      </thead>
      <t-body>
        <tr v-for="student in students" :key="student.id">
          <td>{{ student.name }}</td>
          <td>{{ student.cpf }}</td>
          <td>{{ student.email }}</td>
        </tr>
      </t-body>
    </v-data-table>
  </v-container>
</template>

<script>
import StudentService from '../../services/StudentService'
export default {
  data() {
    return {
      text: '',
      students: []
    }
  },

  methods: {
    handleSearch() {
      this.getStudents()
    },
    getStudents() {
      StudentService.gettAllStudents(this.text)
        .then((data) => {
          this.student = data
        })
        .catch(() => alert('Houve um erro ao retornar os estudantes'))
    }
  },

  mounted() {
    this.getStudents()
  }
}
</script>
