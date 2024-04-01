<template>
  <v-layout>
    <v-container>
      <div class="main-container">
        <h2>Envio de imagens para a avaliação</h2>
        <p>Por favor, faça o upload das fotos do aluno(a):</p>
        <v-row>
          <v-col cols="3" v-for="(link, index) in imageLinks" :key="index">
            <div
              class="image-container"
              data-test="card-item"
              @mouseover="toggleHover(index)"
              @mouseleave="toggleHover(-1)"
            >
              <img
                :src="link"
                :class="{ blur: hoverIndex === index }"
                height="150"
                width="150"
                :alt="getImageAlt(index)"
              />
              <div class="button-container" v-if="hoverIndex === index">
                <v-btn @click="openFileInput(index)" icon class="button" data-test="button">
                  <v-icon color="amber">mdi-camera</v-icon>
                </v-btn>
                <v-btn
                  @click="deletePhoto(index)"
                  icon
                  class="button"
                  style="margin-left: 20px"
                  data-test="button"
                >
                  <v-icon color="grey-darken-4">mdi-delete</v-icon>
                </v-btn>
              </div>
            </div>
          </v-col>
        </v-row>
        <div class="button-container-2">
          <v-btn
            color="grey-darken-3"
            @click="this.$router.push('/avaliacao/step1')"
            class="btn-back"
            >Voltar</v-btn
          >
          <v-btn color="amber" @click="nextStep" class="btn-next">Próximo</v-btn>
        </div>
        <v-snackbar v-model="showAlert" color="error" top class="custom-snackbar">
          {{ alertMessage }}
          <template v-slot:action="{ attrs }">
            <v-btn text v-bind="attrs" @click="showAlert = false"> Fechar </v-btn>
          </template>
        </v-snackbar>
      </div>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  data() {
    return {
      imageLinks: [
        '../src/assets/avaliation-images/front.svg',
        '../src/assets/avaliation-images/right.svg',
        '../src/assets/avaliation-images/back.svg',
        '../src/assets/avaliation-images/left.svg'
      ],

      hoverIndex: -1,
      allPhotosAdded: false,
      showAlert: false,
      alertMessage: 'Adicione todas as fotos antes de prosseguir para a próxima etapa!'
    }
  },
  methods: {
    openFileInput(index) {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = 'image/*'
      input.addEventListener('change', (event) => this.uploadImage(event, index))
      input.click()
    },
    uploadImage(event, index) {
      const file = event.target.files[0]
      if (file) {
        this.imageLinks[index] = URL.createObjectURL(file)
        const imageUrl = URL.createObjectURL(file)
        this.imageLinks[index] = imageUrl
        localStorage.setItem(`image_${index}`, imageUrl)
        console.log('Imagem adicionada:', imageUrl)
        this.allPhotosAdded = this.imageLinks.every((link) => link.startsWith('blob:'))
      }
    },
    deletePhoto(index) {
      this.imageLinks[index] = `../src/assets/avaliation-images/${this.getOriginalImageName(index)}`
      console.log('Imagem restaurada:', this.imageLinks[index])
      localStorage.removeItem(`image_${index}`)
    },
    getOriginalImageName(index) {
      switch (index) {
        case 0:
          return 'front.svg'
        case 1:
          return 'right.svg'
        case 2:
          return 'back.svg'
        case 3:
          return 'left.svg'
        default:
          return ''
      }
    },
    toggleHover(index) {
      this.hoverIndex = index
    },

    getImageAlt(index) {
      switch (index) {
        case 0:
          return 'Homem virado para frente'
        case 1:
          return 'Homem virado para direita'
        case 2:
          return 'Homem virado para trás'
        case 3:
          return 'Homem virado para esquerda'
        default:
          return ''
      }
    },
    nextStep() {
      this.allPhotosAdded = this.imageLinks.every((link) => link.startsWith('blob:'))
      if (!this.allPhotosAdded) {
        this.showAlert = true
      } else {
        this.$router.push('/avaliacao/step3')
      }
    }
  }
}
</script>

<style scoped>
.main-container {
  margin-top: 40px;
  height: 60%;
  border-radius: 2rem;
  margin-left: 20%;
}

.image-container {
  display: flex;
  justify-content: center;
  position: absolute;
  cursor: pointer;
  overflow: hidden;
  margin-top: 10px;
  border-radius: 2rem;
  width: 220px;
  height: 220px;
  background: linear-gradient(160deg, rgba(255, 212, 80, 1) 0%, rgba(222, 167, 0, 1) 100%);
}

.image-container img {
  margin-top: 18px;
  border-radius: 2rem;
  transition: filter 0.3s ease;
  width: 185px;
  height: 185px;
}

.blur {
  filter: blur(4px);
}

.button-container {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
}

.button {
  margin: 0 auto;
}

.image-container:hover .button-container {
  opacity: 1;
}

.button-container-2 {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 30%;
}

.btn-back,
.btn-next {
  margin-bottom: 10px;
  border-radius: 1rem;
}

.custom-snackbar {
  margin-left: 20%;
}
</style>
