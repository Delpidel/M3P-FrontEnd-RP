<template>
    <div class="container mt-5">
        <v-card color="grey-darken-3" height="85px">
            <v-row class="ma-1">
                <v-col>
                    <h1>Estudantes Ativos</h1>
                </v-col>
            </v-row>
        </v-card>

        <v-row class="ma-1 mt-12">
            <v-text-field :loading="loading" v-model="studentName" id="StudentName" density="compact" variant="solo"
                label="Pesquisar Aluno" append-inner-icon="mdi-magnify" single-line hide-details
                @click:append-inner="SearchStudent">
            </v-text-field>
        </v-row>

        <v-card color="grey-darken-1" class="ma-4 mt-10">
            <v-table fixed-header class="ma-2">
                <thead>
                    <tr>
                        <th class="text-left">Nome do Estudante</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="student in students" :key="student.id">
                        <td>{{ student.name }}</td>
                        <td>
                            <v-btn class="ma-1" size="small" color="amber" @click="ShowAvaliation(student.id)">Ver
                                Avaliações</v-btn>
                            <v-btn class="ma-1" size="small" color="amber">Cadastrar Avaliação</v-btn>
                            <v-btn class="ma-1" size="small" color="amber" @click="StudentWorkout(student.id)">Ver
                                Treino</v-btn>
                            <v-btn class="ma-1" size="small" color="amber">Enviar Treino</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    data() {
        return {
            student: {},
            students: [],
            
        }
    },

    mounted() {
        this.ShowStudent()
    },

    methods: {
        ShowAvaliation(student_id) {
           
            axios.get(`http://127.0.0.1:8000/api/students/avaliations/${student_id}`)
                .then(response => {
                    const studentData = response.data;
                    console.log(studentData)
                    // redirecionar para a página de avaliações com a resposta
                    this.$router.push({
                        path: `/students/avaliations/${student_id}`,                      
                    });
                    
                })

        },
        // NewStudentAvaliation(student_id){
        //     this.$router.push({
        //     path: '/students/avaliations',
        //     query: { id: student_id }
        // }) 
        // },

        StudentWorkout() {
            
        },

        // NewStudentAvaliation(student_id){
        //     this.$router.push({
        //     path: '/students/avaliations',
        //     query: { id: student_id }
        // }) 
        // },

        ShowStudent() {
            axios({
                url: 'http://127.0.0.1:8000/api/students',
                method: 'GET',
            })
                .then((response) => {
                    this.students = response.data                  
                })
                .catch(() => {
                    console.log("Falha na requisição")
                })
        },

        SearchStudent() {
            /*this.students = response.data.students
            this.studentsfilter = this.students.filter((item) => item.name === student.name)*/
        }

    }
}

</script>
