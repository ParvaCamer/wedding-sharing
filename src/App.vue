<template>
  <the-header></the-header>
  <router-view v-slot="slotProps">
    <component :is="slotProps.Component"></component>
  </router-view>
</template>

<script>
import TheHeader from './components/layout/TheHeader.vue'
export default {
  name: 'App',
  components: {
    TheHeader
  }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Edu+TAS+Beginner:wght@400;500;600;700&display=swap');

html,
body {
  width: 100%;
  height: 100%;
  margin: 0;
  overflow-x: hidden;
  font-family: 'Edu TAS Beginner', cursive;
  background-color: #fff;
  color: #000;
}

h1 {
  font-size: 70px;
  font-weight: 100;
  color: #323232;
}

a {
  text-decoration: none;
}

#title {
  width: 100%;
  text-align: center;
}
</style>
