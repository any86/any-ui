window.log = console.log;
window.dir = console.dir;
window.table = console.table;

// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';

//全局样式
import './scss/global.scss';
// UI
import Atom from '@/packages/index.js';
import locale from '@/locale/lang/zh-CN.js'

Vue.use(Atom, {locale});

// 关闭错误提示
Vue.config.silent = false;
// 生产环境提示
Vue.config.productionTip = false;
// 设置为 true 以在浏览器开发工具中启用对组件初始化、编译、渲染和打补丁的性能追踪。只适用于开发模式和支持 performance.mark API 的浏览器上。
Vue.config.performance = true;

/* eslint-disable no-new */
var vm = new Vue({
    el: '#app',
    router,
    template: '<App/>',
    // render: h=>h('<App/>'),
    components: {
        App
    }
});

router.beforeEach(function(to, from, next) {
    next();
});

// 路由切换后触发
router.afterEach(function(to) {
    document.title = to.name;
});