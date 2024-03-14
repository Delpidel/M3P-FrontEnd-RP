<template>
  <button @click="onSubmit">Salvar</button> <br/>
    <button @click="cameraAction">Capturar</button><br/>

    <button @click="handleChange">Habilitiar</button> <br/>
    
  <div id="app">
    <img :src="currentCapture" width="100px" v-if="currentCapture" />
    <div style="position: relative; border: #fffa00 2px solid">
     <simple-v-camera
     v-if="open"
        :resolution="{ width: 400, height: 400 }"
        ref="camera"
       
      ></simple-v-camera>
    </div>
  </div>
</template>

<script>
import Camera from 'simple-vue-camera'
import api from '@/services/api'

export default {
  components: {
    'simple-v-camera': Camera
  },
  data: function () {
    return {
      picture: null,
      open: false,
      currentCapture: null
    }
  },
  methods: {
    handleChange() {
      this.open = !this.open
    },
    async onSubmit() {
      const formData = new FormData()
      formData.append('file', this.picture)
      formData.append('description', 'Foto da joana')

      api
        .post('/upload', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        .then(() => {
          console.log('Deu certo')
        })
        .catch(() => console.log('erro no vídeo'))

    },
    async cameraAction() {
      const blob = this.$refs.camera?.snapshot()
      blob
      .then((data) => {
        console.log(data)
        this.picture = data
        this.open = false
        this.currentCapture = URL.createObjectURL(data);
        
      })
      .catch(() => alert("Erro ao capturar vídeo"))
    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
