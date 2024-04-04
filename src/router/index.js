import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Exemplo from '../views/PaginaExemplo.vue'

import AvaliationStep01 from '@/components/AvaliationStep01.vue'
import AvaliationStep02 from '@/components/AvaliationStep02.vue'
import AvaliationStep03 from '@/components/AvaliationStep03.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Login',
      component: Login
    },
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: Home
    },

    //perfil usuário
    {
      path: '/users',
      name: 'Listagem de usuários',
      component: Exemplo
    },
    {
      path: '/users/new',
      name: 'Novo usuário',
      component: Exemplo
    },

    //perfil recepcionista
    {
      path: '/students',
      name: 'Listagem de estudantes',
      component: Exemplo
    },
    {
      path: '/students/new',
      name: 'Novo Estudante',
      component: Exemplo
    },

    //perfil instrutor
    {
      path: '/exercises',
      name: 'Exercícios',
      component: Exemplo
    },
    {
      path: '/instructor/students',
      name: 'Listagem de estudantes',
      component: Exemplo
    },
    

    //perfil nutricionista
    {
      path: '/active/students',
      name: 'Listagem de estudantes ativos',
      component: Exemplo
    },

    {
      path: '/avaliation/step1',
      name: 'AvaliationStep01',
      component: AvaliationStep01
    },
    {
      path: '/avaliation/step2',
      name: 'AvaliationStep02',
      component: AvaliationStep02
    },
    {
      path: '/avaliation/step3',
      name: 'AvaliationStep03',
      component: AvaliationStep03
    },

    //perfil aluno
    {
      path: '/meal-plans',
      name: 'Planos de refeições do aluno',
      component: Exemplo
    },
    {
      path: '/workouts',
      name: 'Treinos do aluno',
      component: Exemplo
    },

  
  ]
})

export default router
