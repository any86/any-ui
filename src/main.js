window.syslog = (...val) => console.log.apply(null, val);
window.dir = (...val) => console.dir.apply(null, val);
// window.onerror = error=> {
//     console.log(error);
//     return true;
// };
window.SUCCESS_CODE = 200;
window.FAIL_CODE = 400;
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

Object.defineProperty(Vue.prototype, '$lang', {
    value: lang, // lang存在lang.js文件中
    writable: false,
    enumerable: false,
    configurable: false
});

// vuex
import store from '@/store';

//全局样式
import '@/scss/global.scss';

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
    store,
    template: '<App/>',
    components: {
        App
    }
});

// 移动组件指令
import DomPortal from 'vue-dom-portal';
Vue.use(DomPortal);

// 路由切换前触发
var routerHistory = new Map();
var routerHistoryCount = 0;
routerHistory.set('/list', 0);

router.beforeEach(function(to, from, next) {
    // 切换前打开loading
    vm.$loading.open();
    var toIndex = routerHistory.get(to.path);
    var fromIndex = routerHistory.get(from.path);

    if (undefined != toIndex) {
        if (toIndex > fromIndex) {
            // console.log("前进");
            store.commit(types.SET_PAGE_APPEAR_DIRECTION, 'in');
        } else {
            // console.log("后退");
            store.commit(types.SET_PAGE_APPEAR_DIRECTION, 'out');
        }
    } else {
        // console.log("前进1");
        store.commit(types.SET_PAGE_APPEAR_DIRECTION, 'in');
        // 首次进入该路由
        routerHistoryCount++;
        routerHistory.set(to.path, routerHistoryCount);
    }
    next();
});

// 路由切换后触发
router.afterEach(function(to) {
    document.title = to.name;
    store.commit(types.HIDE_SIDE);
    vm.$loading.close();
});

// 突变加载
window.imageLoader = src => {
    return new Promise((resolve, reject) => {
        var image = new Image();
        image.src = src;
        image.crossOrigin = 'anonymous';
        image.onload = () => {
            resolve(image);
        };
        image.onerror = error => {
            reject(error);
        };
    });
};
window.image2DataURL = image => {
    var rate = 3;
    const width = image.width * rate;
    const height = image.height * rate;
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    context.imageSmoothingEnabled = false; //  关闭抗锯齿
    // context.imageSmoothingQuality = 'high';
    context.drawImage(image, 0, 0, width, height);
    return canvas.toDataURL('image/png', 1);
};

window.dataURL2BLOB = urlData => {
    var bytes = window.atob(urlData.split(',')[1]); //去掉url的头，并转换为byte
    //处理异常,将ascii码小于0的转换为大于0
    var ab = new ArrayBuffer(bytes.length);
    var ia = new Uint8Array(ab);
    for (var i = 0; i < bytes.length; i++) {
        ia[i] = bytes.charCodeAt(i);
    }
    return new Blob([ab], { type: 'image/png' });
};

import Raven from 'raven-js';
import RavenVue from 'raven-js/plugins/vue';
Raven.config('https://69457829c83e470e8aff29d0fe8ae351@sentry.io/214710')
    .addPlugin(RavenVue, Vue)
    .install();
