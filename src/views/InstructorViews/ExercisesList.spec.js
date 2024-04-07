import { flushPromises, mount } from "@vue/test-utils";
import { describe, it, expect, vi } from "vitest";

import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import ExercisesList from './ExercisesList.vue'
import ExerciseService from "@/services/ExerciseService";
import { concatId } from "@/utils/tests/getComponent";

const vuetify = createVuetify({
    components,
    directives,
})

global.ResizeObserver = require('resize-observer-polyfill')

describe("Tela de listagem de exercícios", () => {
    vi.spyOn(ExerciseService, 'getAllExercises').mockResolvedValue([
        {
            "id": 1,
            "description": "Supino" 
        },
        { 
            "id": 2,
            "description": "Halter"
        },
        {
            "id": 3,
            "description": "Jump"
        }
    ])

    it("Espera-se que a tela seja renderizada", () => {
        const component = mount(ExercisesList, {
            global: {
                plugins: [vuetify]
            }
        })

        expect(component).toBeTruthy()
    })

    it("Espera-se que seja enviado corretamente a submissão do exercício", async () => {
        const spyCreateExercise = vi.spyOn(ExerciseService, 'createExercises').mockResolvedValue({})

        const component = mount(ExercisesList, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()

        component.getComponent(concatId("input-description")).setValue("Halter Alternado")
        component.getComponent(concatId("submit-button")).trigger("submit")

        expect(spyCreateExercise).toBeCalledWith({
            "description": "Halter Alternado"
        })
    })

    it("Espera-se que mostre um erro ao enviar o formulário sem a descrição do exercício", async () => {
        vi.spyOn(ExerciseService, 'createExercises').mockImplementationOnce(() => Promise.reject(new Error('Por favor, digite o nome do exercício.')));

        const component = mount(ExercisesList, {
            global: {
                plugins: [vuetify]
            }
        })

        await component.find('[data-test="submit-button"]').trigger('click');
        await flushPromises();

        expect(component.find('.error-message').text()).toContain("Por favor, digite o nome do exercício.");
    })

    it("Espera-se exiba na tela os nomes dos exercícios", async () => {
        const mockedExercises = [
            { "id": 1, "description": "Supino" },
            { "id": 2, "description": "Halter" },
            { "id": 3, "description": "Jump" }
        ]
        vi.spyOn(ExerciseService, 'getAllExercises').mockResolvedValue(mockedExercises)

        const component = mount(ExercisesList, {
            global: {
                plugins: [vuetify]
            }
        })

        await flushPromises()

        const renderedDescriptions = component.findAll(concatId("exercise-description"))

        mockedExercises.forEach(exercise => {
            expect(renderedDescriptions.filter(description => description.text() === exercise.description)).toBeTruthy();
        });
    })
})
