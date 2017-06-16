window.syslog = (...val) => console.log.apply(null, val);
window.dir = (...val) => console.dir.apply(null, val);




// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'


import api from './api/'
Vue.prototype.$api = api;
// vuex
import store from './store/'

// ajax
import axios from 'axios'
Vue.prototype.$axios = axios;

//全局样式
import '@/scss/reset.scss'
import '@/scss/animate.scss'


// UI
import Atom from './packages/index.js';
Vue.use(Atom);

// 关闭错误提示
Vue.config.productionTip = false;
Vue.config.performance = true;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});

