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
            <h2>{{ student.name }}</h2>
        </v-row>

        <v-row class="ma-1">
            <v-col cols="12" md="3">
                <v-text-field v-model="EvaluationDate" label="Data da Avaliação" id="EvaluationDate"
                    type="date">
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
                    <tr>
                        <td>Vai ter V-for com relação a data</td>
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
            student: {},
            students: [],
            evaluation: {},
            evaluations: [],
        }
    },

    mounted() {
        this.student_id = this.$route.params.student_id;
        this.avaliations = this.$route.params.studentAvaliation;
        console.log(this.student_id)
        console.log(this.avaliations)
    },

    methods: {
        ShowStudent() {
            axios ({
             url: 'http://127.0.0.1:8000/api/students',
             method: 'GET',
            })
            .then((response) => {
                this.students = response.data
                console.log(response.data.student_id)
            })
            .catch(() => {
                console.log("Falha na requisição")
            })
        },

        // ShowAvaliationDate(){
        //     axios ({
        //      url:'http://127.0.0.1:8000/api/avaliations',
        //      method: 'GET',
        //     })
        //     .then((response) => {
        //         this.students = response.data
        //         console.log(response.data)
        //     })
        //     .catch(() => {
        //         console.log("Falha na requisição")
        //     })
        // },
        
        SearchEvaluationDate() {

        }

    }
}

</script>

<style></style>