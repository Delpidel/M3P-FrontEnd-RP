<!-- <template>
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
</script> -->

<template>
  <v-layout>
    <v-navigation-drawer
      theme="dark"
      v-model="drawer"
      :permanent="lgAndUp"
      width="100%"
      id="sidebar"
      border="none"
      :style="mdAndDown ? 'display:none;' : ''"
    >
      <v-list-item>
        <router-link to="/dashboard">
          <img
            src="../assets/fit-manage-tech-white.svg"
            alt="logo fitmanage tech, braço flexionado mostrando músculos e um halter grande."
            class="my-4 pb-5 w-100 mx-auto d-block"
          />
        </router-link>
      </v-list-item>

      <v-divider></v-divider>
      <v-list>
        <v-list-item
          prepend-avatar="https://fanese.perseus.com.br/Servicos/Conta/Foto"
          :title="name"
          subtitle="ALUNO"
          class="font-weight-bold pl-8"
        ></v-list-item>
      </v-list>

      <v-list nav dense class="ma-0 pa-0 pl-0 pl-md-4 mt-5">
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link :ripple="false">
          <v-list-item
            class="font-weight-bold pl-0pl-lg-5 menuItem"
            :prepend-icon="item.icon"
            :active="isChildrenActive(item)"
            active-class="border"
          >
            {{ item.text }}
          </v-list-item>
        </v-list-item>
        <v-list-item><!-- item adicionado para permitir arredondamento borda menu --></v-list-item>
      </v-list>

      <template v-slot:append>
        <div class="pb-10 pr-2 pr-md-4">
          <v-btn block append-icon="mdi-logout" variant="plain" @click="logout">Sair</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-layout>

  <div class="d-flex justify-center" id="menuMobile">
    <v-row :style="lgAndUp ? 'display:none' : ''">
      <v-col cols="12" class="pa-0 ma-0">
        <v-card-title
          class="bg-grey-darken-4 d-flex align-center justify-space-between pt-4 pl-8 pl-sm-4"
        >
          <router-link to="/">
            <img
              src="../assets/logo.svg"
              alt="logo fitmanage tech, braço flexionado mostrando músculos e um halter grande."
              :style="xs ? 'width: 30%; margin-left: 5% ' : 'width: 40%; margin-left: 10%'"
            />
          </router-link>

          <v-menu theme="dark" class="menu-dropdown">
            <template v-slot:activator="{ props }">
              <v-btn
                icon="mdi-dots-vertical"
                v-bind="props"
                class="my-2 my-sm-4 mx-2 mx-sm-12"
                theme="dark"
                variant="plain"
              >
              </v-btn>
            </template>

            <v-list theme="dark">
              <v-list-item v-for="(item, i) in items" :key="i" :to="item.link" link>
                <v-list-item :append-icon="item.icon">{{ item.text }}</v-list-item>
              </v-list-item>
              <v-list-item class="pt-10" align="center">
                <v-btn append-icon="mdi-logout" variant="plain" @click="logout" width="100%"
                  >Sair</v-btn
                >
              </v-list-item>
            </v-list>
          </v-menu>
        </v-card-title>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { useDisplay } from 'vuetify'
const { xs, lgAndUp, mdAndDown } = useDisplay()
</script>

<script>
export default {
  name: 'MenuPag',
  data() {
    return {
      permissions: localStorage.getItem('@permissions'),
      name: localStorage.getItem('@name'),
      profile: localStorage.getItem('@profile'),
      token: localStorage.getItem('@token'),
      loading: false,

      items: [
        {
          icon: 'mdi-view-dashboard-outline',
          text: 'Dashboard',
          link: '/dashboard'
        },
        {
          icon: 'mdi-account-group-outline',
          text: 'Alunos',
          link: '/students'
        },
        {
          icon: 'mdi-weight-lifter',
          text: 'Exercícios',
          link: '/exercises'
        }
      ],
      drawer: true
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('@permissions')
      localStorage.removeItem('@name')
      localStorage.removeItem('@profile')
      localStorage.removeItem('@token')

      this.$router.push('/')
    },
    isChildrenActive(item) {
      if (item.link !== '/students') return
      return this.$route.path.includes('students')
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
