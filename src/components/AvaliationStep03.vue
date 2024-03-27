<template>
  <v-app>
    <v-card color="grey-darken-1" height="210px" rounded="0" flat>
      <v-card-item class="d-flex justify-center ml-16">
        <img class="w-50 ml-16" src="../assets/logo-img/logo (1).png" alt="logo">
      </v-card-item>


    </v-card>


    <v-main>
      <v-container>
        <h1 class="text-h5 font-weight-bold ma-2">Medidas do Aluno</h1>
        <v-card>
          <v-card-text>
            <v-form ref="form" @submit.prevent="submitForm">
              <v-row>
                <v-col>
                  <v-text-field v-model="formData.torax" :rules="toraxRules" clearable label="Torax (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.bracoDireito" :rules="bracoDireitoRules" clearable
                    label="Braço Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.bracoEsquerdo" :rules="bracoEsquerdoRules" clearable
                    label="Braço Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.cintura" :rules="cinturaRules" clearable label="Cintura (cm)"
                    type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.antebraçoDireito" :rules="antebraçoDireitoRules" clearable
                    label="Antebraço Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                
                <v-col>
                  <v-text-field v-model="formData.antebraçoEsquerdo" :rules="antebraçoEsquerdoRules" clearable
                    label="Antebraço Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.abdomen" :rules="abdomenRules" clearable label="Abdomen (cm)"
                    type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.quadril" :rules="quadrilRules" clearable label="Quadril (cm)"
                    type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.coxaDireita" :rules="coxaDireitaRules" clearable
                    label="Coxa Direita (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.coxaEsquerda" :rules="coxaEsquerdaRules" clearable
                    label="Coxa Esquerda (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field v-model="formData.panturrilhaDireita" :rules="panturrilhaDireitaRules" clearable
                    label="Panturrilha Direita (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.panturrilhaEsquerda" :rules="panturrilhaEsquerdaRules" clearable
                    label="Panturrilha Esquerda (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.punho" :rules="punhoRules" clearable label="Punho (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.bicepsFemoralDireito" :rules="bicepsFemoralDireitoRules" clearable
                    label="Bíceps Femoral Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field v-model="formData.bicepsFemoralEsquerdo" :rules="bicepsFemoralEsquerdoRules" clearable
                    label="Bíceps Femoral Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              
              <v-btn type="submit" variant="outlined">Cadastrar</v-btn>
            </v-form>
          </v-card-text>
        </v-card>
      </v-container>
    </v-main>
  </v-app>

</template>

<script>

import api from '@/services/api';

export default {
  data() {
    return {
      formData: {
        torax: null,
        bracoDireito: null,
        bracoEsquerdo: null,
        cintura: null,
        antebraçoDireito: null,
        antebraçoEsquerdo: null,
        abdomen: null,
        quadril: null,
        coxaDireita: null,
        coxaEsquerda: null,
        panturrilhaDireita: null,
        panturrilhaEsquerda: null,
        punho: null,
        bicepsFemoralDireito: null,
        bicepsFemoralEsquerdo: null,

      },
      toraxRules: [
        v => !!v || 'O campo Torax é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Torax',
      ],
      bracoDireitoRules: [
        v => !!v || 'O campo Braço Direito é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Braço Direito',
      ],
      bracoEsquerdoRules: [
        v => !!v || 'O campo Braço Esquerdo é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Braço Esquerdo',
      ],
      cinturaRules: [
        v => !!v || 'O campo Cintura é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para a Cintura',
      ],
      antebraçoDireitoRules: [
        v => !!v || 'O campo Antebraço Direito é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Antebraço Direito',
      ],
      antebraçoEsquerdoRules: [
        v => !!v || 'O campo Antebraço Esquerdo é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Antebraço Esquerdo',
      ],
      abdomenRules: [
        v => !!v || 'O campo Abdômen é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Abdômen',
      ],
      quadrilRules: [
        v => !!v || 'O campo Quadril é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Quadril',
      ],
      coxaDireitaRules: [
        v => !!v || 'O campo Coxa Direita é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para a Coxa Direita',
      ],
      coxaEsquerdaRules: [
        v => !!v || 'O campo Coxa Esquerda é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para a Coxa Esquerda',
      ],
      panturrilhaDireitaRules: [
        v => !!v || 'O campo Panturrilha Direita é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para a Panturrilha Direita',
      ],
      panturrilhaEsquerdaRules: [
        v => !!v || 'O campo Panturrilha Esquerda é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para a Panturrilha Esquerda',
      ],
      punhoRules: [
        v => !!v || 'O campo Punho é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Punho',
      ],
      bicepsFemoralDireitoRules: [
        v => !!v || 'O campo Bíceps Femoral Direito é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Bíceps Femoral Direito',
      ],
      bicepsFemoralEsquerdoRules: [
        v => !!v || 'O campo Bíceps Femoral Esquerdo é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Bíceps Femoral Esquerdo',
      ]

    };
  },
  methods: {
    submitForm() {
      this.$refs.form.validate().then(success => {
        if (success) {

          if (Object.values(this.formData).some(value => value === null || value === '')) {
          alert('Por favor, preencha todos os campos antes de enviar.');
          return;
         }


          const dataToSend = {
            "student_id": "1",
            "age": "20",
            "date": "1999-02-28 00:00:00",
            "weight": "70",
            "height": "65",
            "observations_to_student": "kkk",
            "observations_to_nutritionist": "kkk",
            "measures": {
              "torax": "100",
              "braco_direito": "40",
              "braco_esquerdo": "40",
              "cintura": "80",
              "antebraco_esquerdo": "30",
              "antebraco_direito": "30",
              "abdome": "90",
              "coxa_direita": "50",
              "coxa_esquerda": "50",
              "quadril": "100",
              "panturrilha_direita": "35",
              "panturilha_esquerda": "35",
              "punho": "15",
              "b_femoral_direito": "55",
              "b_femoral_esquerdo": "55"
            },
            "file_id": 5,
            "updated_at": "2024-03-27T19:10:53.000000Z",
            "created_at": "2024-03-27T19:10:53.000000Z",
            "id": 4
          }

          api.post('/avaliations', dataToSend)
            .then(response => {
              alert('Avaliação cadastrada com sucesso!');
              console.log(response.data);
            })
            .catch(error => {
              console.error(error);
              alert('Ocorreu um erro ao tentar cadastrar a avaliação.');
            });
        }
      });
    },
  },
};
</script>