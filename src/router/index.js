import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ListaAvaliacoes from '@/views/ListaAvaliacoes.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    },
    {
      path: '/home',
      name: 'home',
      component: Home
    },
    {
      path: '/lista-avaliacoes',
      name: 'lista-avaliacoes',
      component: ListaAvaliacoes
    }
  ]
})

export default router
