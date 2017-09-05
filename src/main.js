window.syslog = (...val) => console.log.apply(null, val);
window.dir = (...val) => console.dir.apply(null, val);

window.SUCCESS_CODE = 200;
window.FAIL_CODE = 400;
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "@/App";
import router from "@/router";

// API
import api from "@/api";
Object.defineProperty(Vue.prototype, "$api", {
  value: api,
  writable: false,
  enumerable: false,
  configurable: false
});

Object.defineProperty(Vue.prototype, "$lang", {
  value: lang, // lang存在lang.js文件中
  writable: false,
  enumerable: false,
  configurable: false
});

// vuex
import store from "@/store";

// AJAX
// import axios from 'axios'
// axios.create();
// Object.defineProperty(Vue.prototype, '$axios', {
//     value: axios,
//     writable: false,
//     enumerable: false,
//     configurable: false
// });

//全局样式
import "@/scss/global.scss";

// UI
import Atom from "@/packages/index.js";
Vue.use(Atom);

// 关闭错误提示
Vue.config.productionTip = false;
Vue.config.performance = true;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  template: "<App/>",
  components: {
    App
  }
});

// 移动组件指令
import DomPortal from "vue-dom-portal";
Vue.use(DomPortal);

import * as types from "@/store/mutation-types";

// 路由切换前触发
var routerHistory = new Map();
var routerHistoryCount = 0;
routerHistory.set("/list", 0);

router.beforeEach(function(to, from, next) {
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
  console.log(routerHistory);
  store.commit(types.SHOW_LOADING);
  next();
});

// 路由切换后触发
router.afterEach(function(to) {
  document.title = to.name;
  store.commit(types.HIDE_LOADING);
});

// 突变加载
window.imageLoader = src => {
  return new Promise((resolve, reject) => {
    var image = new Image();
    image.src = src;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      resolve(image);
    };
    image.onerror = error => {
      reject(error);
    };
  });
};
