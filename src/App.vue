<template>
  <div id="app">
    <Alert></Alert>
    <img src="./assets/logo.png">
    <router-view></router-view>
  </div>
</template>

<script>
import {Alert} from './packages/index.js';
export default {
  name: 'app',
  components: {Alert}
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
