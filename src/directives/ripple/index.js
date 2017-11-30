import Vue from 'vue';
import { touchStartHandler, touchendHandler } from './ripple.js'


Vue.directive('ripple', {
    bind(el) {
        // bind中还没有插入元素, 所以没法获取尺寸
    },

    inserted(el, binding) {
        // 默认值
        const duration = 1000;
        const background = 'rgba(0,0,0,1)';
        const timer = null;
        let opts = {};
        if (undefined === binding.value) {
            opts = { disabled: false };
        }else if (false === binding.value) {
            opts = { disabled: true };
        } else if (true === binding.value) {
            opts = { disabled: false };
        } else {
            opts = binding.value;
        }
        // opts存储到dataset
        el.dataset.duration = 1000;
        el.dataset.background = (undefined === opts.background) ? background : opts.background;
        el.dataset.timer = null;
        // 绑定事件
        el.addEventListener('touchstart', touchStartHandler);
        el.addEventListener('touchend', touchendHandler);
    },

    update(el, binding) {


    },

    unbind(el) {
    }
});
