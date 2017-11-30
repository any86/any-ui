import Vue from 'vue';
import { touchStartHandler, touchendHandler } from './ripple.js';
export default {
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
            opts = { disabled: 0 };
        } else if (false === binding.value) {
            opts = { disabled: 1 };
        } else if (true === binding.value) {
            opts = { disabled: 0 };
        } else {
            opts = binding.value;
        }
        // opts存储到dataset
        el.dataset.duration = undefined === opts.duration ? duration : opts.duration;
        el.dataset.background = undefined === opts.background ? background : opts.background;
        el.dataset.disabled = opts.disabled;
        el.dataset.timer = null;
        // 绑定事件
        el.addEventListener('touchstart', touchStartHandler);
        el.addEventListener('touchend', touchendHandler);
    },

    componentUpdated(el, binding) {
        // 默认值
        const duration = 1000;
        const background = 'rgba(0,0,0,1)';
        const timer = null;
        let opts = {};
        if (undefined === binding.value) {
            opts = { disabled: false };
        } else if (false === binding.value) {
            opts = { disabled: true };
        } else if (true === binding.value) {
            opts = { disabled: false };
        } else {
            opts = binding.value;
        }
        // opts存储到dataset
        el.dataset.duration = undefined === opts.duration ? duration : opts.duration;
        el.dataset.background = undefined === opts.background ? background : opts.background;
        el.dataset.disabled = opts.disabled;
        el.dataset.timer = null;
    },

    unbind(el) {
        log('des')
        el.removeEventListener('touchstart', touchStartHandler);
        el.removeEventListener('touchend', touchendHandler);
    }
};
