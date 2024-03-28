<template>
    <Menu></Menu>
    <v-container>
        <v-card color="grey-darken-3" height="100px">
            <v-row class="ma-1">
                <v-col cols="12" md="2">
                    <img src="/src/assets/logo.jpg.jpeg" height="70px" width="80px">
                </v-col class="ma-1" cols="12" md="10">
                <v-col>
                    <h1>Avaliações do Estudante</h1>
                </v-col>
            </v-row>
        </v-card>

        <v-row class="ma-1 py-4">
            <h1>Nome do Estudante</h1>
        </v-row>

        <v-row class="ma-1">
            <v-col cols="12" md="3">
                <v-text-field v-model="EvaluationDate" label="Data da Avaliação" id="EvaluationDate" type="date"></v-text-field>
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
    </v-container>
</template>

<script>
    import axios from 'axios';
    import Menu from '@/components/Menu.vue';

    export default {
        data () {
            return {
                student: {},
                students: [],
                evaluation: {},
                evaluations: [],
            }
        },

        mounted () {

        },

        methods: {
            SearchEvaluationDate () {

            }

        }
    }

</script>

<style>

</style>