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

describe('Tela de cadastro de treino', () => {
  const daysOfWeekMock = [
    { value: 'SEGUNDA', number: 1 },
    { value: 'TERÇA', number: 2 },
    { value: 'QUARTA', number: 3 },
    { value: 'QUINTA', number: 4 },
    { value: 'SEXTA', number: 5 },
    { value: 'SÁBADO', number: 6 },
    { value: 'DOMINGO', number: 0 }
  ]

  const getAllUserExercisesMock = vi.spyOn(GetExercises, 'getAllUserExercises')
getAllUserExercisesMock.mockResolvedValue({
  data: {
    data: [
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
    ]
  }
})
  const mockRoute = {
    params: {
      id: 1 // Defina o ID do estudante conforme necessário para o teste
    }
  }

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
    const createWorkout = vi
      .spyOn(CreateWorkoutService, 'createWorkout')
      .mockResolvedValue({ success: true })

    const component = mount(CreateStudentWorkout, {
      global: {
        plugins: [vuetify]
      }
    })

    await flushPromises()

    // Simular preenchimento dos campos do formulário
  
    component.getComponent(concatId('selected-exercise')).setValue();
    component.getComponent(concatId('repetitions-input')).setValue(10)
    component.getComponent(concatId('weight-input')).setValue(20.0)
    component.getComponent(concatId('break-input')).setValue(30)
    
    // Mock do dayOfWeek
    const selectedDay = daysOfWeekMock[0].value // Por exemplo, assumindo que 'SEGUNDA' é o valor do primeiro item do array daysOfWeekMock
    component.getComponent(concatId('day-input')).setValue(selectedDay)
    
    component.getComponent(concatId('observations-input')).setValue('Observações do treino')

    // Disparar o evento de submissão do formulário
    await component.find(concatId('submition-input')).trigger('submit')      

    await flushPromises()

    expect(createWorkout).toHaveBeenCalledWith({
      student_id: mockRoute.params.id,
      exercise_id: 1,
      repetitions: 10,
      weight: 20.0,
      break: 30,
      dayOfWeek: 'SEGUNDA',
      observations: 'Observações do treino'
    })
    console.log('Workout: >>>>>>>>>>>>>>>>>>>>>>>', createWorkout.getValue)
  })

  it('Espera-se que mostre um erro ao enviar o formulário sem preencher todos os campos', async () => {
    const component = mount(CreateStudentWorkout, {
      global: {
        plugins: [vuetify]
      }
    })

    await flushPromises()

    // Não preencher nenhum campo

    await component.find('form').trigger('submit')

    await component.vm.$nextTick()

    expect(component.vm.errors.description).toBeTruthy()
  })
})
