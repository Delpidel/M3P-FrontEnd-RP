import { flushPromises, mount } from '@vue/test-utils'
import { describe, it, expect, vi } from 'vitest'

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
  components,
  directives
})

global.ResizeObserver = require('resize-observer-polyfill')

import { concatId } from '@/utils/tests/getComponent'
import CreateStudentWorkout from '../InstructorViews/CreateStudentWorkout.vue'
import GetExercises from '../../services/InstructorServices/GetExercises'
import CreateWorkoutService from '../../services/InstructorServices/CreateWorkoutService'
import { daysOfWeek } from '../../constants/Instructor/daysOfWeek'

describe('Tela de cadastro de treino', () => {
  vi.spyOn(GetExercises, 'getAllUserExercises').mockResolvedValue([
    {
      id: 1,
      description: 'Exercício 1'
    },
    {
      id: 2,
      description: 'Exercício 2'
    },
    {
      id: 3,
      description: 'Exercício 3'
    }
  ])
  const daysOfWeekMock = [
    { title: 'Segunda-feira', value: 'SEGUNDA' },
    { title: 'Terça-feira', value: 'TERÇA' },
    { title: 'Quarta-feira', value: 'QUARTA' },
    { title: 'Quinta-feira', value: 'QUINTA' },
    { title: 'Sexta-feira', value: 'SEXTA' },
    { title: 'Sábado', value: 'SÁBADO' },
    { title: 'Domingo', value: 'DOMINGO' }
  ]

  it('Espera-se que a tela seja renderizada', async () => {
    const component = mount(CreateStudentWorkout, {
      global: {
        plugins: [vuetify]
      }
    })

    await flushPromises()

    expect(component.exists()).toBe(true)
  })

  it('Espera-se que seja enviada corretamente a submissão do formulário', async () => {
    const spyCreateWorkout = vi
      .spyOn(CreateWorkoutService, 'createWorkout')
      .mockResolvedValue({ success: true })

    const component = mount(CreateStudentWorkout, {
      global: {
        plugins: [vuetify]
      }
    })

    await flushPromises()

    // Simular preenchimento dos campos do formulário
    component.getComponent(concatId('selected-exercise')).setValue(1)
    component.getComponent(concatId('repetitions-input')).setValue(10)
    component.getComponent(concatId('weight-input')).setValue(20.0)
    component.getComponent(concatId('break-input')).setValue(30)

    // Mock do dayOfWeek
    const selectedDay = daysOfWeekMock[0].value // Por exemplo, assumindo que 'SEGUNDA' é o valor do primeiro item do array daysOfWeekMock
    component.getComponent(concatId('day-input')).setValue(selectedDay)

    component.getComponent(concatId('observations-input')).setValue('Observações do treino')

    await component.find(concatId('submition-input')).trigger('submit')

    await flushPromises()

    expect(spyCreateWorkout).toHaveBeenCalled({})
  })

  it('Espera-se que mostre um erro ao enviar o formulário sem preencher todos os campos', async () => {
    const component = mount(CreateStudentWorkout, {
      global: {
        plugins: [vuetify]
      }
    })

    await flushPromises()

    // Não preencher nenhum campo

    component.getComponent(concatId('submition-input')).trigger('submit')

    await flushPromises()

    expect(component.text()).toContain('Erro ao validar os dados.')
  })
})
