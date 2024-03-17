<template>
  <v-navigation-drawer :rail="rail" permanent>
    <v-list>
      <v-list-item
        prepend-avatar="https://randomuser.me/api/portraits/women/85.jpg"
        :title="name"
        :subtitle="profile"
      ></v-list-item>
    </v-list>

    <v-divider></v-divider>

    <v-list density="compact" nav>
      <router-link to="/home">
        <v-list-item prepend-icon="mdi-folder" title="Home" value="home"> </v-list-item>
        <v-list-item prepend-icon="mdi-list-box-outline" title="Workouts Students List" value="wokouts-students-list" to="/students/:id/workouts"> </v-list-item>
      </router-link>
    </v-list>
    <div class="pa-8">
      <v-btn :loading="loading" @click="handleLogout" block>
        Saindo
        <template v-slot:loader>
          <v-progress-linear indeterminate></v-progress-linear>
        </template>
      </v-btn>
    </div>
  </v-navigation-drawer>
</template>

<script>

export default {
  data() {
    return {
      permissions: JSON.parse(localStorage.getItem('@permissions_petshop')),
      name: localStorage.getItem('@name'),
      profile: localStorage.getItem('@profile'),
      loading: false
    }
  },
  methods: {}
}
</script>
