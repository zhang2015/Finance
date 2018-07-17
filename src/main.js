// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import 'lib-flexible'
import './assets/css/reset.css'
import Ajax from './assets/api/ajax.js'
import VueResource from 'vue-resource'
import common from './assets/api/common.js'
import axios from 'axios'

Vue.use(VueResource);
Vue.prototype.$ajax = Ajax;
Vue.prototype.$axios = axios;
Vue.prototype.common = common;
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
