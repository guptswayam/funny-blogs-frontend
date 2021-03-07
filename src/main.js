import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import VueRouter from 'vue-router'
import {routes} from "./route"
import store from "./store/store"

Vue.use(VueRouter);

const router= new VueRouter({
  routes,
  mode: "history"
})


// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)


new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
