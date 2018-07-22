// import VConsole from 'vconsole';
// new VConsole();
window.log = console.log;
window.dir = console.dir;
window.table = console.table;



// if (process.env.NODE_ENV === 'production') {
//     // 上线屏蔽vconsole
// } else {
//     const script = document.createElement('script');
//     script.type = 'text/javascript';
//     script.src = 'https://res.wx.qq.com/mmbizwap/zh_CN/htmledition/js/vconsole/3.0.0/vconsole.min.js';
//     document.body.appendChild(script);
//     if (script.readyState) {
//         script.onreadystatechange = function() {
//             if (script.readyState == "loaded" || script.readyState == "complete") {
//                 script.onreadystatechange = null;
//                 new VConsole();
//             }
//         };
//     } else {
//         script.onload = function() {
//             new VConsole();
//             window.log = console.log;
//             window.dir = console.dir;
//             window.table = console.table;
//         };
//     }
// }


import {Alert} from './packages/Dialog/index.js'
Alert();

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
Raven
    .config('https://5c1a51a6d36141549e1e513916e1d5a7@sentry.io/1208173')
    .addPlugin(RavenVue, Vue)
    .install();



// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from '@/App';
import router from '@/router';

//全局样式
import './scss/global.scss';

// UI
import Atom from '@/packages/index.js';

import {
    use,
    t
} from '@/locale'

import cn from '@/locale/lang/zh-CN.js'
import ar from '@/locale/lang/ar.js'

// 默认中文
// Vue.use(Atom, {locale: cn});
Vue.use(Atom);

// 关闭错误提示
Vue.config.silent = false;
// 生产环境提示
// Vue.config.productionTip = false;
// 设置为 true 以在浏览器开发工具中启用对组件初始化、编译、渲染和打补丁的性能追踪。只适用于开发模式和支持 performance.mark API 的浏览器上。
// Vue.config.performance = true;

/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    template: '<App/>',
    // render: h=>h('<App/>'),
    components: {
        App
    }
});

router.beforeEach(function(to, from, next) {
    // Atom.locale.use(ar);
    next();
});

// 路由切换后触发
router.afterEach(function(to) {
    document.title = to.name;
});