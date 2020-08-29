import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import Vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
Vue.use(Vant);
axios.defaults.baseURL='http://127.0.0.1:5050';
// axios.defaults.baseURL="http://food.applinzi.com";
Vue.prototype.axios=axios;
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
