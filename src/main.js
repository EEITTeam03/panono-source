import Vue from 'vue';
import Aframe from 'aframe';
import Animation from 'aframe-animation-component';
import Loading from 'vue-loading-overlay';
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue';
import router from './router';
import store from './store';

Vue.use(Aframe);
Vue.use(Animation);
Vue.use(Loading);
Vue.use(VueAxios, axios);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app');
