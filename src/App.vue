<template>
  <div id="app">
    <app-header></app-header>
    <app-cards></app-cards>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Cards from './components/Cards.vue';

export default {
  name: 'app',
  components: {
        'app-header': Header,
        'app-footer': Footer,
        'app-cards': Cards
    },
  data() {
    return {}
  },
  methods: {
  }
}
</script>

<style>

#app {
    margin: 30px;
}

</style>
