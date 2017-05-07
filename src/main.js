// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

Vue.config.productionTip = false;
// import Alert from './packages/Alert/index.js';
// import Confirm from './packages/Confirm/index.js';
// Vue.use(Confirm);
// Vue.use(Alert);
// import Atom from './packages/index.js';
// Vue.use(Atom);

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
});
