<template>
    <div class="container">
        <div class="d-flex flex-column py-12 px-12">
            <div class="d-flex">
                <v-icon size="x-large" class="text-h3" color="amber">mdi-account-multiple-plus-outline</v-icon>
                <h1 class="font-weight-medium ms-2 mt-1">Cadastro de aluno</h1>
            </div>
            <v-progress-linear 
                color="grey-darken-4" 
                indeterminate>
            </v-progress-linear>
        </div>
        <div>
            <div>
                <v-form>
                    <div class="w-25" style="position: relative; border: #212121 3px solid">
                        <simple-v-camera
                            :resolution="{ width:400, height: 400}"
                            ref="camera"
                            autoplay
                        ></simple-v-camera>
                    </div>
                    <v-text-field
                        v-model="name"
                        label="Nome completo"
                        type="text"
                        variant="outlined"
                    />

                    <v-text-field
                        v-model="email"
                        label="E-mail"
                        type="email"
                        variant="outlined"
                    />

                    <v-text-field
                        v-model="contact"
                        label="Telefone para contato"
                        type="number"
                        variant="outlined"
                    />

                    <v-text-field
                        v-model="dateBirth"
                        label="Data de Nascimento"
                        type="date"
                        variant="outlined"
                    />

                    <v-divider class="mb-4"></v-divider>

                    <v-text-field
                        v-model="cep"
                        label="CEP"
                        type="number"
                        variant="outlined"
                    />

                    <v-text-field
                        v-model="street"
                        label="Logradouro"
                        type="text"
                        variant="outlined"
                    />

                    <v-text-field
                        v-model="number"
                        label="Número"
                        type="number"
                        variant="outlined"
                    />

                    <v-text-field
                        v-model="neighborhood"
                        label="Bairro"
                        type="text"
                        variant="outlined"
                    />

                    <v-text-field
                        v-model="city"
                        label="Cidade"
                        type="text"
                        variant="outlined"
                    />

                    <v-text-field
                        v-model="state"
                        label="Estado"
                        type="text"
                        variant="outlined"
                    />

                    <v-text-field
                        v-model="complement"
                        label="Complemento"
                        type="text"
                        variant="outlined"
                    />
                </v-form>
            </div>
        </div>
    </div>
</template>

<script>
    import Camera from 'simple-vue-camera'

    export default {
        components: {
            'simple-v-camera': Camera
        },
    }

</script>

<style scoped>

</style>