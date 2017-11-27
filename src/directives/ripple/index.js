import Vue from 'vue';
import Ripple from './ripple.js'
var ripple;
Vue.directive('ripple', {
    bind() {
        // bind中还没有插入元素, 所以没法获取尺寸
    },

    inserted(el, binding) {
        ripple = new Ripple(el);
    },

    update(el, binding) {

    },

    unbind(el) {
        ripple.destroy();
    }
});
