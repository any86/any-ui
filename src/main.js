window.syslog = (...val) => console.log.apply(null, val);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//全局样式
import '@/scss/reset.scss'
import '@/scss/theme.scss'

// UI
import Atom from './packages/index.js';
Vue.use(Atom);

// 关闭错误提示
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});

