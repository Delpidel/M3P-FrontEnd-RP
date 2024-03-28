<template>
    <div class="container">

        <h2>Alimentação - {{ studentName }}</h2>

        <v-card>
            <v-tabs v-model="diaDaSemana" bg-color="grey-darken-4 text-amber">
                <v-tab value="segunda">Segunda</v-tab>
                <v-tab value="terca">Terça</v-tab>
                <v-tab value="quarta">Quarta</v-tab>
                <v-tab value="quinta">Quinta</v-tab>
                <v-tab value="sexta">Sexta</v-tab>
                <v-tab value="sabado">Sábado</v-tab>
                <v-tab value="domingo">Domingo</v-tab>
            </v-tabs>

            <v-card-text>
                <v-window v-model="tab">
                    <v-window-item value="one">
                        <v-form @submit.prevent="handleSubmit">
                          
                            <v-autocomplete v-model="idPlanoAlimentacao" :items="planoAlimentacao"
                                item-title="description" item-value="id" label="Plano de Alimentação" type="text"
                                variant="outlined" :error-messages="errors.name">
                            </v-autocomplete>

                            <v-text-field v-model="horario" label="Horário" type="text" variant="outlined"
                                :error-messages="errors.name">
                            </v-text-field>
                            <v-text-field v-model="titulo" label="Título" type="text" variant="outlined"
                                :error-messages="errors.name">
                            </v-text-field>
                            <v-text-field v-model="descricao" label="Descrição" type="text" variant="outlined"
                                :error-messages="errors.name">
                            </v-text-field>
                            <v-btn type="submit" variant="elevated" color="grey-darken-4 text-amber">
                                {{ isEditing ? 'Atualizar' : 'Cadastrar' }}
                            </v-btn>

                        </v-form>
                    </v-window-item>
                </v-window>
            </v-card-text>
        </v-card>

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
                                <v-btn @click="editDieta(meal)" type="submit" variant="elevated"
                                    color="grey-darken-4 text-amber">
                                    Editar
                                </v-btn>
                                <v-btn @click="excluirDieta(meal.id)" type="submit" variant="elevated"
                                    color="grey-darken-4 text-amber">
                                    Excluir
                                </v-btn>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </v-table>
        </div>
    </div>
</template>

<script>

import MealService from "../services/MealService";

import { format } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";

export default {

    data: () => ({
        item: [],
        itemDia: [],
        diaDaSemana: "",
        idPlanoAlimentacao: "",
        planoAlimentacao: [],
        mealId: "",
        horario: "",
        titulo: "",
        descricao: "",
        errors: [],
        tab: null,
        isEditing: false,

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

        this.getMealPlans()
    },

    watch: {
        diaDaSemana() {
            this.buscarDieta();
        },
    },

    methods: {
        editDieta(meal) {
            this.isEditing = true;
            this.mealId = meal.id;
            this.idPlanoAlimentacao = meal.meal_plan_id;
            this.horario = meal.hour;
            this.titulo = meal.title;
            this.descricao = meal.description;

            console.log(meal)
        },
        resetForm() {
            this.isEditing = false;
            this.mealId = '';
            this.idPlanoAlimentacao = '';
            this.horario = '';
            this.titulo = '';
            this.descricao = '';

        },


        getMealPlans() {
            MealService.getMealPlans()
                .then((data) => {
                    this.planoAlimentacao = data;
                    console.log(data)
                })
                .catch(() => {
                    console.log('dados não encontrados');
                });
        },

        handleSubmit() {
            try {
                const data = {
                    student_id: this.$route.params.id,
                    meal_plan_id: this.idPlanoAlimentacao,
                    day: this.diaDaSemana.toUpperCase(),
                    hour: this.horario,
                    title: this.titulo,
                    description: this.descricao,
                };

                if (this.isEditing) {
                    MealService.updateMeal(this.mealId, data)
                        .then(() => {
                            this.resetForm()
                            this.buscarDieta()
                            alert('Refeição atualizada com sucesso');

                        })
                        .catch(() => alert('Houve um erro ao atualizar a refeição'));
                } else {

                    MealService.createMeal(data)
                        .then(() => {
                            console.log("Cadastrado com sucesso");
                            this.errors = [];
                            this.buscarDieta()
                        })
                        .catch(() => {
                            this.showError = true
                        })
                }
            } catch (error) {
                if (error instanceof yup.ValidationError) {
                    //this.errors = captureErrorYup(error)
                }

            }
        },


        removerAcentos(info) {
            return info.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
        },


        buscarDieta() {
            MealService.getMealStudent(this.$route.params.id)
                .then((data) => {
                    this.item = data;
                    this.filtrarDieta();
                })
                .catch(() => {
                    console.log('dados não encontrados');
                });
        },



        filtrarDieta() {
            const dieta = this.diaDaSemana.toLocaleLowerCase();
            this.item = this.item.filter((data) =>
                data.day.toLocaleLowerCase().includes(dieta)
            );
        },

        buscarDietaDia() {
            MealService.getMealStudent(this.$route.params.id)
                .then((data) => {
                    this.itemDia = data;
                    this.filtrarDietaDia();
                })
                .catch(() => {
                    console.log('dados não encontrados');
                });
        },

        filtrarDietaDia() {
            const dietaDia = this.diaDaSemana.toLocaleLowerCase();
            this.itemDia = this.itemDia.filter((data) =>
                data.day.toLocaleLowerCase().includes(dietaDia)
            );
        },


        cadastrarDieta() {
            const data = {
                student_id: this.$route.params.id,
                meal_plan_id: this.idPlanoAlimentacao,
                day: this.diaDaSemana.toUpperCase(),
                hour: this.horario,
                title: this.titulo,
                description: this.descricao,
            };

            MealService.createMeal(data)
                .then(() => {
                    console.log("Cadastrado com sucesso");
                    this.errors = [];
                    this.buscarDieta()
                })
                .catch((error) => {
                    if (error.response?.data?.message) {
                        alert(error.response.data.message);
                    } else {
                        alert("Houve uma falha ao tentar cadastrar");
                    }
                });
        },

        excluirDieta(id) {
            MealService.deleteMeal(id)
                .then(() => {
                    console.log("Excluído com sucesso");
                    this.buscarDieta()
                    this.resetForm()
                })
                .catch((error) => {
                    if (error.response?.data?.message) {
                        alert(error.response.data.message);
                    } else {
                        alert("Houve uma falha ao tentar excluir");
                    }
                });
        }


    }

};
</script>

<style>
.select {
  width: 100%;
  height: 60px;
  background-color: rgb(243, 243, 242);
  margin-bottom: 20px;
  padding-left: 20px;
  border-bottom: 1px solid rgb(180, 178, 178);
  color: rgb(136, 136, 136);
}
.select {
    display: flex;
    flex-direction: column;
    margin: auto;
    margin-bottom: 20px;
    width: 80%;
  }

.cabecalho {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.linha {
    width: 25%;
}


/* .tabelaDieta {
    border: 1px solid black;
} */



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