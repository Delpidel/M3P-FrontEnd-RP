import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import ListStudentWorkout from '@/views/ListStudentWorkout.vue'

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
      path: '/listagem-treinos/:id/lista-treino',
      name: 'listStudenWorkout',
      component: ListStudentWorkout
    }
  ]
})

export default router
