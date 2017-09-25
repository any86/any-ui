window.syslog = (...val) => console.log.apply(null, val);
window.dir = (...val) => console.dir.apply(null, val);
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';
import * as types from '@/store/mutation-types';
// API
import api from '@/api';
Object.defineProperty(Vue.prototype, '$api', {
    value: api,
    writable: false,
    enumerable: false,
    configurable: false
});

// Object.defineProperty(Vue.prototype, '$lang', {
//     value: lang, // lang存在lang.js文件中
//     writable: false,
//     enumerable: false,
//     configurable: false
// });

//全局样式
import '@/scss/global.scss';
import '@/assets/iconfont/iconfont.css'
// UI
import Atom from '@/packages/index.js';
Vue.use(Atom);

// 关闭错误提示
Vue.config.productionTip = false;
Vue.config.performance = true;

/* eslint-disable no-new */
var vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    components: {
        App
    }
});

// 移动组件指令
import DomPortal from 'vue-dom-portal';
Vue.use(DomPortal);

router.beforeEach(function(to, from, next) {
    next();
});

// 路由切换后触发
router.afterEach(function(to) {
    document.title = to.name;
});
