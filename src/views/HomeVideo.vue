<template>
  <div id="app">
    <VideoRecord/>
  </div>
</template>

<script>
import VideoRecord from "../components/VideoRecord.vue";

export default {
  name: "App",
  components: {
    VideoRecord
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
