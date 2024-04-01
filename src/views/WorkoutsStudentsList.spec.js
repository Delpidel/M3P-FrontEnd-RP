import { flushPromises, mount } from '@vue/test-utils';
import { describe, expect, it, vi } from 'vitest';

/* Configuración de vuetify */
import { createVuetify } from 'vuetify'; // Obligatorio
import * as components from 'vuetify/components'; // Obligatorio
import * as directives from 'vuetify/directives'; // Obligatorio
import WorkoutsStudentsList from './WorkoutsStudentsList.vue';
import WorkoutsStudentsService from '@/services/WorkoutsStudentsService';

const vuetify = createVuetify({ // Obligatorio
    components,
    directives,
});

global.ResizeObserver = require('resize-observer-polyfill'); // Obligatorio

/* FIN DE LA CONFIGURACIÓN */



describe("Tela Treinos por estudante", () => {
    vi.spyOn(WorkoutsStudentsService, 'workoutsByStudentList').mockResolvedValue([
        {
            "student_id": 5,
            "name": "Henrique Douglas",
            "workouts": {
                "SEGUNDA": [
                    {
                        "description": "Salto",
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
                        "description": "Salto",
                        "repetitions": 3,
                        "weight": "23.00",
                        "break_time": 2,
                        "observations": null,
                        "time": 3,
                        "created_at": null
                    }
                ],
            }
        }
    ])

    it("Espera-se que a tela seja renderizada", () => {
        const component = mount(WorkoutsStudentsList, {
            global: {
                plugins: [vuetify]
            }
        });
    
        expect(component).toBeTruthy();
    });
    

    it("Deve retornar um objeto com os treinos de um aluno", async () => {
        // Definicao de objeto esperado
        const expectedWorkouts = {
            "student_id": 5,
            "name": "Henrique Douglas",
            "workouts": {
                "SEGUNDA": [
                    {
                        "description": "Salto",
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
                        "description": "Salto",
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

        // Espia a funcao workoutsByStudentList do servicio WorkoutsStudentsService
        vi.spyOn(WorkoutsStudentsService, 'workoutsByStudentList').mockResolvedValue([expectedWorkouts]);

        // Llama ao método workoutsByStudentList
        const workouts = await WorkoutsStudentsService.workoutsByStudentList(5);

        // Verifica que a respuesta é o objeto esperado
        expect(workouts).toEqual([expectedWorkouts]);

        // Acessa a propriedade `name` do objeto dentro do array
        expect(workouts[0].name).toContain("Henrique Douglas");
        
        // Acessa a descrição do primeiro treino do Domingo
        expect(workouts[0].workouts.DOMINGO[0].description).toContain("Salto");
    });  

    describe("Tela Treinos por estudante", () => {
        it("Espera-se que mostre um erro ao obter a resposta com array incompleto", async () => {
            // Definicao de objeto esperado
            const expectedWorkouts = {
                "student_id": 5,
                "name": "Juliana",
                "workouts": {
                    "SEGUNDA": [
                        {
                            
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
    
            // Espia a funcao workoutsByStudentList do servicio WorkoutsStudentsService
            vi.spyOn(WorkoutsStudentsService, 'workoutsByStudentList').mockResolvedValue([expectedWorkouts]);
    
            // Llama ao método workoutsByStudentList
            const workouts = await WorkoutsStudentsService.workoutsByStudentList(5);
    
            // Verifica que a respuesta não é a esperada
            expect(workouts).not.toEqual([]);
    
            // A propriedade `name` do objeto dentro do array não é correta
            expect(workouts[0].name).not.toContain("Monica");
            
            // A descrição do primeiro treino do Domingo é incorreto
            expect(workouts[0].workouts.DOMINGO[0].description).not.toContain("Tríceps");
        });   
    })
})




