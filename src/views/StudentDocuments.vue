<template>
  <v-container>
    <v-row>
      <v-col cols="12">
        <h1>Documentos de {Estudante}</h1>
      </v-col>
    </v-row>
    <hr mu="4"/>
    <br />

    <v-row>
      <v-col cols="6" md="4" class="align-center">
        <p>Descrição:</p>
        <v-text-field v-model="description" outlined></v-text-field>
      </v-col>

      <v-col cols="6" md="4" class="align-center">
        <p>Escolher Arquivo:</p>
        <v-text-field v-model="document" outlined></v-text-field>
      </v-col>

      <v-col cols="12" md="4" class="align-center">
        <v-btn color="primary" @click="sendDocument">Enviar</v-btn>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="12">
        <h2>Documentos Enviados</h2>
      </v-col>
    </v-row>
  </v-container>
  
</template>

<script></script>

<style scoped></style>
