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
              <v-form ref="form">
              <v-row>
                <v-col>
                 <v-text-field clearable label="Torax (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Braço Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Braço Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Cintura (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                 <v-text-field clearable label="Antebraço Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Antebraço Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Abdomen (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Quadril (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                 <v-text-field clearable label="Coxa Direita (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Coxa Esquerda (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Panturrilha Direita (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Panturrilha Esquerda (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-row>
                <v-col>
                 <v-text-field clearable label="Punho (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Bíceps Femoral Direito (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Bíceps Femoral Esquerdo (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
                <v-col>
                 <v-text-field clearable label="Pescoço (cm)" type="number" variant="outlined"></v-text-field>
                </v-col>
              </v-row>
              <v-btn variant="outlined">Cadastrar</v-btn>
             </v-form>
             </v-card-text>
            </v-card>
        </v-container>
      </v-main>
    </v-app>

</template>
