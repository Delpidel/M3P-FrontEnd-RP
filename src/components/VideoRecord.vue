<template>
  <div class="hello">
    <h1>Simple Video Recording using RecordRTC</h1>
    <br>
    <button id="btn-start-recording" :disabled="disabled" @click="startRec">Start Recording</button>&nbsp;&nbsp;
    <button  @click="onSubmit">Enviar</button>&nbsp;&nbsp;
    <button
      id="btn-stop-recording"
      :disabled="!disabled"
      @click="stopRec"
    >Stop Recording</button>
    <hr>
    <video controls autoplay playsinline ref="video" height="500" width="700"></video>
  </div>
</template>

<script>
import RecordRTC from "recordrtc";
import api from '@/services/api';

export default {
  name: "VideoRecord",
  data() {
    return {
      recorder: null,
      disabled: false,
      myVideo: null
    };
  },
  mounted() {},
  methods: {
     async onSubmit() {
      const formData = new FormData()
      formData.append('file', this.myVideo)
      formData.append('description', 'video da nutricionista')

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
    startRec() {
      this.disabled = true;
      this.captureCamera(camera => {
        const video = this.$refs["video"];
        video.muted = true;
        video.volume = 0;
        video.srcObject = camera;
        this.recorder = RecordRTC(camera, {
          type: "video"
        });
        this.recorder.startRecording();
        // release camera on stopRecording
        this.recorder.camera = camera;

        this.disabled = true;
      });
    },
    stopRec() {
      this.disabled = false;
      this.recorder.stopRecording(this.stopRecordingCallback);
    },
    captureCamera(callback) {
      navigator.mediaDevices
        .getUserMedia({ audio: true, video: true })
        .then(function(camera) {
          callback(camera);
        })
        .catch(function(error) {
          alert("Unable to capture your camera. Please check console logs.");
          console.error(error);
        });
    },
    stopRecordingCallback() {
      const video = this.$refs["video"];
      video.src = video.srcObject = null;
      video.muted = false;
      video.volume = 1;

      this.myVideo = this.recorder.getBlob();
      video.src = URL.createObjectURL(this.recorder.getBlob());

      this.recorder.camera.stop();
      this.recorder.destroy();
      this.recorder = null;
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
