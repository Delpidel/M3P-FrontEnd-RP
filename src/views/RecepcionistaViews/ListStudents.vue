<template>
  <v-container>
    <div class="d-flex justify-space-between">
      <h1 class="py-12">Listagem de estudantes</h1>
      <v-btn type="submit" variant="elevated" color="grey-darken-4" text="amber"
        >Novo estudante</v-btn
      >
    </div>
    <form @submit.prevent="handleSearch"></form>
  </v-container>
</template>

<script>
export default {
  data() {},

  methods: {
    handleSearch() {}
  }
}
</script>
