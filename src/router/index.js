import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Avaliation from '@/views/Avaliation.vue'
import AvaliationStep01 from '@/components/AvaliationStep01.vue'
import AvaliationStep02 from '@/components/AvaliationStep02.vue'
import AvaliationStep03 from '@/components/AvaliationStep03.vue'

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
      path: '/avaliacao/step1',
      name: 'AvaliationStep01',
      component: AvaliationStep01
    },
    {
      path: '/avaliacao/step2',
      name: 'AvaliationStep02',
      component: AvaliationStep02
    },
    {
      path: '/avaliacao/step3',
      name: 'AvaliationStep03',
      component: AvaliationStep03
    }
  ]
})

export default router
