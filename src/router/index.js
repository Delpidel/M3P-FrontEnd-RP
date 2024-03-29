import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashbord.vue'
import Login from '../views/Login.vue'
import PaginaExemplo from '../views/PaginaExemplo.vue'
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
      component: Dashboard
    },

    //perfil usuário
    {
      path: '/users',
      name: 'Listagem de usuários',
      component: PaginaExemplo
    },
    {
      path: '/users/new',
      name: 'Novo usuário',
      component: PaginaExemplo
    },

    //perfil recepcionista
    {
      path: '/students',
      name: 'Listagem de estudantes',
      component: PaginaExemplo
    },
    {
      path: '/students/new',
      name: 'Novo Estudante',
      component: PaginaExemplo
    },

    //perfil instrutor
    {
      path: '/exercises',
      name: 'Exercícios',
      component: PaginaExemplo
    },
    {
      path: '/instructor/students',
      name: 'Listagem de estudantes',
      component: PaginaExemplo
    },

    //perfil nutricionista
    {
      path: '/active/students',
      name: 'Listagem de estudantes ativos',
      component: PaginaExemplo
    },

    //perfil aluno
    {
      path: '/student/meal-plans',
      name: 'Planos de refeições do aluno',
      component: PaginaExemplo
    },
    {
      path: '/student/workouts',
      name: 'Treinos do aluno',
      component: PaginaExemplo
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
