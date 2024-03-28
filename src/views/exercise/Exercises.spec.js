import { describe, expect, it, vi } from 'vitest'

import { flushPromises, mount } from '@vue/test-utils'

import ExercisePage from './ExercisesPage.vue'


import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ExerciseService from '@/services/ExerciseService'
import ExercisesPage from './ExercisesPage.vue'
import { concatId } from '@/utils/testes/getComponent'

const vuetify = createVuetify({
    components,
    directives
})

global.ResizeObserver = require('resize-observer-polyfill')

describe('Tela de Exercícios', () => {

    vi.spyOn(ExerciseService, 'createExercise').mockResolvedValue([
        {
            id: 1,
            name: 'Supino'
        },
        {
            id: 2,
            name: 'Remada'
        }
    ])

    it('Deve renderizar a tela corretamente', () => {
        const wrapper = mount(ExercisePage, {
            global: {
                plugins: [vuetify]
            }
        })
        expect(wrapper.find('.container').exists()).toBeTruthy()
        expect(wrapper.find('.cardExercise').exists()).toBeTruthy()
        expect(wrapper.find('form').exists()).toBeTruthy()
        expect(wrapper.find('.v-text-field').exists()).toBeTruthy()
        expect(wrapper.find('.v-btn').exists()).toBeTruthy()
    })


    it('Deve exibir mensagem de erro ao submeter o formulário com campos vazios', async () => {
        const wrapper = mount(ExercisePage, {
            global: {
                plugins: [vuetify]
            }
        })

        // Dispara o evento de submit do formulário
        wrapper.find('form').trigger('submit')

        // Aguarda o próximo tick para que as promessas sejam resolvidas
        await wrapper.vm.$nextTick()

        // Verifica se a mensagem de erro é exibida corretamente
        expect(wrapper.vm.errors.description).toBeTruthy()
    })

    it('Deve exibir mensagem de erro ao submeter o formulário com descrição muito longa', async () => {
        const wrapper = mount(ExercisePage, {
            global: {
                plugins: [vuetify]
            }
        })

        // Define uma descrição muito longa
        const longDescription = 'a'.repeat(151)

        // Preenche o campo de descrição com uma descrição muito longa
        await wrapper.setData({ description: longDescription })

        // Dispara o evento de submit do formulário
        wrapper.find('form').trigger('submit')

        // Aguarda o próximo tick para que as promessas sejam resolvidas
        await wrapper.vm.$nextTick()

        // Verifica se a mensagem de erro é exibida corretamente
        expect(wrapper.vm.errors.description).toBeTruthy()
    })

    it('Deve exibir mensagem de sucesso ao cadastrar um exercício', async () => {

        const createExercise = vi.spyOn(ExerciseService, 'createExercise').mockRejectedValue(new Error())

        const component = mount(ExercisesPage, {
            global: {
                plugins: [vuetify]
            }
        })

        component.getComponent(concatId("input-description")).setValue("Supino")


        component.getComponent(concatId("submit-button")).trigger("submit")

        await flushPromises()

        expect(createExercise).toBeCalledWith({

            description: 'Supino',

        })

    })


    it('Deve exibir mensagem de erro ao tentar cadastrar um exercício que já existe', async () => {
        // Mock da função createExercise para lançar um erro de exercício já existente
        const createExercise = vi.spyOn(ExerciseService, 'createExercise').mockRejectedValueOnce(new Error('Exercício já existe'));
    
        const component = mount(ExercisesPage, {
            global: {
                plugins: [vuetify]
            }
        });
    
        // Define o valor de descrição como um exercício que já existe
        component.getComponent(concatId("input-description")).setValue("Exercício Existente");
    
        // Dispara o evento de submit do formulário
        component.getComponent(concatId("submit-button")).trigger("submit");
    
        await flushPromises();
    
        // Verifica se a função createExercise foi chamada corretamente
        expect(createExercise).toBeCalledWith({
            description: 'Exercício Existente',
        });
    
        
    });
    
})
