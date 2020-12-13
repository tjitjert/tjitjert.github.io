import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import App from './App.vue';

// Install BootstrapVue
Vue.use(BootstrapVue);

Vue.config.productionTip = false;

new Vue({
  render(h) { return h(App); },
}).$mount('#app');
