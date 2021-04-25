import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios';

import { BootstrapVue } from 'bootstrap-vue';

axios.defaults.baseURL = 'http://127.0.0.1:8000';
//axios.defaults.headers.common['Authorization'] = 'Bearer ' + localStorage.getItem('token');
axios.defaults.headers.post['Content-Type'] = 'application/json';

Vue.use(BootstrapVue);
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
