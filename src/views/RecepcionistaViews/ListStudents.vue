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
            label="Pesquisar"
            placeholder="Pesquise pelo nome, email ou cpf do estudante"
            variant="outlined"
            v-model="searchText"
            @input="handleSearch"
          ></v-text-field>
        </v-col>
      </v-row>
    </form>
    <v-data-table v-if="students.length > 0" :items="filteredStudents" item-key="id">
      <template v-slot:headers="props">
        <tr>
          <th>Nome</th>
          <th>Cpf</th>
          <th>Email</th>
          <th>Contato</th>
          <th>Ações</th>
        </tr>
      </template>
      <template v-slot:items="props">
        <tr :key="props.item.id">
          <td>{{ props.item.name }}</td>
          <td>{{ props.item.cpf }}</td>
          <td>{{ props.item.email }}</td>
          <td>{{ props.item.contact }}</td>
          <td>
            <v-btn @click="editStudent(props.item)" color="primary">Editar</v-btn>
            <v-btn @click="deactivateStudent(props.item)" color="error">Desativar</v-btn>
          </td>
        </tr>
      </template>
    </v-data-table>
    <p v-else>Nenhum estudante encontrado</p>
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

  computed: {
    filteredStudents() {
      // Verifica se searchText está definido
      if (!this.searchText) {
        return this.students
      }
      // Filtra os estudantes com base no searchText
      return this.students.filter(
        (student) =>
          student.name.toLowerCase().includes(this.searchText.toLowerCase()) ||
          student.cpf.includes(this.searchText) ||
          student.email.toLowerCase().includes(this.searchText.toLowerCase())
      )
    }
  },

  methods: {
    handleSearch() {
      StudentService.getAllStudents(this.text)
        .then((data) => {
          this.students = data.map((item) => ({
            name: item.name,
            cpf: item.cpf,
            email: item.email,
            contact: item.contact
          }))
        })
        .catch(() => alert('Houve um erro ao retornar os estudantes'))
    },

    editStudent(student) {
      // Lógica para editar o estudante
    },
    desactivateStudent(student) {
      // Lógica para desativar o estudante
    }
    // ... (seus métodos existentes) ...
  },

  mounted() {
    this.handleSearch()
  }
}
</script>
