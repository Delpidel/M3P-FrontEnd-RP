import { describe, expect, it } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

import { concatId } from '@/utils/tests/getComponent'
import NewUser from '@/views/Users/NewUser.vue'
import UserService from '@/services/User/UserService'
import ImageUploadPreview from '@/components/File/ImageUploadPreview.vue'

describe('Testa a tela de cadastro de usuário', () => {
  it('Espera-se que a tela seja renderizada', () => {
    const component = mount(NewUser, {
      global: {
        plugins: [vuetify]
      }
    })

    expect(component).toBeTruthy()
  })

  it('Espera-se que o formulário seja renderizado', () => {
    const component = mount(NewUser, {
      global: {
        plugins: [vuetify]
      }
    })

    expect(component.find('form').exists()).toBeTruthy()
  })

  it('Espera-se que o formulário seja validado', async () => {
    const component = mount(NewUser, {
      global: {
        plugins: [vuetify]
      }
    })

    component.getComponent(concatId('submit-button')).trigger('submit')

    await flushPromises()

    expect(component.text()).toContain('O perfil é obrigatório.')
    expect(component.text()).toContain('O nome é obrigatório.')
    expect(component.text()).toContain('O campo email é obrigatório.')
  })

  it('Espera-se que ao submeter o formulário, o usuário seja cadastrado', () => {
    const createPet = vi
      .spyOn(UserService, 'createUser')
      .mockResolvedValue({})
      .mockRejectedValueOnce({ response: { data: { message: 'Erro' } } })

    const component = mount(NewUser, {
      global: {
        plugins: [vuetify]
      }
    })

    const profile = 2
    const name = 'Usuario Teste'
    const email = 'usuariotest@test.com'

    component.getComponent(concatId('profile-select')).setValue(profile)
    component.getComponent(concatId('name-input')).setValue(name)
    component.getComponent(concatId('email-input')).setValue(email)

    component.getComponent(concatId('submit-button')).trigger('submit')

    let form = new FormData()
    form.append('name', name)
    form.append('email', email)
    form.append('profile_id', profile)

    let config = {
      headers: {
        Authorization: 'Bearer null',
        'Content-Type': 'multipart/form-data'
      }
    }

    expect(createPet).toHaveBeenCalledWith(form, config)
  })

  it('Espera-se que ao submeter o formulário com foto, o usuário seja cadastrado', () => {
    const createPet = vi
      .spyOn(UserService, 'createUser')
      .mockResolvedValue({})
      .mockRejectedValueOnce({ response: { data: { message: 'Erro' } } })

    const component = mount(NewUser, {
      global: {
        plugins: [vuetify],
        stubs: {
          'photo-upload': ImageUploadPreview
        }
      }
    })

    const profile = 2
    const name = 'Usuario Teste'
    const email = 'usuariotest@test.com'
    const photo = new File([''], 'photo.png', { type: 'image/png' })

    component.getComponent(concatId('profile-select')).setValue(profile)
    component.getComponent(concatId('name-input')).setValue(name)
    component.getComponent(concatId('email-input')).setValue(email)
    component.getComponent(ImageUploadPreview).vm.$emit('update:selectedImage', photo)

    component.getComponent(concatId('submit-button')).trigger('submit')

    let form = new FormData()
    form.append('name', name)
    form.append('email', email)
    form.append('profile_id', profile)
    form.append('photo', photo)

    let config = {
      headers: {
        Authorization: 'Bearer null',
        'Content-Type': 'multipart/form-data'
      }
    }

    expect(createPet).toHaveBeenCalledWith(form, config)
  })
})
