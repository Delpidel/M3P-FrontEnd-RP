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
                            <v-btn class="ma-1" size="small" color="amber" @click="sendAvaliations(evaluation)">Enviar
                                Avaliação</v-btn>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </v-card>

        <v-row class="ma-1">
            <v-btn class="ma-1" size="small" color="amber" @click="BackActiveStudents()">Voltar</v-btn>
        </v-row>
    </div>
</template>

<script>
import api from '@/services/api.js';

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
        async exportAvaliations(evaluation) {
            await api.get(`/avaliations/export/${evaluation.id}`, { responseType: 'blob' })
                .then(response => {
                    const url = window.URL.createObjectURL(new Blob([response.data]));
                    const link = document.createElement('a');
                    link.href = url;
                    link.setAttribute('download', 'Evaluations.pdf');
                    document.body.appendChild(link);
                    link.click();
                })
                .catch(error => {
                    console.error('Erro ao buscar as avaliações', error);
                });
        },

        async fetchAvaliations() {
            await api.get(`/students/avaliations/${this.student_id}`)
                .then(response => {
                    this.evaluations = response.data;
                    this.sortEvaluations();
                })
                .catch(error => {
                    console.error('Erro ao buscar as avaliações', error);
                });
        },

        async fetchStudent() {
            await api.get(`/students/${this.student_id}`)
                .then(response => {
                    this.student = response.data
                })
                .catch(error => {
                    console.error('Erro ao buscar as avaliações', error);
                });
        },

        async sendAvaliations(evaluation) {
            await api.get(`/avaliations/send/${evaluation.id}`)
                .then(response => {
                    this.evaluation = response.data
                })
                .catch(error => {
                    console.error('Erro ao buscar as avaliações', error);
                });
        },

        BackActiveStudents() {
            this.$router.push(`/active/students`)
        },

        searchEvaluation() {
            const evaluationDate = this.evaluationDate
            this.sortedEvaluations = this.evaluations.filter(evaluation => evaluation.date.includes(evaluationDate))
        },

        sortEvaluations() {
            this.sortedEvaluations = [...this.evaluations].sort((a, b) => new Date(b.date) - new Date(a.date));
        }

    }
}

</script>

<style></style>