<script>
import AppHeader from './components/partials/AppHeader.vue';
import AppHome from './components/views/AppHome.vue'
import AppFooter from './components/partials/AppFooter.vue';
import AppCart from './components/views/AppCart.vue';
import { RouterLink } from 'vue-router';

export default {
  name: 'App',
  components: {
    AppHeader,
    AppHome,
    AppFooter,
    AppCart
  },
/*   async mounted() {
    //await this.$store.commit('initialiseStore')
  }, */
}
</script>

<template>
  <AppCart @update-cart="console.log('emesso con successo')" />
  <AppHeader />
  <RouterView></RouterView>
  <AppFooter />
</template>

<style>
@import './style.css';
</style>
