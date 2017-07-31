window.syslog = (...val) => console.log.apply(null, val);
window.dir = (...val) => console.dir.apply(null, val);

window.SUCCESS_CODE = 200;
window.FAIL_CODE = 400;
window.LOADING_CODE = -1;
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

// API
import api from './api/'
Object.defineProperty(Vue.prototype, '$api', {
    value: api,
    writable: false,
    enumerable: false,
    configurable: false
});

// vuex
import store from './store'

// AJAX
import axios from 'axios'
axios.create();
Object.defineProperty(Vue.prototype, '$axios', {
    value: axios,
    writable: false,
    enumerable: false,
    configurable: false
});




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


import * as types from "@/store/mutation-types";
router.beforeEach(function(to, from, next) {
    store.commit(types.SHOW_LOADING);
    next();
})

router.afterEach(function(to) {
    document.title = to.name;
    store.commit(types.HIDE_LOADING);
});


// var startX = 0, startY = 0;
// document.addEventListener('touchstart', e => {
//     startX = e.touches[0].clientX;
//     startY = e.touches[0].clientY;

// });

// document.addEventListener('touchmove', e => {
//     var distanceX = e.touches[0].clientX - startX;
//     var distanceY = e.touches[0].clientY - startY;

//     if (distanceX < distanceY) {
//         e.preventDefault();
//     }
// });
