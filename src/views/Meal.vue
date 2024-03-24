<template>
    <div class="container">

        <div class="tabela">
            <h2>Alimentação - {{ studentName }}</h2>
            <v-table>
                <thead>
                    <tr>
                        <th class="text-left">
                            <button @click="segunda()">Segunda</button>
                        </th>
                        <th class="text-left"><button @click="terca()">Terça</button></th>
                        <th class="text-left"><button @click="quarta()">Quarta</button></th>
                        <th class="text-left"><button @click="quinta()">Quinta</button></th>
                        <th class="text-left"><button @click="sexta()">Sexta</button></th>
                        <th class="text-left"><button @click="sabado()">Sábado</button></th>
                        <th class="text-left"><button @click="domingo()">Domingo</button></th>
                    </tr>
                </thead>
            </v-table>
        </div>

        <div class="tabela">
            <h2>Refeições</h2>
            <v-table class="tabelaDieta">
                <thead>
                    <tr>
                        <th class="linha">Horário</th>
                        <th class="linha">Título</th>
                        <th class="linha">Descrição</th>
                        <th class="linha">Acões</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="meal in item" :key="meal.id">
                        <td>{{ meal.hour }}</td>
                        <td>{{ meal.title }}</td>
                        <td>{{ meal.description }}</td>

                        <td>
                            <div class="d-flex justify-space-around"> 
                                <v-icon :icon="`mdiSvg:${mdiPencil}`"></v-icon>
                                <v-icon :icon="`mdiSvg:${mdiDelete}`"></v-icon>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>
</template>

<script>
import axios from "axios";

import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";


const token = localStorage.getItem("usuario_token");

export default {

    data: () => ({
        item: [],
        itemDia: [],
        diaDaSemana: "",

    }),

    computed: {
        studentName() {
            return this.item.length > 0 ? this.item[0].student.name : '';
        }
    },

    mounted() {
        const diaDaSemana = format(new Date(), "eee", { locale: ptBR });
        this.diaDaSemana = this.removerAcentos(diaDaSemana);

        this.buscarDieta();
        this.buscarDietaDia();
    },

    watch: {
        diaDaSemana() {
            this.buscarDieta();
        },
    },

    methods: {
        removerAcentos(info) {
            return info.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        },

        segunda() {
            this.diaDaSemana = "segunda";
        },
        terca() {
            this.diaDaSemana = "terca";
        },
        quarta() {
            this.diaDaSemana = "quarta";
        },
        quinta() {
            this.diaDaSemana = "quinta";
        },
        sexta() {
            this.diaDaSemana = "sexta";
        },
        sabado() {
            this.diaDaSemana = "sabado";
        },
        domingo() {
            this.diaDaSemana = "domingo";
        },

        buscarDieta() {
            axios({
                url: `http://127.0.0.1:8000/api/meal/${this.$route.params.id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearen ${token}`,
                },
            })
                .then((response) => {
                    this.item = response.data;
                    this.filtrarDieta();
                })
                .catch(() => {
                    console.log("dados não encontrados");
                });
        },

        filtrarDieta() {
            const dieta = this.diaDaSemana.toLocaleLowerCase();
            this.item = this.item.filter((data) =>
                data.day.toLocaleLowerCase().includes(dieta)
            );
        },

        buscarDietaDia() {
            axios({
                url: `http://127.0.0.1:8000/api/meal/${this.$route.params.id}`,
                method: "GET",
                headers: {
                    Authorization: `Bearen ${token}`,
                },
            })
                .then((response) => {
                    this.itemDia = response.data;
                    this.filtrarDietaDia();
                })
                .catch(() => {
                    console.log("dados não encontrados");
                });
        },

        filtrarDietaDia() {
            const dietaDia = this.diaDaSemana.toLocaleLowerCase();
            this.itemDia = this.itemDia.filter((data) =>
                data.day.toLocaleLowerCase().includes(dietaDia)
            );
        },

    },
};
</script>

<style>
.cabecalho {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.linha {
    width: 25%;
}


.tabelaDieta {
    border: 1px solid black;
}



@media (max-width: 650px) {
    .main {
        margin: 10px auto;
    }

    .cabecalho {
        font-size: 14px;
        margin: auto;
    }

    .linha {
        width: 10%;
    }

    h2 {
        margin: auto;
    }


    .tabelaDieta {
        width: 90%;
        border: 1px solid black;
        margin: auto;
    }

}
</style>