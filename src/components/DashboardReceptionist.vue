<template>
  <div>
    <h1>Bem vindo, {{ profile }} {{ nome }}</h1>
  </div>
</template>

<script>
export default {
  props: ['profile', 'nome']
};
</script>
