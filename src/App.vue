<template>
  <div id="app">
    <app-menu></app-menu>
    <router-view></router-view>
  </div>
</template>

<script>
import appMenu from "./components/Sidebar";
export default {
  name: 'app',
  data () {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  },
  components: {
    appMenu
  },
  async beforeCreate(){
    await this.$store.dispatch("setUser");
  }
}
</script>

<style>

#app{
  overflow-x: hidden;
}

</style>
