<script>
import AppHeader from './components/partials/AppHeader.vue';
import AppHome from './components/views/AppHome.vue'
import AppFooter from './components/partials/AppFooter.vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppHome,
    AppFooter
  },
  async mounted() {
    await this.$store.commit('initialiseStore')
  },
}
</script>

<template>
  <AppHeader />
  <RouterView></RouterView>
  <AppFooter />
</template>

<style>
@import './style.css';
</style>
