import { describe, expect, it, vi } from 'vitest'
import Login from './Login.vue'
import { flushPromises, mount } from '@vue/test-utils'

import AuthenticationService from '../../services/AuthenticationService'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Tela de login', () => {
  it('Espera-se que a tela seja renderizada', () => {
    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })
    expect(component).toBeTruthy()
  })

  it('Espera-se que ao submeter o formulário, seja redirecionado para tela home', () => {
    const login = vi.spyOn(AuthenticationService, 'login').mockResolvedValue({
      data: {
        token: 'token',
        permissions: []
      }
    })

    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })
  })

  it('Espera-se que ao submeter o formulário, receba uma mensagem de erro', async () => {
    vi.spyOn(AuthenticationService, 'login').mockRejectedValue(new Error())

    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })
  })

  it('Deve exibir mensagem de erro ao submeter o formulário com campos vazios', async () => {
    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })
  })

  it('Deve redirecionar para a página inicial se o usuário já estiver autenticado', async () => {
    localStorage.setItem('@token', 'token')

    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })
  })

  it('Deve exibir mensagem de erro específica para credenciais inválidas', async () => {
    vi.spyOn(AuthenticationService, 'login').mockRejectedValue({ response: { status: 401 } })

    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })
  })

  it('Deve armazenar o token de autenticação no armazenamento local após o login', async () => {
    vi.spyOn(AuthenticationService, 'login').mockResolvedValue({
      data: {
        token: 'token',
        permissions: []
      }
    })

    const component = mount(Login, {
      global: {
        plugins: [vuetify]
      }
    })
  })
})
