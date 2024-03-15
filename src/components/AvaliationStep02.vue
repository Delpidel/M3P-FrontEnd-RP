<template>
  <h3>implementação da 2º tela de avalição fisica aqui</h3>
  <v-container>
    <div class="main-container">
      <v-row>
        <v-col cols="3" v-for="(link, index) in imageLinks" :key="index">
          <div
            class="image-container"
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
              <v-btn @click="openFileInput(index)" icon class="button">
                <v-icon color="amber">mdi-camera</v-icon>
              </v-btn>
              <v-btn @click="deletePhoto(index)" icon class="button" style="margin-left: 20px">
                <v-icon color="grey-darken-4">mdi-delete</v-icon>
              </v-btn>
            </div>
          </div>
        </v-col>
      </v-row>
      <div class="button-container-2">
        <v-btn color="grey-darken-3" @click="this.$router.push('/avaliacao/step1')" class="btn-back"
          >Voltar</v-btn
        >
        <v-btn color="amber" @click="this.$router.push('/avaliacao/step3')" class="btn-next"
          >Próximo</v-btn
        >
      </div>
    </div>
  </v-container>
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

      hoverIndex: -1
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
    uploadImage(event) {
      const file = event.target.files[0]
      console.log('Cheguei aqui? (upload)', file)
    },
    deletePhoto(index) {
      console.log('Cheguei aqui? (delete)', index)
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
    }
  }
}
</script>

<style scoped>
.main-container {
  margin-top: 40px;
  height: 60%;
  border-radius: 2rem;
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
  margin-top: 25%;
}

.btn-back,
.btn-next {
  margin-bottom: 10px;
  border-radius: 1rem;
}
</style>
