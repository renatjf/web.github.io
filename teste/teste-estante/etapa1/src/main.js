import Vue from 'vue';
import App from './App';
import BootstrapVue from 'bootstrap-vue';
import VueTheMask from 'vue-the-mask'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(VueTheMask)

new Vue({
  
  el: '#app',
  components: { App },
  template: '<App/>'
})
