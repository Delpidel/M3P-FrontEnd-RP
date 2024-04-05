// import { describe, expect, it, vi } from 'vitest'

// import { flushPromises, mount } from '@vue/test-utils'

// import ExercisePage from './ExercisesPage.vue'

// import { createVuetify } from 'vuetify'
// import * as components from 'vuetify/components'
// import * as directives from 'vuetify/directives'
// import ExerciseService from '@/services/ExerciseService'
// import ExercisesPage from './ExercisesPage.vue'
// import { concatId } from '@/utils/testes/getComponent'

// const vuetify = createVuetify({
//     components,
//     directives
// })

// global.ResizeObserver = require('resize-observer-polyfill')

// describe('Tela de Exercícios', () => {

//     it('Deve renderizar a tela corretamente', () => {
//         const wrapper = mount(ExercisePage, {
//             global: {
//                 plugins: [vuetify]
//             }
//         })
//         expect(wrapper.find('.container').exists()).toBeTruthy()
//         expect(wrapper.find('.cardExercise').exists()).toBeTruthy()
//         expect(wrapper.find('form').exists()).toBeTruthy()
//         expect(wrapper.find('.v-text-field').exists()).toBeTruthy()
//         expect(wrapper.find('.v-btn').exists()).toBeTruthy()
//     })

//     it('Deve exibir mensagem de erro ao submeter o formulário com campos vazios', async () => {
//         const wrapper = mount(ExercisePage, {
//             global: {
//                 plugins: [vuetify]
//             }
//         })

//         wrapper.find('form').trigger('submit')

//         await wrapper.vm.$nextTick()

//         expect(wrapper.vm.errors.description).toBeTruthy()
//     })

//     it('Deve exibir mensagem de erro ao submeter o formulário com descrição muito longa', async () => {
//         const wrapper = mount(ExercisePage, {
//             global: {
//                 plugins: [vuetify]
//             }
//         })

//         const longDescription = 'a'.repeat(151)

//         await wrapper.setData({ description: longDescription })

//         wrapper.find('form').trigger('submit')

//         await wrapper.vm.$nextTick()

//         expect(wrapper.vm.errors.description).toBeTruthy()
//     })

//     it('Deve exibir mensagem de sucesso ao cadastrar um exercício', async () => {

//         const createExercise = vi.spyOn(ExerciseService, 'createExercise').mockResolvedValue({ success: true });

//         const component = mount(ExercisesPage, {
//             global: {
//                 plugins: [vuetify]
//             }
//         })

//         component.getComponent(concatId("input-description")).setValue("Supino")

//         component.getComponent(concatId("submit-button")).trigger("submit")

//         await flushPromises()

//         expect(createExercise).toBeCalledWith({

//             description: 'Supino',

//         })

//     })

//     it('Deve exibir mensagem de erro ao tentar cadastrar um exercício que já existe', async () => {

//         const createExercise = vi.spyOn(ExerciseService, 'createExercise').mockRejectedValueOnce(new Error('Exercício já existe'));

//         const component = mount(ExercisesPage, {
//             global: {
//                 plugins: [vuetify]
//             }
//         });

//         component.getComponent(concatId("input-description")).setValue('Supino');

//         component.getComponent(concatId("submit-button")).trigger("submit");

//         await flushPromises();

//         expect(createExercise).toBeCalledWith({
//             description: 'Supino',
//         });

//     });

// })
