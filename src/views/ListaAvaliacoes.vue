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
            <h2>Aluno: {{ student.name }}</h2>
        </v-row>
        <v-card color="amber" class="ma-1">
            <v-row class="ma-2">
                <h3>Pesquise aqui a Data da Avaliação:</h3>
            </v-row>
            <v-row class="ma-1">
                <v-col cols="12" md="12">
                    <v-text-field :loading="loading" v-model="evaluationDate" id="evaluationDate" density="compact"
                        variant="solo" type="date" label="Pesquisar Data de Avaliação" append-inner-icon="mdi-magnify"
                        single-line hide-details @click:append-inner="searchEvaluation">
                    </v-text-field>
                </v-col>
            </v-row>
        </v-card>

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
                            <v-btn class="ma-1" size="small" color="amber"
                                @click="exportAvaliations(evaluation)">Exportar</v-btn>
                            <v-btn class="ma-1" size="small" color="amber"
                               @click="sendAvaliations(evaluation)">Enviar Avaliação</v-btn>
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
            id: '',
            students: [],
            evaluation: '',
            evaluationDate: '',
            evaluations: [],
            sortedEvaluations: ''
        }
    },

    mounted() {

        this.student_id = this.$route.params.student_id;
        this.id = this.$route.params.id;
        this.fetchAvaliations()
        this.fetchStudent()
    },


    methods: {

        fetchStudent() {
            axios.get(`http://127.0.0.1:8000/api/students/${this.student_id}`)
                .then(response => {
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
        },

        sendAvaliations(evaluation) {
            axios.get(`http://127.0.0.1:8000/api/avaliations/send/${evaluation.id}`)
                .then(response => {
                    this.evaluation = response.data
                    console.log(evaluation.id)
                    console.log(this.evaluation)
                })
                .catch(error => {
                    console.error('Erro ao buscar as avaliações', error);
                });
        },

        exportAvaliations(evaluation) {
            axios.get(`http://127.0.0.1:8000/api/avaliations/export/${evaluation.id}`, { responseType: 'blob' })
                .then(response => {
                    // this.evaluation = response.data
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Evaluations.pdf');
                    document.body.appendChild(link);
                    link.click();

                    console.log(evaluation.id)
                    console.log(this.evaluation)
                })
                .catch(error => {
                    console.error('Erro ao buscar as avaliações', error);
                });
        },

        searchEvaluation() {
            const evaluationDate = this.evaluationDate
            this.sortedEvaluations = this.evaluations.filter(evaluation => evaluation.date.includes(evaluationDate))
        }


    }
}

</script>

<style></style>