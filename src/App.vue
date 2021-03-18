<template>
  <div id="app">
    <app-header></app-header>
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/common/AppHeader.vue'


export default {
  name: 'App',
  components: {
    AppHeader
  }

}
</script>

<style>
*{margin: 0; padding: 0;}
body{height: 100vh;}
</style>
