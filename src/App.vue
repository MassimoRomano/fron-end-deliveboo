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
}
</script>

<template>
  <AppHeader />
  <RouterView />
  <AppFooter />
</template>

<style>
@import './style.css';
</style>
