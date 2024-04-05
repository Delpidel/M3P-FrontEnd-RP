<template>
    <div class="container mt-5">
        <v-card color="grey-darken-3" height="85px">
            <v-row class="ma-1">
                <v-col>
                    <h1>Estudantes Ativos</h1>
                </v-col>
            </v-row>
        </v-card>

        <v-card color="amber" class="mt-13" height="60px">
            <v-row class="ma-2 mt-3">
                <v-text-field :loading="loading" v-model="studentName" id="StudentName" density="compact" variant="solo"
                    label="Pesquisar Aluno" append-inner-icon="mdi-magnify" single-line hide-details
                    @click:append-inner="SearchStudent">
                </v-text-field>
            </v-row>
        </v-card>


        <v-card color="grey-darken-1" class="ma-4 mt-10">
            <v-table fixed-header class="ma-2">
                <thead>
                    <tr>
                        <th class="text-left">Nome do Estudante</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(student, id) in filteredStudents" :key="student.id">
                        <td>{{ student.name }}</td>
                        <td>
                            <v-btn class="ma-1" size="small" color="amber" @click="ShowAvaliation(student.id)">Ver Avaliações</v-btn>
                            <v-btn class="ma-1" size="small" color="amber" @click="NewStudentAvaliation(student.id)">Cadastrar Avaliação</v-btn>
                            <v-btn class="ma-1" size="small" color="amber" @click="StudentMeal(student.id)">Ver Dieta</v-btn>
                            <v-btn class="ma-1" size="small" color="amber"@click="NewStudentMeal(student.id)">Cadastrar Dieta</v-btn>
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
            studentName: '',
            filteredStudents: []
            
        }
    },

    watch: {
        studentName() {
            this.SearchStudent();
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
                    this.$router.push({
                        path: `/students/avaliations/${student_id}`,                      
                    });
                    
                })

        },
        
        NewStudentAvaliation(student_id){
            this.$router.push({
            path: '/avaliation/step1',
            query: { id: student_id }
        }) 
        },

        StudentMeal(student_id) {
            axios.get(`http://127.0.0.1:8000/api/meal/${student_id}`)
                .then(response => {
                    const studentData = response.data;
                    console.log(studentData)
                    this.$router.push({
                        path: '/student/meal-plans',
                        query: { id: student_id }                      
                    });
                    
                })

        },

        NewStudentMeal(student_id){
            this.$router.push({
            path: `/dietas/${student_id}`,
        }) 
        },

        ShowStudent() {
            axios({
                url: 'http://127.0.0.1:8000/api/students',
                method: 'GET',
            })
                .then((response) => {
                    this.students = response.data;
                    this.filteredStudents = [...this.students];
                    console.log(this.students)
                })
                .catch(() => {
                    console.log("Falha na requisição")
                })
        },

        SearchStudent() {
            const studentName = this.studentName.toLowerCase()
            this.filteredStudents = this.students.filter(student => student.name.toLowerCase().includes(studentName))
        } 
    }

}
</script>

