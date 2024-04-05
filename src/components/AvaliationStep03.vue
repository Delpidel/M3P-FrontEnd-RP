<template>

    <v-app>
     <v-card color="grey-darken-1" height="210px"  rounded="0" flat>
      <v-card-item class="d-flex justify-center ml-16">
        <img class="w-50 ml-16" src="../assets/logo-img/logo (1).png" alt="logo">
      </v-card-item>
      
     </v-card>
      <v-main>
        <v-container>
          <h1 class="text-h5 font-weight-bold ma-2">Medidas do Aluno</h1>
            <v-card >
             <v-card-text>
              <v-form ref="form" @submit.prevent="submitForm">
              <v-row>
                <v-col>
                 <v-text-field v-model="formData.torax" :rules="toraxRules"  clearable label="Torax (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.bracoDireito" :rules="bracoDireitoRules" clearable label="Braço Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.bracoEsquerdo" :rules="bracoEsquerdoRules" clearable label="Braço Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.cintura" :rules="cinturaRules" clearable label="Cintura (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                 <v-text-field v-model="formData.antebraçoDireito" :rules="antebraçoDireitoRules" clearable label="Antebraço Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.antebraçoEsquerdo" :rules="antebraçoEsquerdoRules" clearable label="Antebraço Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.abdomen" :rules="abdomenRules" clearable label="Abdomen (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.quadril" :rules="quadrilRules" clearable label="Quadril (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                 <v-text-field v-model="formData.coxaDireita" :rules="coxaDireitaRules" clearable label="Coxa Direita (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.coxaEsquerda" :rules="coxaEsquerdaRules" clearable label="Coxa Esquerda (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.panturrilhaDireita" :rules="panturrilhaDireitaRules" clearable label="Panturrilha Direita (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.panturrilhaEsquerda" :rules="panturrilhaEsquerdaRules" clearable label="Panturrilha Esquerda (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                 <v-text-field v-model="formData.punho" :rules="punhoRules" clearable label="Punho (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.bicepsFemoralDireito" :rules="bicepsFemoralDireitoRules" clearable label="Bíceps Femoral Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.bicepsFemoralEsquerdo" :rules="bicepsFemoralEsquerdoRules" clearable label="Bíceps Femoral Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field v-model="formData.pescoco" :rules="pescocoRules" clearable label="Pescoço (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-btn type="submit" variant="outlined">Cadastrar</v-btn>
             </v-form>
             </v-card-text>
            </v-card>
        </v-container>
      </v-main>
    </v-app>
=======
  <v-app :key="componentKey">


    <v-main>
      <v-container>
        <v-card class="ma-4 ml-10" color="grey-darken-3" height="85px">
              <v-row class="ma-1">
                  <v-col>
                      <h1>Medidas do Aluno <v-icon size="25">mdi-ruler-square</v-icon></h1>
                      
                  </v-col>
              </v-row>
          </v-card>
      </v-container>
      
      <v-container>
        
        <v-card class="pl-5 d-flex align-center ma-4 ml-10">
          <v-card-text class="mt-6">
            <v-form ref="form" @submit.prevent="submitForm">
              <v-row>
                <v-col>
                  <v-text-field data-test="input-torax" v-model="formData.torax" :rules="toraxRules" clearable label="Torax (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-braco_direito" v-model="formData.braco_direito" :rules="bracoDireitoRules" clearable
                    label="Braço Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-braco_esquerdo" v-model="formData.braco_esquerdo" :rules="bracoEsquerdoRules" clearable
                    label="Braço Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-cintura" v-model="formData.cintura" :rules="cinturaRules" clearable label="Cintura (cm)"
                    type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-antebraco_direito" v-model="formData.antebraco_direito" :rules="antebraçoDireitoRules" clearable
                    label="Antebraço Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                
                <v-col>
                  <v-text-field data-test="input-antebraco_esquerdo" v-model="formData.antebraco_esquerdo" :rules="antebraçoEsquerdoRules" clearable
                    label="Antebraço Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-abdomen" v-model="formData.abdomen" :rules="abdomenRules" clearable label="Abdomen (cm)"
                    type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-quadril" v-model="formData.quadril" :rules="quadrilRules" clearable label="Quadril (cm)"
                    type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-coxa_direita" v-model="formData.coxa_direita" :rules="coxaDireitaRules" clearable
                    label="Coxa Direita (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-coxa_esquerda" v-model="formData.coxa_esquerda" :rules="coxaEsquerdaRules" clearable
                    label="Coxa Esquerda (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>

              <v-row>
                <v-col>
                  <v-text-field data-test="input-panturrilha_direita" v-model="formData.panturrilha_direita" :rules="panturrilhaDireitaRules" clearable
                    label="Panturrilha Direita (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-panturrilha_esquerda" v-model="formData.panturrilha_esquerda" :rules="panturrilhaEsquerdaRules" clearable
                    label="Panturrilha Esquerda (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-punho" v-model="formData.punho" :rules="punhoRules" clearable label="Punho (cm)" type="number"
                    variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-biceps_femoral_direito" v-model="formData.biceps_femoral_direito" :rules="bicepsFemoralDireitoRules" clearable
                    label="Bíceps Femoral Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                  <v-text-field data-test="input-biceps_femoral_esquerdo" v-model="formData.biceps_femoral_esquerdo" :rules="bicepsFemoralEsquerdoRules" clearable
                    label="Bíceps Femoral Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row justify="end">
                <v-col cols="12" class="text-right">
                  <v-btn type="submit" elevation="2" variant="tonal">Cadastrar</v-btn>
                </v-col>
              </v-row>
            </v-form>
          </v-card-text>
        </v-card>
        <v-btn
        class="ma-4 ml-10"
        color="amber"
        @click="goBack"
      >
        <v-icon class="pl-4"
          icon="mdi-arrow-left"
          start
        ></v-icon>
        Voltar
      </v-btn>
      </v-container>
    </v-main>
  </v-app>


</template>

<script>

import * as Yup from 'yup';


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
        pescoco: null,
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

      ],
      pescocoRules: [
        v => !!v || 'O campo Pescoço é obrigatório',
        v => !isNaN(v) || 'Digite um valor numérico válido para o Pescoço',
      ],
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
          localStorage.setItem('formData', JSON.stringify(this.formData));
          alert('Dados salvos com sucesso!');
        }
      });
    },
  },
};
</script>
=======
      ]

    };
  },
  mounted() {
    this.loadInitialData();
  },
  methods: {
    resetForm() {
      this.componentKey += 1; 
    },
    goBack() {
    this.$router.push('/avaliation/step2');
  },

    loadInitialData() {
      const savedData = localStorage.getItem('studentEvaluationForm');
      if (savedData) {
        const studentEvaluationData = JSON.parse(savedData);
        Object.assign(this.formData, studentEvaluationData);
      }
    },

    async submitForm() {
  if (!(await this.$refs.form.validate())) {
    alert('Por favor, preencha todos os campos obrigatórios.');
    return;
  }

  const formData = new FormData();
  
  // Adicionando os dados do formulário
  Object.entries(this.formData).forEach(([key, value]) => {
    formData.append(key, value);
  });

  // Função auxiliar para converter base64 em Blob
  function base64ToBlob(base64, mime) {
    const byteString = atob(base64.split(',')[1]);
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], {type: mime});
  }

  const additionalData = JSON.parse(localStorage.getItem('studentEvaluationForm') || '{}');

  Object.entries(additionalData).forEach(([key, value]) => {
    if (['back', 'front', 'left', 'right'].includes(key) && value) {
      const mime = value.match(/data:([a-zA-Z0-9]+\/[a-zA-Z0-9-.+]+).*,.*/)[1];
      const blob = base64ToBlob(value, mime);
      formData.append(key, blob, key + '.jpg');
    } else if (key === 'date' && value)  {
      const formattedDate = new Date(value).toISOString().replace(/T/, ' ').replace(/\..+/, '');
      formData.append(key, formattedDate);
      
    } else {
      formData.append(key, value);
    }
  });

  try {
    const response = await api.post('/avaliations', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    alert('Avaliação cadastrada com sucesso!');
    console.log(response.data);
    localStorage.removeItem('studentEvaluationForm');
  } catch (error) {
    console.error(error);
    alert('Ocorreu um erro ao tentar cadastrar a avaliação.');
  }
},
},
};
</script>

<style scoped>

  .v-container {
  margin-left: 15%;
  width: auto;  
}

@media (max-width: 960px) {
  .v-container {
    margin-left: 0;
    width: 100%;
  }
}
</style>

