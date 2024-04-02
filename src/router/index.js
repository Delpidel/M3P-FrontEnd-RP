import { createRouter, createWebHistory } from 'vue-router'

import Dashboard from '../views/Dashboard/Dashbord.vue'
import Login from '../views/Login/Login.vue'
import NewUser from '../views/User/NewUser.vue'
import ListUser from '../views/User/ListUser.vue'
import WorkoutsStudentsList from '../views/WorkoutsStudentsList.vue'
import Exemplo from '../views/PaginaExemplo.vue'

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
      component: ListUser
    },
    {
      path: '/users/new',
      name: 'Novo usuário',
      component: NewUser
    },
    {
      path: '/users/:id/edit',
      name: 'Editar usuário',
      component: NewUser
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

    //perfil aluno
    {
      path: '/student/meal-plans',
      name: 'Planos de refeições do aluno',
      component: Exemplo
    },
    {
      path: '/student/workouts',
      name: 'WorkoutsStudentsList',
      component: WorkoutsStudentsList
    }
  ]
})

export default router
