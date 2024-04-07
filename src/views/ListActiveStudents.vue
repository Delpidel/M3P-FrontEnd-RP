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
                            <v-btn class="ma-1" size="small" color="amber" @click="SeeAvaliation(student.id)">Ver
                                Avaliações</v-btn>
                            <v-btn class="ma-1" size="small" color="amber" @click="ExportAvaliation(student.id)">Exportar
                                Avaliações</v-btn>
                            <v-btn class="ma-1" size="small" color="amber"
                                @click="NewStudentAvaliation(student.id)">Cadastrar
                                Avaliação</v-btn>
                            <v-btn class="ma-1" size="small" color="amber" @click="NewStudentMeal(student.id)">Cadastrar
                                Dieta</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <v-row class="ma-1">
            <v-btn class="ma-1" size="small" color="amber" @click="BackDashboard()">Voltar Para o Dashboard</v-btn>
        </v-row>
    </div>
</template>

<script>
import AuthenticationService from '@/services/Auth/AuthenticationService';
import api from '@/services/api.js';

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
        async ExportAvaliation(student_id) {
            await api.get(`/students/avaliations/${student_id}`)
                .then(response => {
                    const studentData = response.data;
                    console.log(studentData)
                    this.$router.push({
                        path: `/students/avaliations/${student_id}`,
                    });

                })

        },

        async fetchStudentsData() {
            try {
                const students = await AuthenticationService.fetchStudentsData()
                this.students = students
                console.log(this.students)
                this.filteredStudents = students
                console.log(this.filteredStudents)
            } catch (error) {
                console.error('Erro ao buscar dados do painel de administração:', error)
            }
        },

        async SeeAvaliation(student_id) {
            await api.get(`/avaliations/${student_id}`)
                .then(response => {
                    const studentData = response.data;
                    console.log(studentData)
                    this.$router.push({
                        path: `/avaliation/${student_id}`,
                    });

                })

        },

        BackDashboard() {
            this.$router.push(`/dashboard`)
        },

        NewStudentAvaliation(student_id) {
            this.$router.push({
                path: '/avaliation/step1',
                query: { student_id: student_id }
            })
        },

        NewStudentMeal(student_id) {
            this.$router.push(`/dietas/${student_id}`)
        },

        SearchStudent() {
            const studentName = this.studentName.toLowerCase()
            this.filteredStudents = this.students.filter(student => student.name.toLowerCase().includes(studentName))
        },

        ShowStudent() {
            this.fetchStudentsData()
        }

    }

}
</script>
