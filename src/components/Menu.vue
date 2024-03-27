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

<script setup>
import { useDisplay } from 'vuetify'
const { xs, lgAndUp, mdAndDown } = useDisplay()
</script>

<script>
import accountImage from '../assets/account-image.jpg'

export default {
  name: 'MenuPag',
  data() {
    return {
      imagePath: accountImage,
      permissions: localStorage.getItem('@permissions'),
      name: localStorage.getItem('@name'),
      profile: localStorage.getItem('@profile'),
      token: localStorage.getItem('@token'),
      loading: false,
      drawer: true,
      menu: {
        ADMIN: [
          { icon: 'mdi-view-dashboard', text: 'Dashboard', link: '/dashboard' },
          { icon: 'mdi-account-plus', text: 'Cadastrar Usuário', link: '/users/new' },
          { icon: 'mdi-account-multiple', text: 'Usuários', link: '/users' }
        ],
        RECEPCIONISTA: [
          { icon: 'mdi-account-plus', text: 'Cadastrar Estudante', link: '/students/new' },
          { icon: 'mdi-account-multiple', text: 'Estudantes', link: '/students' }
        ],
        INSTRUTOR: [
          { icon: 'mdi-view-dashboard', text: 'Dashboard', link: '/dashboard' },
          { icon: 'mdi-dumbbell', text: 'Exercícios', link: '/exercises' },
          { icon: 'mdi-account-multiple', text: 'Estudantes', link: '/instructor/students' }
        ],
        NUTRICIONISTA: [
          { icon: 'mdi-account-check', text: 'Estudantes Ativos', link: '/students-active' }
        ],
        ALUNO: [
          { icon: 'mdi-view-dashboard', text: 'Dashboard', link: '/dashboard' },
          { icon: 'mdi-food-apple', text: 'Minhas Dietas', link: '/student/meal-plans' },
          { icon: 'mdi-dumbbell', text: 'Meus Treinos', link: '/student/workouts' }
        ]
      }
    }
  },
  methods: {
    logout() {
      const storage = ['@permissions', '@name', '@profile', '@token']
      storage.forEach((item) => localStorage.removeItem(item))

      this.$router.push('/')
    }
  }
}
</script>

<style scoped>
nav {
  width: 15%;
}

/* Estilo para arredondar bordas menu */
#sidebar .v-list-item {
  border-top-left-radius: 30px;
  border-bottom-left-radius: 30px;

  text-decoration: none;
}

#sidebar a.v-list-item--active,
#sidebar a:has(.v-list-item--active) {
  background: #fff;
  color: #424242;
  margin-right: -10px;
}

#sidebar a.v-list-item--active::before,
#sidebar a:has(.v-list-item--active)::before {
  position: absolute;
  content: '';
  width: 70px;
  height: 70px;
  background-color: #212121;
  top: -70px;
  right: 0;
  border-radius: 3rem;
  box-shadow: 30px 30px 0px white;
  z-index: 1005;
}

#sidebar a.v-list-item--active + .v-list-item::before,
#sidebar a:has(.v-list-item--active) + .v-list-item::before {
  position: absolute;
  content: '';
  width: 70px;
  height: 70px;
  background-color: #212121;
  top: -4px;
  right: 0;
  border-radius: 3rem;
  box-shadow: 30px -30px 0px white;
  z-index: 1005;
}

.menuItem {
  z-index: 1010;
}

.v-list-item:not(:last-child):not(:first-child):hover {
  border-radius: 30px;
  background: rgb(73, 73, 73);
  background: linear-gradient(
    90deg,
    rgba(73, 73, 73, 1) 0%,
    rgba(33, 33, 33, 1) 75%,
    rgba(33, 33, 33, 1) 100%
  );
}

a.v-list-item--active:hover .v-list-item,
a:has(.v-list-item--active):hover .v-list-item {
  background: white;
}

.menu-dropdown a.v-list-item--active:hover .v-list-item {
  background: none;
}
</style>
