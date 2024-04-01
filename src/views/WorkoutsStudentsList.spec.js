import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

/* Configuração do Vuetify */
import { createVuetify } from 'vuetify'; // Obrigatório
import * as components from 'vuetify/components'; // Obrigatório
import * as directives from 'vuetify/directives'; // Obrigatório
import WorkoutsStudentsList from './WorkoutsStudentsList.vue';
import WorkoutsStudentsService from '@/services/WorkoutsStudentsService';

const vuetify = createVuetify({ // Obrigatório
    components,
    directives,
});

global.ResizeObserver = require('resize-observer-polyfill'); // Obrigatório

/* FIM DA CONFIGURAÇÃO */

describe("Tela Treinos por estudante", () => {
    // Objeto esperado para os testes
    const expectedWorkouts = {
        "student_id": 5,
        "name": "Julieta",
        "workouts": {
            "SEGUNDA": [
                {
                    "description": "Flexão",
                    "repetitions": 3,
                    "weight": "23.00",
                    "break_time": 2,
                    "observations": null,
                    "time": 3,
                    "created_at": null
                },
                {
                    "description": "Triceps",
                    "repetitions": 3,
                    "weight": "23.00",
                    "break_time": 2,
                    "observations": null,
                    "time": 3,
                    "created_at": null
                }
            ],
            "DOMINGO": [
                {
                    "description": "Flexão",
                    "repetitions": 3,
                    "weight": "23.00",
                    "break_time": 2,
                    "observations": null,
                    "time": 3,
                    "created_at": null
                }
            ],
        }
    };

    // Espiona a função workoutsByStudentList do serviço WorkoutsStudentsService
    vi.spyOn(WorkoutsStudentsService, 'workoutsByStudentList').mockResolvedValue([expectedWorkouts]);

    it("Espera-se que a tela seja renderizada", () => {
        const component = mount(WorkoutsStudentsList, {
            global: {
                plugins: [vuetify]
            }
        });
    
        expect(component).toBeTruthy();
    });
    

    it("Deve retornar um objeto com os treinos de um aluno", async () => {
        // Chama o método workoutsByStudentList
        const workouts = await WorkoutsStudentsService.workoutsByStudentList(5);

        // Verifica se a resposta é o objeto esperado
        expect(workouts).toEqual([expectedWorkouts]);

        // Acessa a propriedade `name` do objeto dentro do array
        expect(workouts[0].name).toContain("Julieta");
        
        // Acessa a descrição do primeiro treino do Domingo
        expect(workouts[0].workouts.DOMINGO[0].description).toContain("Flexão");
    });  

    it("Espera-se que mostre um erro ao obter a resposta com array incompleto", async () => {
        // Chama o método workoutsByStudentList
        const workouts = await WorkoutsStudentsService.workoutsByStudentList(5);

        // Verifica se a resposta não é a esperada
        expect(workouts).not.toEqual([]);

        // A propriedade `name` do objeto dentro do array não é correta
        expect(workouts[0].name).not.toContain("Monica");
        
        // A descrição do primeiro treino do Domingo é incorreta
        expect(workouts[0].workouts.DOMINGO[0].description).not.toContain("Tríceps");
    });   
});
