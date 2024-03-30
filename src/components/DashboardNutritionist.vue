<template>
    <div>
      <h1>Bem vindo, {{ profile }} {{ nome }}</h1>
      <!-- Aqui você pode incluir os cards com informações específicas do admin -->
      <div>
        <h2>Exercícios Registrados</h2>
        <!-- Aqui você pode incluir os cards de exercícios registrados -->
      </div>
      <div>
        <h2>Nutricionistas</h2>
        <!-- Aqui você pode incluir os cards de nutricionistas -->
      </div>
      <div>
        <h2>Instrutores</h2>
        <!-- Aqui você pode incluir os cards de instrutores -->
      </div>
      <div>
        <h2>Estudantes</h2>
        <!-- Aqui você pode incluir os cards de estudantes -->
      </div>
      <div>
        <h2>Recepcionistas</h2>
        <!-- Aqui você pode incluir os cards de recepcionistas -->
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['profile', 'nome']
  };
  </script>
  