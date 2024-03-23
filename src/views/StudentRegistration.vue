<template>
    <div class="container">
        <div class="d-flex flex-column py-12 px-12 px-sm-6">
            <div class="d-flex">
                <v-icon size="x-large" class="text-h3" color="amber">mdi-account-multiple-plus-outline</v-icon>
                <h1 class="container-title font-weight-medium ms-2 mt-1">Cadastro de aluno</h1>
            </div>
            <v-progress-linear 
                color="grey-darken-4" 
                indeterminate>
            </v-progress-linear>
        </div>
        <div class="formContent d-flex flex-column">
            <div>
                <v-form>
                    <div class="formContent-data d-flex">
                        <div class="d-flex formContent-data-cameraContent">
                            <div class="formContent-data-cameraContent-camera"> 
                                <div class="formContent-data-cameraContent-camera-photo">
                                    <simple-v-camera
                                        :resolution="{ width:400, height: 400}"
                                        ref="camera"
                                        autoplay
                                    ></simple-v-camera>
                                </div>
                            </div>
                            <div class="d-flex flex-column justify-center">
                                <v-btn
                                    class="ma-2"
                                    color="amber"
                                    icon="mdi-camera-plus"
                                    size="large"
                                    title="Capturar foto"
                                ></v-btn>
                                <v-btn
                                    class="ma-2"
                                    color="grey-darken-4 text-amber"
                                    icon="mdi-camera"
                                    size="large"
                                    title="Habilitar câmera"
                                ></v-btn>
                            </div>
                        </div>
                        <div class="w-100 formContent-data-nameEmail">
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                    v-model="name"
                                    label="Nome completo"
                                    type="text"
                                    variant="outlined"
                                />
                            </v-col>
                            <v-col cols="12" sm="12" md="12">
                                <v-text-field
                                    v-model="email"
                                    label="E-mail"
                                    type="email"
                                    variant="outlined"
                                />
                            </v-col>
                            <div class="d-flex formContent-data-contactDate">
                                <v-col cols="12" sm="12" md="6">
                                    <v-text-field
                                        v-model="contact"
                                        label="Telefone para contato"
                                        type="number"
                                        variant="outlined"
                                    />
                                </v-col>
                                <v-col cols="12" sm="12" md="6">
                                    <v-text-field
                                        v-model="dateBirth"
                                        label="Data de Nascimento"
                                        type="date"
                                        variant="outlined"
                                    />
                                </v-col>
                            </div>
                        </div>
                    </div>

                    <v-divider class="mb-4"></v-divider>

                    <div class="d-flex formContent-data-address">
                        <v-col cols="12" sm="12" md="3">
                            <v-text-field
                                v-model="cep"
                                label="CEP"
                                type="number"
                                variant="outlined"
                            />
                        </v-col>
                        <v-col cols="12" sm="12" md="6">
                            <v-text-field
                                v-model="street"
                                label="Logradouro"
                                type="text"
                                variant="outlined"
                            />
                        </v-col>
                        <v-col cols="12" sm="12" md="3">
                            <v-text-field
                                v-model="number"
                                label="Número"
                                type="text"
                                variant="outlined"
                            />
                        </v-col>
                    </div>
                    <div class="d-flex formContent-data-neighborhoodComplement">
                        <v-col cols="12" sm="12" md="5">
                            <v-text-field
                                v-model="neighborhood"
                                label="Bairro"
                                type="text"
                                variant="outlined"
                            />
                        </v-col>

                        <v-col cols="12" sm="12" md="7">
                            <v-text-field
                                v-model="complement"
                                label="Complemento"
                                type="text"
                                variant="outlined"
                            />
                        </v-col>
                    </div>
                    <div class="d-flex formContent-data-cityState">
                        <v-col cols="12" sm="12" md="6">
                            <v-text-field
                                v-model="city"
                                label="Cidade"
                                type="text"
                                variant="outlined"
                            />
                        </v-col>

                        <v-col cols="12" sm="12" md="6">
                            <v-text-field
                                v-model="state"
                                label="Estado"
                                type="text"
                                variant="outlined"
                            />
                        </v-col>
                    </div>
                    <v-col class="d-flex justify-center pt-sm-6 pb-sm-0">
                        <router-link to="">
                            <v-btn
                                variant="elevated"
                                color="amber text-dark-grey-4"
                                class="font-weight-bold px-sm-2 px-md-10 mr-1 mr-md-4"
                                size="large"
                            >
                                Voltar
                            </v-btn>
                        </router-link>

                        <v-btn
                            type="submit"
                            variant="elevated"
                            color="grey-darken-4 text-amber"
                            class="font-weight-bold"
                            :ripple="false"
                            size="large"
                        >
                            Cadastrar
                        </v-btn>
                    </v-col>
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

.formContent {
    border-radius: 2rem;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.3);

    padding: 48px;
    margin: 0px 48px 50px;
    position: relative;
}

.formContent:before {
    content: "";
    position: absolute;
    inset: 0;
    background-image: url(../assets/background-student-registration.jpg);
    background-size: cover;
    z-index: -1;
    opacity: 0.5;
}
.formContent-data-cameraContent-camera {
    width: 18.1rem;
    height: 16.3rem;
    margin-top: 8px;
    border: 1px solid #757575;
    border-radius: 16px;
}

.formContent-data-cameraContent-camera-photo {
    position: relative;
    width: 15.6rem;
    height: 13.8rem;
    border: 1px solid #757575;
    border-radius: 16px;
    margin: 18px;
}

@media (max-width:960px) {

    .formContent-data {
        display: flex;
        flex-direction: column;
    }

    .formContent-data-cameraContent {
        display: flex;
        justify-content: center
    }

    .formContent-data-cameraContent-camera {
        width: 20rem;
    }

    .formContent-data-cameraContent-camera-photo {
        width: 17.5rem;
    }
}

@media (max-width:600px) {

    .container-title {
        font-size: 28px;
    }

    .formContent {
        padding: 16px;
        margin: 0px 16px 50px;
    }
    
    .formContent-data-cameraContent-camera-photo {
        width: 11rem;
    }

    .formContent-data-nameEmail, 
    .formContent-data-contactDate, 
    .formContent-data-address, 
    .formContent-data-neighborhoodComplement, 
    .formContent-data-cityState {
        display: flex;
        flex-direction: column;
    }
}
</style>