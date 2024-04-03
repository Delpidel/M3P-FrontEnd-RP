<template>
    <div class="container mt-5">
        <v-card color="grey-darken-3" height="85px">
            <v-row class="ma-1">
                <v-col>
                    <h1>Avaliações do Estudante</h1>
                </v-col>
            </v-row>
        </v-card>

        <v-row class="ma-1 py-4">
            <!---Nome do estudante aqui-->
            <h2>Olá {{student.name}}</h2>
        </v-row>
        <v-row class="ma-1">
            <v-col cols="12" md="3">
                <v-text-field v-model="EvaluationDate" label="Data da Avaliação" id="EvaluationDate" type="date">
                </v-text-field>
            </v-col>
            <v-col cols="12" md="9">
                <v-btn class="ma-1" size="large" color="amber">Buscar</v-btn>
            </v-col>
        </v-row>

        <v-card color="grey-darken-1" class="ma-4">
            <v-table fixed-header class="ma-2">
                <thead>
                    <tr>
                        <th class="text-left">Data da Avaliação</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="evaluation in sortedEvaluations" :key="evaluation.id">
                        <td>{{ evaluation.date }}</td>
                        <td>
                            <v-btn class="ma-1" size="small" color="amber">Exportar</v-btn>
                            <v-btn class="ma-1" size="small" color="amber">Enviar Avaliação</v-btn>
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
            student_id: '',
            student: '',
            students: [],
            evaluation: '',
            evaluations: [],
            sortedEvaluations:''            
        }
    },

    mounted() {
        
        this.student_id = this.$route.params.student_id;
        this.fetchAvaliations()
        this.fetchStudent()
     },
   

    methods: {    
        
        fetchStudent(){
            axios.get(`http://127.0.0.1:8000/api/students/${this.student_id}`)
            .then( response => {
                this.student = response.data 
            })
            .catch(error => {
                console.error('Erro ao buscar as avaliações', error);
            });
        },

        fetchAvaliations() {

            axios.get(`http://localhost:8000/api/students/avaliations/${this.student_id}`)
                .then(response => {
                    this.evaluations = response.data;
                    console.log(this.evaluations)

                    this.sortEvaluations();
                })
                .catch(error => {
                    console.error('Erro ao buscar as avaliações', error);
                });
        },
        sortEvaluations() {
            this.sortedEvaluations = [...this.evaluations].sort((a, b) => new Date(b.date) - new Date(a.date));
        }

    }
}

</script>

<style></style>